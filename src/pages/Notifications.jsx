import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Calendar, Newspaper, GraduationCap, BarChart2 } from 'lucide-react';

const NOTIFICATIONS = [
  { id: '1', icon: Calendar, color: 'bg-orange-100 text-orange-600', title: 'Nuevo evento: Concierto de Sidecars', body: 'El 24 de mayo en el Teatro Reina Sofía a las 21:30h. ¡No te lo pierdas!', time: 'Hace 2 horas' },
  { id: '2', icon: Newspaper, color: 'bg-blue-100 text-blue-600', title: 'Novedad local: Espacio Benavente abierto', body: 'El nuevo centro joven ha abierto sus puertas. Aprende, crea y conecta.', time: 'Hace 5 horas' },
  { id: '3', icon: GraduationCap, color: 'bg-purple-100 text-purple-600', title: 'Nuevo curso disponible', body: 'Inglés Intermedio B1 ya disponible. 30 horas para llevar tu nivel al siguiente escalón.', time: 'Hace 1 día' },
  { id: '4', icon: BarChart2, color: 'bg-green-100 text-green-600', title: '¡Tu opinión cuenta!', body: 'Nueva votación activa: ¿Qué tienda quieres que venga a Benavente? Vota ahora.', time: 'Hace 2 días' },
  { id: '5', icon: Calendar, color: 'bg-red-100 text-red-600', title: 'Mañana: Carrera Popular', body: 'Recuerda que mañana a las 10:00h sale la Carrera Popular desde el Paseo de la Mota.', time: 'Hace 3 días' },
  { id: '6', icon: Newspaper, color: 'bg-orange-100 text-orange-600', title: 'Fiestas del Toro 2025', body: 'Del 13 al 17 de junio, tradición, música y diversión en Benavente. ¡Prepárate!', time: 'Hace 4 días' },
];

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="font-bold text-lg text-foreground flex-1">Notificaciones</h1>
        <Bell size={20} className="text-muted-foreground" />
      </div>

      <div className="px-4 py-4 space-y-3">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Recientes</p>
        {NOTIFICATIONS.map((notif, i) => {
          const Icon = notif.icon;
          return (
            <div
              key={notif.id}
              className={`bg-card border border-border rounded-2xl p-4 flex gap-3 shadow-sm ${i < 2 ? 'border-primary/20 bg-accent/30' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm leading-snug">{notif.title}</p>
                <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{notif.body}</p>
                <p className="text-muted-foreground text-[10px] mt-1.5">{notif.time}</p>
              </div>
              {i < 2 && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}