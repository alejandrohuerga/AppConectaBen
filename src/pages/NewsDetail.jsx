import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart, Bookmark, BookmarkCheck, Share2, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

export default function NewsDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!item) {
    navigate(-1);
    return null;
  }

  const isEvent = item.date || item.time || item.location;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero image */}
      <div className="relative h-64">
        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className="w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            {saved ? <BookmarkCheck size={16} className="text-white" /> : <Bookmark size={16} className="text-white" />}
          </button>
          <button className="w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Share2 size={16} className="text-white" />
          </button>
        </div>
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* Category + time */}
        <div className="flex items-center justify-between">
          {item.category && (
            <span className="text-xs font-bold text-white bg-primary px-3 py-1 rounded-full uppercase tracking-wide">
              {item.category}
            </span>
          )}
          {item.time_ago && <span className="text-xs text-muted-foreground">{item.time_ago}</span>}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black text-foreground leading-snug">{item.title}</h1>

        {/* Event details */}
        {isEvent && (
          <div className="bg-accent/50 rounded-2xl p-4 space-y-2">
            {item.date && (
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Clock size={15} className="text-primary" />
                <span className="font-medium">{item.date}{item.time ? ` · ${item.time}` : ''}</span>
              </div>
            )}
            {item.location && (
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MapPin size={15} className="text-primary" />
                <span>{item.location}</span>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="prose prose-sm max-w-none">
          {(item.description || item.summary || generateDescription(item)).split('\n').map((line, i) => (
            line.trim() === '' ? <br key={i} /> : <p key={i} className="text-foreground leading-relaxed text-sm mb-2">{line}</p>
          ))}
        </div>

        {/* Like button */}
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-medium text-sm transition-all ${
            liked ? 'bg-red-50 border-red-300 text-red-600' : 'border-border text-foreground'
          }`}
        >
          <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : ''} />
          {liked ? 'Te gusta' : 'Me gusta'} {item.likes ? `· ${item.likes + (liked ? 1 : 0)}` : ''}
        </button>
      </div>
    </div>
  );
}

function generateDescription(item) {
  const t = item.title?.toLowerCase() || '';

  if (t.includes('castillo') || t.includes('visita guiada')) {
    return `🏰 La Torre del Caracol es el símbolo histórico más emblemático de Benavente. Construida en el siglo XV por la familia Pimentel, condes de Benavente, esta imponente torre de planta circular es uno de los ejemplos más destacados de la arquitectura militar castellana del tardogótico.\n\nDurante la visita guiada, un guía especializado en historia medieval te acompañará a través de sus diferentes plantas, narrando en primera persona los episodios más fascinantes: desde las intrigas de la corte de los Pimentel hasta el papel de Benavente en la historia de España como lugar de paso y encuentro de reyes.\n\nEn el recorrido descubrirás:\n\n• La sala noble donde se celebraban los grandes banquetes\n• Las troneras y almenas desde las que se defendía la ciudad\n• Las vistas panorámicas del río Esla y las Vegas del Órbigo\n• La exposición permanente sobre la historia de la fortaleza\n\nLa visita tiene una duración aproximada de 90 minutos. Se recomienda calzado cómodo. Aforo limitado a 20 personas por grupo. Precio: 5€ adultos, 3€ menores. Reservas en el Ayuntamiento de Benavente.`;
  }

  if (t.includes('toro') || t.includes('fiestas')) {
    return `🐂 Las Fiestas del Toro de Benavente son una de las celebraciones taurinas más antiguas y arraigadas de Castilla y León, declaradas de Interés Turístico Regional. Su origen se remonta al siglo XII, cuando los vecinos de Benavente organizaban corridas de toros en honor al patrón de la ciudad.\n\nEl corazón de las fiestas es el encierro urbano, donde los toros recorren las calles empedradas del casco histórico entre la emoción de miles de espectadores llegados de toda la región. La Plaza Mayor, corazón de la villa, se convierte en el escenario de las corridas vespertinas con los mejores toreros del panorama nacional.\n\nLas fiestas incluyen también:\n\n• Vaquillas diarias para los más atrevidos\n• Recital flamenco y verbenas populares\n• Concurso gastronómico de cocina tradicional zamorana\n• Exposiciones y actividades culturales sobre la historia taurina\n• Feria de artesanía y productos locales en la Plaza del Grano\n\nUna semana entera en la que Benavente late con más fuerza que nunca. ¡Vive la experiencia!`;
  }

  if (t.includes('carrera') || item.category === 'Deportes') {
    return `🏃 Una nueva cita deportiva llega a Benavente. ${item.title} reunirá a participantes de toda la región en una jornada llena de deporte, compañerismo y superación personal. El recorrido atraviesa los parajes más bonitos de la ciudad, ofreciendo una perspectiva única de Benavente en movimiento. Inscripciones abiertas en el Patronato Municipal de Deportes.`;
  }

  if (t.includes('sidecars') || item.category === 'Conciertos') {
    return `🎸 No te pierdas este increíble concierto en Benavente. Una noche mágica de música en vivo que promete emociones a flor de piel. El escenario del Teatro Reina Sofía acogerá una actuación espectacular con todo el equipo de producción en su máxima expresión. Entradas disponibles en taquilla y online. Aforo limitado, ¡hazte ya con la tuya!`;
  }

  if (item.category === 'Familia') {
    return `👨‍👩‍👧 Un plan perfecto para toda la familia. ${item.title} es una actividad pensada para que pequeños y mayores disfruten juntos de un día especial en Benavente. Talleres creativos, juegos y mucha diversión en un entorno seguro y estimulante. Actividad gratuita. Plaza previa inscripción en el Centro Cívico.`;
  }

  if (t.includes('mercado') || item.category === 'Gastronomía') {
    return `🥦 El Mercado de Productores Locales de Benavente es un punto de encuentro semanal entre los agricultores, ganaderos y artesanos de la comarca y los ciudadanos que apuestan por el consumo de proximidad. Más de 30 puestos con verduras de temporada, quesos artesanos, embutidos ibéricos, miel de La Cepeda y productos ecológicos certificados. Cada sábado en la Plaza Mayor de 9:00 a 14:00 h.`;
  }

  return `${item.title} es una nueva propuesta para los ciudadanos de Benavente. Una iniciativa que busca mejorar la calidad de vida y el dinamismo de nuestra ciudad. ¡No te lo pierdas!`;
}