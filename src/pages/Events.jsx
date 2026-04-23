import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell, Bookmark, BookmarkCheck, Calendar, Clock, MapPin } from 'lucide-react';
import ConectaBenLogo from '@/components/ConectaBenLogo';
import { format, addDays, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import FullCalendarModal from '@/components/FullCalendarModal';

const CATEGORIES = ['Conciertos', 'Deportes', 'Cultura', 'Familia', 'Todos'];
const CAT_COLORS = { Conciertos: 'text-orange-600', Deportes: 'text-green-600', Cultura: 'text-purple-600', Familia: 'text-blue-600', Gastronomía: 'text-red-600' };

const MOCK_EVENTS = [
  { id: '1', title: 'Concierto de Sidecars', category: 'Conciertos', date: '2025-05-24', time: '21:30 h', location: 'Teatro Reina Sofía', image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80' },
  { id: '2', title: 'Carrera Popular Ciudad de Benavente', category: 'Deportes', date: '2025-05-25', time: '10:00 h', location: 'Paseo de la Mota', image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80' },
  { id: '3', title: 'Visita guiada al Castillo de Benavente', category: 'Cultura', date: '2025-05-31', time: '12:00 h', location: 'Torre del Caracol, Castillo de Benavente', image_url: '../webroot/images/castillobenavente.jpg' },
  { id: '4', title: 'Taller infantil: Pequeños Artistas', category: 'Familia', date: '2025-06-01', time: '17:00 h', location: 'Centro Cívico', image_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80' },
  { id: '5', title: 'Mercado de productores locales', category: 'Gastronomía', date: '2025-06-07', time: '09:00 h', location: 'Plaza Mayor', image_url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
];

const WEEK_DAYS = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedDay, setSelectedDay] = useState(3);
  const [favorites, setFavorites] = useState({});
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    base44.entities.Event.list().then(data => {
      if (data.length > 0) setEvents([...MOCK_EVENTS, ...data]);
    }).catch(() => {});
  }, []);

  const filtered = activeCategory === 'Todos' ? events : events.filter(e => e.category === activeCategory);

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const toggleFavorite = async (ev) => {
    const key = ev.id;
    if (favorites[key]) {
      setFavorites(prev => { const n = { ...prev }; delete n[key]; return n; });
    } else {
      setFavorites(prev => ({ ...prev, [key]: true }));
      const user = await base44.auth.me().catch(() => null);
      if (user) {
        base44.entities.Favorite.create({ item_id: ev.id, item_type: 'event', item_title: ev.title, item_image: ev.image_url, user_email: user.email }).catch(() => {});
      }
    }
  };

  const formatDate = (dateStr) => {
    try {
      return format(new Date(dateStr), 'd MMMM yyyy', { locale: es });
    } catch { return dateStr; }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Eventos y Planes</h1>
        <button onClick={() => navigate('/notificaciones')} className="relative">
          <Bell size={22} className="text-foreground" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">2</span>
        </button>
      </div>

      {showCalendar && <FullCalendarModal onClose={() => setShowCalendar(false)} />}

      {/* Calendar strip */}
      <div className="bg-card px-4 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-3 mt-3">
          <button className="font-bold text-foreground flex items-center gap-1">
            Mayo 2025 <span className="text-sm">▾</span>
          </button>
          <div className="flex gap-2 items-center">
            <button className="text-muted-foreground">‹</button>
            <button onClick={() => setShowCalendar(true)} className="p-1 rounded-full hover:bg-muted transition-colors">
              <Calendar size={18} className="text-primary" />
            </button>
            <button className="text-muted-foreground">›</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {WEEK_DAYS.map((d, i) => (
            <div key={d} className="flex flex-col items-center gap-1">
              <span className="text-[11px] text-muted-foreground font-medium">{d}</span>
              <button
                onClick={() => setSelectedDay(i)}
                className={`w-8 h-8 rounded-full text-sm font-semibold transition-all ${selectedDay === i ? 'bg-foreground text-background' : 'text-foreground hover:bg-muted'}`}
              >
                {weekDays[i].getDate()}
              </button>
              <div className={`w-1 h-1 rounded-full ${[0, 3, 4].includes(i) ? 'bg-primary' : 'bg-transparent'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat ? 'bg-foreground text-background' : 'bg-card border border-border text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events list */}
      <div className="px-4 pb-4 space-y-3">
        <h3 className="font-bold text-foreground text-base">Próximos eventos</h3>
        {filtered.map(ev => (
          <div key={ev.id} onClick={() => navigate('/detalle', { state: { item: ev } })} className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm flex gap-3 cursor-pointer active:scale-95 transition-transform">
            <img src={ev.image_url} alt={ev.title} className="w-28 h-28 object-cover flex-shrink-0" />
            <div className="flex-1 p-3 relative">
              <button onClick={() => toggleFavorite(ev)} className="absolute top-3 right-3">
                {favorites[ev.id] ? <BookmarkCheck size={18} className="text-primary" /> : <Bookmark size={18} className="text-muted-foreground" />}
              </button>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${CAT_COLORS[ev.category] || 'text-primary'}`}>{ev.category}</span>
              <h4 className="font-bold text-foreground text-sm mt-0.5 pr-6 leading-snug">{ev.title}</h4>
              <div className="flex items-center gap-1 mt-1.5 text-muted-foreground">
                <Calendar size={11} />
                <span className="text-[11px]">{formatDate(ev.date)}</span>
                {ev.time && <><Clock size={11} className="ml-1" /><span className="text-[11px]">{ev.time}</span></>}
              </div>
              {ev.location && (
                <div className="flex items-center gap-1 mt-0.5 text-muted-foreground">
                  <MapPin size={11} />
                  <span className="text-[11px]">{ev.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}