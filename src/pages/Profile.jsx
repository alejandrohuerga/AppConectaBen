import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
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

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      setBio(u.bio || '');
    }).catch(() => {});
    base44.entities.Favorite.list().then(setFavorites).catch(() => {});
  }, []);

  const handleSave = async () => {
    await base44.auth.updateMe({ bio });
    setUser(prev => ({ ...prev, bio }));
    setEditing(false);
    toast.success('Perfil actualizado');
  };

  const handleLogout = () => {
    base44.auth.logout('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isAdmin = user.role === 'admin';
  const initials = user.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'CB';

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header bg */}
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
            <p className="text-muted-foreground text-sm">{user.bio || 'Sin descripción. Toca el lápiz para añadir una.'}</p>
          )}
        </div>

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
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
        )}

        {/* Favorites */}
        {favorites.length > 0 && (
          <div className="bg-card rounded-2xl border border-border p-4 mb-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">Mis guardados ({favorites.length})</h3>
            <div className="space-y-2">
              {favorites.slice(0, 5).map(fav => (
                <div key={fav.id} className="flex items-center gap-3">
                  {fav.item_image && <img src={fav.item_image} className="w-10 h-10 rounded-lg object-cover" alt="" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{fav.item_title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{fav.item_type}</p>
                  </div>
                  <BookmarkCheck size={14} className="text-primary flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Panel */}
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