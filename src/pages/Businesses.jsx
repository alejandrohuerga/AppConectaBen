import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Menu, Bell } from 'lucide-react';
import ConectaBenLogo from '@/components/ConectaBenLogo';
import { useNavigate } from 'react-router-dom';

const TABS = ['Ocio', 'Moda', 'Todos'];

const MOCK_BUSINESSES = [
  {
    id: '1', name: 'Multicines Benavente', tag: 'Los últimos estrenos te esperan', category: 'Ocio',
    color: '#e63946',
    image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
    emoji: '🎬'
  },
  {
    id: '2', name: 'Bolera Space', tag: 'Diversión, strikes y buen ambiente', category: 'Ocio',
    color: '#7b2d8b',
    image_url: '/images/bolera.jpg',
    emoji: '🎳'
  },
  {
    id: '3', name: 'CityJump Trampoline Park', tag: 'Salta sin límites, vive la adrenalina', category: 'Ocio',
    color: '#2dc653',
    image_url: '/images/trampolines.jpg',
    emoji: '🤸'
  },
  {
    id: '4', name: 'Starbucks Benavente', tag: 'Tu café favorito, ahora en Benavente', category: 'Ocio',
    color: '#00704A',
    image_url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80',
    emoji: '☕'
  },
  {
    id: '5', name: 'Tablao de Flamenco', tag: 'Arte, pasión y raíces españolas', category: 'Ocio',
    color: '#c0392b',
    image_url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&q=80',
    emoji: '💃'
  },
];

const MOCK_FASHION = [
  { id: 'f1', name: 'ZARA', subtitle: 'NUEVAS COLECCIONES', tag: 'Próximamente en Benavente', category: 'Moda', image_url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80' },
  { id: 'f2', name: 'Stradivarius', subtitle: 'NUEVAS COLECCIONES', tag: 'Próximamente en Benavente', category: 'Moda', image_url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80' },
  { id: 'f3', name: 'PULL&BEAR', subtitle: 'NUEVAS COLECCIONES', tag: 'Próximamente en Benavente', category: 'Moda', image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80' },
];

export default function Businesses() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    base44.entities.Business.list().then(data => {
      setBusinesses(data);
    }).catch(() => {});
  }, []);

  const showOcio = activeTab === 'Ocio' || activeTab === 'Todos';
  const showModa = activeTab === 'Moda' || activeTab === 'Todos';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button className="p-1"><Menu size={22} /></button>
        <ConectaBenLogo size={32} textSize="text-lg" />
        <div className="relative p-1">
          <Bell size={22} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">2</span>
        </div>
      </div>

      {/* Tab filters */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-border">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab ? 'bg-foreground text-background' : 'bg-card border border-border text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* Ocio Section */}
        {showOcio && (
          <section>
            <h2 className="text-2xl font-black text-foreground mb-1">✨ Nuevo Ocio</h2>
            <p className="text-primary font-semibold text-sm mb-4 italic">en Benavente</p>
            <div className="space-y-4">
              {MOCK_BUSINESSES.filter(b => activeTab === 'Todos' || b.category === activeTab).map(biz => (
                <div
                  key={biz.id}
                  onClick={() => navigate('/negocio', { state: { item: biz } })}
                  className="rounded-2xl overflow-hidden shadow-sm border border-border relative cursor-pointer active:scale-95 transition-transform"
                >
                  <img src={biz.image_url} alt={biz.name} className="w-full h-44 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent p-4 flex flex-col justify-end">
                    <span className="text-2xl mb-1">{biz.emoji}</span>
                    <h3 className="text-white text-xl font-black leading-tight">{biz.name}</h3>
                    <p className="text-white/80 text-xs mt-0.5">{biz.tag}</p>
                    <button
                      className="mt-2 self-start text-white text-xs font-bold px-4 py-1.5 rounded-full"
                      style={{ backgroundColor: biz.color }}
                    >
                      Ver más →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Moda Section */}
        {showModa && (
          <section>
            <h1 className="text-3xl font-black text-foreground text-center font-playfair mb-1">Moda Joven</h1>
            <p className="text-center text-xs tracking-widest text-muted-foreground uppercase mb-5">Próximamente en Benavente</p>
            <div className="space-y-3">
              {MOCK_FASHION.map(brand => (
                <div key={brand.id} className="rounded-2xl overflow-hidden shadow-sm border border-border relative">
                  <img src={brand.image_url} alt={brand.name} className="w-full h-44 object-cover" />
                  <div className="absolute inset-0 flex flex-col justify-center p-5">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 max-w-[160px]">
                      <h3 className="text-foreground font-black text-xl leading-none font-playfair">{brand.name}</h3>
                      <p className="text-muted-foreground text-[10px] tracking-widest mt-1">{brand.subtitle}</p>
                      <div className="w-6 h-px bg-foreground my-1" />
                      <p className="text-muted-foreground text-[10px]">{brand.tag}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Exclusivo ConectaBen */}
            <div className="mt-4 bg-card border border-border rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">🏷️</span>
                <div>
                  <p className="font-bold text-xs text-foreground">EXCLUSIVO CONECTABEN</p>
                  <p className="text-[11px] text-muted-foreground">Ofertas y novedades antes que nadie</p>
                </div>
              </div>
              <span className="text-muted-foreground">›</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}