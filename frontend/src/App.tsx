import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import MarketplacePage from "./pages/marketplace/MarketplacePage";
import CartPage from "./pages/marketplace/CartPage";
import StartupProfile from "./pages/StartupProfile";
import MentorProfile from "./pages/MentorProfile";
import MentorConnect from "./pages/MentorConnect";
import Wishlist from "./pages/Wishlist";
import Startups from "./pages/Startups";
import NotFound from "./pages/NotFound";
import ItemDetail from "./pages/ItemDetail";

// Import dashboard components
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import StartupDashboard from "./pages/dashboards/StartupDashboard";
import MentorDashboard from "./pages/dashboards/MentorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

// Auth protection component
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: string }) => {
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;

  if (!userData) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && userData.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="bg-white min-h-screen w-full">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              
              {/* Public routes */}
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/marketplace/cart" element={<CartPage />} />
              <Route path="/mentor-connect" element={<MentorConnect />} />
              <Route path="/mentor/:id" element={<MentorProfile />} />
              <Route path="/startup/:id" element={<StartupProfile />} />
              <Route path="/startups" element={<Startups />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/item/:type/:id" element={<ItemDetail />} />
              
              {/* Protected dashboard routes */}
              <Route path="/student/dashboard" element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/startup/dashboard" element={
                <ProtectedRoute requiredRole="startup">
                  <StartupDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/mentor/dashboard" element={
                <ProtectedRoute requiredRole="mentor">
                  <MentorDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              {/* Redirect to signin for any other /dashboard route */}
              <Route path="/dashboard" element={<Navigate to="/signin" replace />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
