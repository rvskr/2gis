import { Switch, Route, useLocation, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Home } from "@/pages/home";
import InstructionsPage from "@/pages/instructions-page";

// Переименуем вашу функцию Router, чтобы не было конфликта с компонентом Router из wouter
function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/online-instructions" component={InstructionsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* Оберните AppRoutes в компонент Router с base */}
        <Router base="/2gis/">
          <AppRoutes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;