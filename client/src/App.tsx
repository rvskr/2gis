import { Switch, Route, useLocation, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Home } from "@/pages/home";
import InstructionsPage from "@/pages/instructions-page";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/online-instructions" component={InstructionsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Определяем базовый путь динамически
  const base = import.meta.env.PROD ? "/2gis" : undefined;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* Передаем base только в продакшн-режиме */}
        <Router base={base}>
          <AppRoutes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;