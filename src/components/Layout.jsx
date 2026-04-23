import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, GraduationCap, ShoppingBag, BarChart2, User, MapPin } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Inicio' },
  { to: '/eventos', icon: Calendar, label: 'Eventos' },
  { to: '/formacion', icon: GraduationCap, label: 'Formación' },
  { to: '/comercios', icon: ShoppingBag, label: 'Comercios' },
  { to: '/votar', icon: BarChart2, label: 'Votar' },
  { to: '/perfil', icon: User, label: 'Perfil' },
];

export default function Layout() {
  const location = useLocation();
  const hideNav = ['/login', '/registro', '/preferencias'].some(p => location.pathname.startsWith(p));

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <main className={`flex-1 overflow-y-auto ${hideNav ? '' : 'pb-20'}`}>
        <Outlet />
      </main>
      {!hideNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-50">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                    <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}