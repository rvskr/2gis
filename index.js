const express = require('express');
const crypto = require('crypto');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');  // добавим для работы с путями файлов

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

let isAuthorizationCancelled = false; // Флаг, который будет отслеживать, отменена ли авторизация

// Локальное хранилище пароля (fallback если Supabase недоступен)
let localPasswordState = {
  password: null,
  valid: false,
  supabaseAvailable: true
};

async function getPasswordState() {
  try {
    const { data, error } = await supabase
      .from('password_state')
      .select('*')
      .single();

    if (error) {
      console.error('Ошибка при получении состояния пароля из Supabase:', error.message);
      console.log('Используем локальное хранилище пароля');
      localPasswordState.supabaseAvailable = false;
      return localPasswordState;
    }

    localPasswordState.supabaseAvailable = true;
    // Синхронизируем локальное состояние с Supabase
    localPasswordState.password = data.password;
    localPasswordState.valid = data.valid;
    return data;
  } catch (error) {
    console.error('Supabase недоступен:', error.message);
    console.log('Используем локальное хранилище пароля');
    localPasswordState.supabaseAvailable = false;
    return localPasswordState;
  }
}

async function savePasswordState(password, valid) {
  // Всегда сохраняем локально
  localPasswordState.password = password;
  localPasswordState.valid = valid;
  
  try {
    const { error } = await supabase
      .from('password_state')
      .upsert({ id: 1, password, valid }, { onConflict: 'id' });

    if (error) {
      console.error('Ошибка при сохранении состояния пароля в Supabase:', error.message);
      console.log('Пароль сохранен только локально');
      localPasswordState.supabaseAvailable = false;
    } else {
      localPasswordState.supabaseAvailable = true;
    }
  } catch (error) {
    console.error('Supabase недоступен:', error.message);
    console.log('Пароль сохранен только локально');
    localPasswordState.supabaseAvailable = false;
  }
}

async function addAuthorizedDevice(model, brand, device, password, androidId) {
  try {
    const { error } = await supabase
      .from('authorized_devices')
      .insert({ model, brand, device, password, android_id: androidId });

    if (error) {
      console.error('Ошибка при добавлении устройства в Supabase:', error.message);
    }
  } catch (error) {
    console.error('Supabase недоступен при добавлении устройства:', error.message);
  }
}

function generatePassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 7 }, () => characters[crypto.randomInt(0, characters.length)]).join(''); 
}

async function generateAndLogPassword() {
  const password = generatePassword();
  await savePasswordState(password, true);

  const telegramMessage = `<b>🔑 Новый пароль:</b>\n<code>${password}</code>`;
  console.log(`Сгенерирован новый код: ${password}`);
  sendToTelegram(telegramMessage);
}

async function sendToTelegram(message) {
  const { TELEGRAM_BOT_TOKEN: botToken, TELEGRAM_CHAT_ID: chatId } = process.env;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    });
    console.log('Сообщение отправлено в Telegram.');
    return response.data.result.message_id;
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram:', error.message);
  }
}

async function longPolling() {
  const { TELEGRAM_BOT_TOKEN: botToken, TELEGRAM_CHAT_ID: chatId } = process.env;
  let offset = 0;

  while (true) {
    const url = `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset}&timeout=60`;

    try {
      const response = await axios.get(url);
      const updates = response.data.result;

      if (updates.length > 0) {
        updates.forEach((update) => {
          offset = update.update_id + 1;

          if (update.message && update.message.chat.id === parseInt(chatId)) {
            if (update.message.text === '/pass') {
              console.log('Команда /pass получена. Генерируем новый пароль...');
              if (isAuthorizationCancelled) {
                sendToTelegram('❌ Авторизация отменена. Команда /pass отклонена.');
              } else {
                generateAndLogPassword();
              }
            } else if (update.message.text === '/cancel') {
              console.log('Команда /cancel получена. Отключаем авторизацию...');
              isAuthorizationCancelled = true;
              sendToTelegram('❌ Авторизация отменена. Все авторизационные запросы будут отклоняться.');
            } else if (update.message.text === '/start') {
              console.log('Команда /start получена. Разрешаем авторизацию...');
              isAuthorizationCancelled = false;
              sendToTelegram('✅ Авторизация разрешена. Вы можете продолжить.');
            }
          }
        });
      }
    } catch (error) {
      console.error('Ошибка при обработке long-polling:', error.message);
    }
  }
}

async function initializePassword() {
  const passwordState = await getPasswordState();

  if (!passwordState || !passwordState.valid) {
    console.log('Пароль не найден или уже использован. Генерируем новый...');
    await generateAndLogPassword();
  } else {
    console.log(`Текущий пароль: ${passwordState.password}`);
  }
}

initializePassword(); // инициализация пароля при запуске сервера
setInterval(generateAndLogPassword, 60 * 60 * 1000); // генерируем новый пароль раз в час

app.use(bodyParser.json());

app.post('/use-android-id', async (req, res) => {
  const { android_id, model, brand, device } = req.body;

  if (!android_id) {
    return res.status(400).json({ error: 'Android ID обязательно' });
  }

  if (isAuthorizationCancelled) {
    return res.status(403).json({ error: 'Авторизация отменена. Попробуйте позже.' });
  }

  // Проверяем, существует ли устройство с таким Android ID в базе
  try {
    const { data, error } = await supabase
      .from('authorized_devices')
      .select('*')
      .eq('android_id', android_id)
      .maybeSingle(); // Используем maybeSingle, чтобы избежать ошибки, если данных нет

    if (error) {
      console.error('Ошибка при проверке устройства в Supabase:', error.message);
      return res.status(500).json({ error: 'Ошибка проверки устройства' });
    }

    if (data) {
      // Если устройство найдено, то оно авторизовано
      const message = `✅ Устройство авторизовано по Android ID:\nМодель: ${model}\nБренд: ${brand}\nУстройство: ${device}\nAndroid ID: ${android_id}`;
      await sendToTelegram(message);

      return res.status(200).json({ message: 'Устройство авторизовано' });
    } else {
      // Если устройство не найдено в базе
      const message = `⚠️ Неудачная попытка авторизации по Android ID:\nМодель: ${model}\nБренд: ${brand}\nУстройство: ${device}\nAndroid ID: ${android_id}`;
      await sendToTelegram(message);

      return res.status(401).json({ error: 'Устройство не авторизовано' });
    }
  } catch (error) {
    console.error('Supabase недоступен при проверке Android ID:', error.message);
    const message = `⚠️ Суpabase недоступен. Попытка авторизации по Android ID:\nМодель: ${model}\nБренд: ${brand}\nУстройство: ${device}\nAndroid ID: ${android_id}`;
    await sendToTelegram(message);
    return res.status(503).json({ error: 'База данных временно недоступна. Используйте пароль для авторизации.' });
  }
});


app.post('/use-password', async (req, res) => {
  const { password, model, brand, device, android_id } = req.body;

  if (!password || !android_id) {
    return res.status(400).json({ error: 'Пароль и идентификатор устройства обязательны' });
  }

  if (isAuthorizationCancelled) {
    return res.status(403).json({ error: 'Авторизация отменена. Попробуйте позже.' });
  }

  const passwordState = await getPasswordState();

  if (passwordState.valid && passwordState.password === password) {
    await savePasswordState(passwordState.password, false);
    
    // Сначала отправляем сообщение об успешной авторизации
    const message = `✅ Успешное использование пароля:\nМодель: ${model}\nБренд: ${brand}\nУстройство: ${device}\nAndroid ID: ${android_id}`;
    await sendToTelegram(message);
    
    // Затем генерируем новый пароль (отправит второе сообщение)
    await generateAndLogPassword();
    await addAuthorizedDevice(model, brand, device, password, android_id);

    return res.status(200).json({ message: 'Пароль использован. Новый код сгенерирован.' });
  } else {
    const message = `⚠️ Неудачная попытка использования пароля:\nПароль: ${password}\nМодель: ${model}\nБренд: ${brand}\nУстройство: ${device}\nAndroid ID: ${android_id}`;
    await sendToTelegram(message);

    return res.status(401).json({ error: 'Неверный пароль или пароль уже использован' });
  }
});

function runTask() {
  console.log("Запланированная задача выполнена:", new Date());
}

app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, 'index.html');
    runTask();
  res.sendFile(htmlPath);
});

app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});

longPolling(); // начинаем long-polling
