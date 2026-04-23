
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, LogOut, Heart, BookmarkCheck, Settings, ChevronRight, Camera, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const INTERESTS_MAP = {
  cine: { label: 'Cine y Series', emoji: '🎬' },
  conciertos: { label: 'Conciertos', emoji: '🎵' },
  moda: { label: 'Moda Joven', emoji: '👗' },
  cursos: { label: 'Cursos Online', emoji: '📚' },
  deporte: { label: 'Deporte', emoji: '⚡' },
  gastronomia: { label: 'Gastronomía', emoji: '🍴' },
  emprendimiento: { label: 'Emprendimiento', emoji: '🚀' },
  tiendas: { label: 'Nuevas Tiendas', emoji: '🛍️' },
};

// --- DATOS MANUALES ---
const MANUAL_USER = {
  full_name: 'Usuario Administrador',
  email: 'admin@ejemplo.com',
  role: 'admin',
  avatar_url: null, // Puedes poner una URL de imagen aquí
  bio: 'Gestor de contenido y entusiasta de la tecnología.',
  interests: ['cine', 'cursos', 'emprendimiento'],
  preferences_done: true
};

export default function Profile() {
  // Mantenemos estados locales para que la interfaz siga siendo interactiva (editar bio, etc)
  const [user] = useState(MANUAL_USER);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(MANUAL_USER.bio);
  const [favorites, setFavorites] = useState([]); // Estos pueden quedar vacíos o manuales también
  const navigate = useNavigate();

  const handleSave = () => {
    // Simulamos guardado local
    setEditing(false);
    toast.success('Perfil actualizado (Simulado)');
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate('/');
  };

  const isAdmin = user.role === 'admin';
  const initials = user.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AD';

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-primary h-32 relative" />

      <div className="px-4 -mt-14 relative z-10 pb-8">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-card border-4 border-background shadow-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{initials}</span>
              </div>
            )}
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-background">
              <Camera size={12} className="text-primary-foreground" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-foreground mt-3">{user.full_name}</h2>
          <p className="text-muted-foreground text-sm">{user.email}</p>
          {isAdmin && (
            <span className="mt-1 text-xs font-bold text-primary bg-accent px-3 py-0.5 rounded-full flex items-center gap-1">
              <Shield size={11} /> Admin
            </span>
          )}
        </div>

        {/* Bio */}
        <div className="bg-card rounded-2xl border border-border p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground text-sm">Sobre mí</h3>
            <button onClick={() => setEditing(!editing)} className="text-primary">
              <Edit2 size={15} />
            </button>
          </div>
          {editing ? (
            <div className="space-y-2">
              <Input value={bio} onChange={e => setBio(e.target.value)} placeholder="Escribe algo sobre ti..." className="text-sm rounded-xl" />
              <Button size="sm" onClick={handleSave} className="w-full rounded-xl">Guardar</Button>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">{bio || 'Sin descripción.'}</p>
          )}
        </div>

        {/* Interests (Usando tus datos manuales) */}
        <div className="bg-card rounded-2xl border border-border p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground text-sm">Mis intereses</h3>
            <button onClick={() => navigate('/preferencias')} className="text-primary text-xs">Editar</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.interests.map(id => {
              const item = INTERESTS_MAP[id];
              if (!item) return null;
              return (
                <span key={id} className="flex items-center gap-1 bg-accent text-accent-foreground text-xs px-3 py-1.5 rounded-full font-medium">
                  {item.emoji} {item.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Admin Panel (Visible porque role es admin) */}
        {isAdmin && (
          <button
            onClick={() => navigate('/admin')}
            className="w-full bg-primary text-primary-foreground rounded-2xl p-4 flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <Settings size={20} />
              <div className="text-left">
                <p className="font-bold text-sm">Panel de Administración</p>
                <p className="text-primary-foreground/70 text-xs">Gestionar contenido</p>
              </div>
            </div>
            <ChevronRight size={18} />
          </button>
        )}

        {/* Menu items */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4">
          <button
            onClick={() => navigate('/preferencias')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors border-b border-border"
          >
            <span className="text-sm font-medium text-foreground">Mis intereses</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <span className="text-sm font-medium text-foreground">Configuración</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-destructive/30 text-destructive font-medium text-sm"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}