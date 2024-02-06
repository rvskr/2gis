document.getElementById('learnMoreBtn').addEventListener('click', function() {
  alert('Спасибо за ваш интерес!');
});
.cards {
  display: flex; /* Используем flexbox */
  flex-wrap: wrap; /* Разрешаем перенос на новую строку, если карточек слишком много */
  justify-content: space-around; /* Выравниваем карточки по центру горизонтально */
}

.card {
  width: calc(25% - 20px); /* Устанавливаем ширину карточек, занимая максимум 25% доступного пространства с учетом отступов */
  margin: 10px; /* Добавляем отступы между карточками */
  box-sizing: border-box; /* Учитываем отступы внутри ширины карточки */
}
