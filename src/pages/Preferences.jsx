import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Film, Music, Shirt, GraduationCap, Zap, Utensils, Rocket, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const INTERESTS = [
  { id: 'cine', label: 'Cine y Series', icon: Film },
  { id: 'conciertos', label: 'Conciertos', icon: Music },
  { id: 'moda', label: 'Moda Joven', icon: Shirt },
  { id: 'cursos', label: 'Cursos Online', icon: GraduationCap },
  { id: 'deporte', label: 'Deporte', icon: Zap },
  { id: 'gastronomia', label: 'Gastronomía', icon: Utensils },
  { id: 'emprendimiento', label: 'Emprendimiento', icon: Rocket },
  { id: 'tiendas', label: 'Nuevas Tiendas', icon: ShoppingBag },
];

export default function Preferences() {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleFinish = async () => {
    setLoading(true);
    await base44.auth.updateMe({ interests: selected, preferences_done: true });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-6 py-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://media.base44.com/images/public/user_69ea08668f1e33b76e29c6c1/373803ae3_WhatsAppImage2026-04-21at213936.jpeg"
            alt="ConectaBen"
            className="w-16 h-16 rounded-full object-cover mb-2"
          />
          <p className="text-sm text-muted-foreground">ConectaBen</p>
        </div>

        <h1 className="text-4xl font-bold text-foreground text-center mb-2">Tus Intereses</h1>
        <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground text-center text-sm mb-8">
          Personaliza tu experiencia. Cuéntanos qué te gusta para recomendarte lo mejor de Benavente.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {INTERESTS.map(({ id, label, icon: Icon }) => {
            const isSelected = selected.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={`flex items-center gap-3 px-4 py-4 rounded-2xl border-2 font-medium text-sm transition-all ${
                  isSelected
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-card border-border text-foreground hover:border-primary/50'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleFinish}
          disabled={loading}
          className="w-full h-14 rounded-2xl text-base font-bold bg-primary hover:bg-primary/90 shadow-md"
        >
          {loading ? 'Guardando...' : 'Finalizar'}
        </Button>
      </div>
    </div>
  );
}