import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Bell, Heart, ChevronRight, MapPin, Clock } from 'lucide-react';
import ConectaBenLogo from '@/components/ConectaBenLogo';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const NEWS_SAMPLE = [
  { id: '1', title: 'Benavente celebra las Fiestas del Toro 2025', category: 'Local', image_url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80', time: 'Hace 2 horas', likes: 24 },
  { id: '2', title: 'Nuevo centro joven "Espacio Benavente" ya abierto', category: 'Noticia', image_url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80', time: 'Hace 5 horas', likes: 38 },
  { id: '3', title: 'Torneo de Pádel en Benavente', category: 'Deporte', image_url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80', time: 'Hace 1 día', likes: 15 },
];

const EVENTS_SAMPLE = [
  { id: '1', title: 'Concierto en la Plaza Mayor', date: '14 de junio · 22:00', location: 'Plaza Mayor', image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80', color: 'bg-purple-500', category: 'Conciertos' },
  { id: '2', title: 'Visita guiada al Castillo de Benavente', date: '31 de mayo · 12:00', location: 'Torre del Caracol', image_url: 'https://images.unsplash.com/photo-1548526928-eb8f3ad04bd6?w=400&q=80', color: 'bg-primary', category: 'Cultura' },
  { id: '3', title: 'Mercado de Productores', date: 'Todos los sábados', location: 'Plaza de Abastos', image_url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80', color: 'bg-orange-500', category: 'Gastronomía' },
];

const CATEGORY_COLORS = { Local: 'bg-blue-500', Noticia: 'bg-green-500', Deporte: 'bg-orange-500', Cultura: 'bg-purple-500' };

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const userName = user?.full_name?.split(' ')[0] || 'Benaventano';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button onClick={() => navigate('/perfil')} className="p-1">
          <span className="text-xl">☰</span>
        </button>
        <ConectaBenLogo size={32} textSize="text-lg" />
        <button className="relative p-1" onClick={() => navigate('/notificaciones')}>
          <Bell size={22} className="text-foreground" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* Greeting */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">¡Hola, {userName}! 👋</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Descubre lo mejor de Benavente</p>
        </div>

        {/* Novedades */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-foreground">Novedades</h3>
            <button onClick={() => navigate('/eventos')} className="text-primary text-sm font-medium">Ver todo</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {NEWS_SAMPLE.map(news => (
              <div key={news.id} onClick={() => navigate('/detalle', { state: { item: { ...news, time_ago: news.time } } })} className="flex-shrink-0 w-44 bg-card rounded-2xl overflow-hidden shadow-sm border border-border cursor-pointer active:scale-95 transition-transform">
                <div className="relative">
                  <img src={news.image_url} alt={news.title} className="w-full h-24 object-cover" />
                  <span className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[news.category] || 'bg-primary'}`}>
                    {news.category}
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2">{news.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">{news.time}</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Heart size={11} />
                      <span className="text-[10px]">{news.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recomendados */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-foreground">Recomendados</h3>
            <button onClick={() => navigate('/eventos')} className="text-primary text-sm font-medium">Ver todo</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {EVENTS_SAMPLE.map(ev => (
              <div
                key={ev.id}
                className="flex-shrink-0 w-40 rounded-2xl overflow-hidden shadow-sm relative cursor-pointer active:scale-95 transition-transform"
                onClick={() => navigate('/detalle', { state: { item: ev } })}
              >
                <img src={ev.image_url} alt={ev.title} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 flex flex-col justify-end">
                  <p className="text-white text-xs font-bold leading-snug">{ev.title}</p>
                  <p className="text-white/80 text-[10px] mt-0.5">{ev.date}</p>
                  <div className="flex items-center gap-1 text-white/70 mt-0.5">
                    <MapPin size={9} />
                    <span className="text-[9px]">{ev.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-primary rounded-2xl p-5 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10 max-w-[60%]">
            <p className="text-primary-foreground font-bold text-base leading-snug">
              Conecta con tu ciudad, aprende, participa y vive Benavente
            </p>
          </div>
          <div className="flex gap-2">
            <span className="text-2xl">💬</span>
            <span className="text-2xl">❤️</span>
          </div>
        </div>
      </div>
    </div>
  );
}