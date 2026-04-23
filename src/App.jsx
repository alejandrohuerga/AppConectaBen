import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Register from '@/pages/Register';
import Preferences from '@/pages/Preferences';
import Events from '@/pages/Events';
import Education from '@/pages/Education';
import Businesses from '@/pages/Businesses';
import Voting from '@/pages/Voting';
import Profile from '@/pages/Profile';
import Admin from '@/pages/Admin';
import Notifications from '@/pages/Notifications';
import NewsDetail from '@/pages/NewsDetail';
import BusinessDetail from '@/pages/BusinessDetail';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://media.base44.com/images/public/user_69ea08668f1e33b76e29c6c1/373803ae3_WhatsAppImage2026-04-21at213936.jpeg"
            alt="ConectaBen"
            className="w-16 h-16 rounded-full object-cover shadow-md animate-pulse"
          />
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/registro" element={<Register />} />
      <Route path="/preferencias" element={<Preferences />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/notificaciones" element={<Notifications />} />
      <Route path="/detalle" element={<NewsDetail />} />
      <Route path="/negocio" element={<BusinessDetail />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/formacion" element={<Education />} />
        <Route path="/comercios" element={<Businesses />} />
        <Route path="/votar" element={<Voting />} />
        <Route path="/perfil" element={<Profile />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;