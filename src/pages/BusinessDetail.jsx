import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, Clock, Star, Phone, ChevronRight } from 'lucide-react';

export default function BusinessDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;

  if (!item) { navigate(-1); return null; }

  const info = BUSINESS_INFO[item.id] || {};

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64">
        <img src={info.heroImage || item.image_url} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        {info.badge && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-foreground">{info.badge}</span>
          </div>
        )}
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black text-foreground leading-tight">{item.name}</h1>
              <p className="text-sm text-primary font-medium mt-0.5">{item.tag}</p>
            </div>
            {info.rating && (
              <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full">
                <Star size={13} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-yellow-700">{info.rating}</span>
              </div>
            )}
          </div>
        </div>

        {/* Info pills */}
        {info.details && (
          <div className="bg-accent/40 rounded-2xl p-4 space-y-2">
            {info.details.map((d, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                <d.icon size={15} className="text-primary flex-shrink-0" />
                <span>{d.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <div>
          <h2 className="font-bold text-foreground mb-2">¿Qué es?</h2>
          <p className="text-sm text-foreground leading-relaxed">{info.description}</p>
        </div>

        {/* Highlights */}
        {info.highlights && (
          <div>
            <h2 className="font-bold text-foreground mb-3">Lo que encontrarás</h2>
            <div className="space-y-2">
              {info.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-3">
                  <span className="text-lg">{h.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{h.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extra images */}
        {info.extraImages && (
          <div>
            <h2 className="font-bold text-foreground mb-3">Galería</h2>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {info.extraImages.map((img, i) => (
                <img key={i} src={img} alt="" className="flex-shrink-0 w-36 h-24 object-cover rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {/* Coming soon banner */}
        {item.is_coming_soon && (
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 text-center">
            <p className="text-primary font-bold text-base">🚀 Próximamente en Benavente</p>
            <p className="text-primary/70 text-xs mt-1">Síguenos para enterarte de la fecha de apertura</p>
          </div>
        )}

        {/* CTA button */}
        {item.website && (
          <a href={item.website} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-2xl font-bold text-sm">
            <Globe size={16} /> Visitar web oficial
          </a>
        )}
      </div>
    </div>
  );
}

const BUSINESS_INFO = {
  '1': {
    heroImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    badge: '🎬 Cine',
    rating: '4.3',
    description: 'Multicines Benavente es el referente del entretenimiento cinematográfico en la comarca. Con varias salas equipadas con la última tecnología en proyección digital y sonido Dolby, ofrece los estrenos más esperados de Hollywood y el cine europeo semana a semana. Un espacio cómodo, moderno y familiar donde disfrutar del séptimo arte.',
    details: [
      { icon: MapPin, text: 'Av. de la Mota, Benavente' },
      { icon: Clock, text: 'Sesiones de 16:00 a 23:00 h · Todos los días' },
      { icon: Phone, text: '980 XXX XXX' },
    ],
    highlights: [
      { emoji: '🎥', title: 'Estrenos semanales', desc: 'Las últimas películas en versión original y doblada.' },
      { emoji: '🍿', title: 'Zona de snacks', desc: 'Palomitas, refrescos y todo lo que necesitas para disfrutar.' },
      { emoji: '👨‍👩‍👧', title: 'Sesiones familiares', desc: 'Programación especial para los más pequeños los fines de semana.' },
      { emoji: '💺', title: 'Butacas premium', desc: 'Salas con butacas reclinables para mayor comodidad.' },
    ],
    extraImages: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80',
      'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=400&q=80',
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80',
    ],
  },
  '2': {
    heroImage: 'https://images.unsplash.com/photo-1612279867574-68f8e45dc4e3?w=800&q=80',
    badge: '🎳 Bolera',
    rating: '4.6',
    description: 'Bolera Space es el centro de diversión y entretenimiento familiar por excelencia en Benavente. Con pistas de bolos profesionales, máquinas recreativas y zona de restauración, es el lugar ideal para pasar una tarde en familia o celebrar cumpleaños y eventos especiales. Su ambiente animado y su equipo siempre atento garantizan momentos inolvidables.',
    details: [
      { icon: MapPin, text: 'Polígono Industrial de Benavente' },
      { icon: Clock, text: 'Abierto de 11:00 a 23:00 h · Todos los días' },
      { icon: Phone, text: 'Reservas: 980 XXX XXX' },
    ],
    highlights: [
      { emoji: '🎳', title: '12 pistas profesionales', desc: 'Pistas homologadas con sistema de puntuación automático.' },
      { emoji: '🎮', title: 'Zona arcade', desc: 'Más de 30 máquinas recreativas para todas las edades.' },
      { emoji: '🍔', title: 'Cafetería y restaurante', desc: 'Menús, hamburguesas, bocadillos y todo tipo de bebidas.' },
      { emoji: '🎂', title: 'Celebraciones', desc: 'Paquetes especiales para cumpleaños y eventos de empresa.' },
    ],
    extraImages: [
      'https://images.unsplash.com/photo-1567604460-4f9a62e24dcf?w=400&q=80',
      'https://images.unsplash.com/photo-1531496730074-83b227ba3098?w=400&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
    ],
  },
  '3': {
    heroImage: 'https://images.unsplash.com/photo-1597075653948-fb4b3e0cbfca?w=800&q=80',
    badge: '🤸 Acrobacias',
    rating: '4.8',
    description: 'CityJump Trampoline Park es el parque de trampolines más grande de la provincia. Un espacio de más de 2.000 m² repleto de trampolines, zonas de espuma, paredes de escalada y rampas de freestyle. Ideal para niños, jóvenes y adultos que quieran liberar energía, practicar deporte de una forma diferente y vivir emociones únicas.',
    details: [
      { icon: MapPin, text: 'Centro Comercial Benavente, Planta 1' },
      { icon: Clock, text: 'Lun-Vie: 16:00-21:00 · Sáb-Dom: 11:00-21:00' },
      { icon: Phone, text: 'Reservas online disponibles' },
    ],
    highlights: [
      { emoji: '🤸', title: 'Zona de trampolines', desc: 'Más de 50 trampolines interconectados para saltar sin límites.' },
      { emoji: '🧱', title: 'Pared de escalada foam', desc: 'Practica escalada con caída segura a zona acolchada.' },
      { emoji: '🏄', title: 'Skate & Freestyle', desc: 'Rampas y bowls para practicar trucos con seguridad.' },
      { emoji: '👶', title: 'Zona toddler', desc: 'Área exclusiva y segura para los más pequeños (0-5 años).' },
    ],
    extraImages: [
      'https://images.unsplash.com/photo-1597075653948-fb4b3e0cbfca?w=400&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&q=80',
    ],
  },
  '4': {
    heroImage: 'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=800&q=80',
    badge: '☕ Café',
    rating: '4.5',
    description: 'Starbucks llega a Benavente para ofrecer la experiencia de café premium más reconocida del mundo. Desde sus icónicos Frappuccinos hasta los lattes más especiados, cada visita es una pausa especial en tu día. Un espacio cálido, acogedor y con WiFi gratuito, perfecto para trabajar, estudiar o simplemente disfrutar con amigos.',
    details: [
      { icon: MapPin, text: 'Centro Comercial Benavente, Planta Baja' },
      { icon: Clock, text: 'Lun-Dom: 08:00-22:00 h' },
      { icon: Globe, text: 'www.starbucks.es' },
    ],
    highlights: [
      { emoji: '☕', title: 'Más de 80 bebidas', desc: 'Cafés, tés, Frappuccinos y bebidas de temporada exclusivas.' },
      { emoji: '🥐', title: 'Repostería artesanal', desc: 'Croissants, muffins, sándwiches y tartas recién horneadas.' },
      { emoji: '📱', title: 'Personaliza tu pedido', desc: 'Más de 170.000 combinaciones posibles. Tu bebida, a tu manera.' },
      { emoji: '💚', title: 'Sostenibilidad', desc: 'Vasos reutilizables, café de comercio justo y packaging ecológico.' },
    ],
    extraImages: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80',
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80',
    ],
  },
  '5': {
    heroImage: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80',
    badge: '💃 Flamenco',
    rating: '4.9',
    description: 'El Tablao de Flamenco de Benavente es un espacio cultural único en la comarca dedicado al arte flamenco en su máxima expresión. Actuaciones en vivo con bailaores y cantaores profesionales, acompañados de guitarristas de primera categoría. Una experiencia visceral, emotiva y auténtica que conecta con las raíces más profundas de la cultura española.',
    details: [
      { icon: MapPin, text: 'Casco Histórico de Benavente' },
      { icon: Clock, text: 'Actuaciones: Vie y Sáb 21:00 h y 23:00 h' },
      { icon: Phone, text: 'Reservas: 980 XXX XXX' },
    ],
    highlights: [
      { emoji: '💃', title: 'Espectáculos en vivo', desc: 'Actuaciones de bailaores y cantaores de reconocido prestigio nacional.' },
      { emoji: '🎸', title: 'Guitarristas en directo', desc: 'Acompañamiento musical en vivo con guitarras de flamenco.' },
      { emoji: '🍷', title: 'Cena-espectáculo', desc: 'Menú degustación de cocina española con vinos de la tierra.' },
      { emoji: '🎓', title: 'Talleres de flamenco', desc: 'Clases para principiantes impartidas por bailaores profesionales.' },
    ],
    extraImages: [
      'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80',
    ],
  },
};