import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell, Clock, BookmarkCheck, Bookmark } from 'lucide-react';
import ConectaBenLogo from '@/components/ConectaBenLogo';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CATEGORIES = ['Todos', 'Marketing Digital', 'Idiomas', 'Emprendimiento'];
const CAT_COLORS = { 'Marketing Digital': 'bg-blue-100 text-blue-700', 'Idiomas': 'bg-purple-100 text-purple-700', 'Emprendimiento': 'bg-green-100 text-green-700', 'Tecnología': 'bg-orange-100 text-orange-700' };

const MOCK_COURSES = [
  { id: '1', title: 'Introducción al Marketing Digital', category: 'Marketing Digital', description: 'Aprende los fundamentos del marketing digital y cómo aplicarlos desde cero.', duration_hours: 10, level: 'Principiante', image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
  { id: '2', title: 'Inglés para el día a día', category: 'Idiomas', description: 'Mejora tu inglés con situaciones reales y prácticas cotidianas.', duration_hours: 20, level: 'Principiante', image_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80' },
  { id: '3', title: 'Emprende tu idea', category: 'Emprendimiento', description: 'Convierte tu idea en un proyecto real con herramientas prácticas.', duration_hours: 15, level: 'Intermedio', image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&q=80' },
  { id: '4', title: 'Redes Sociales para Negocios', category: 'Marketing Digital', description: 'Aprende a gestionar y hacer crecer tu negocio en redes sociales.', duration_hours: 12, level: 'Principiante', image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80' },
  { id: '5', title: 'Inglés Intermedio B1', category: 'Idiomas', description: 'Lleva tu inglés al siguiente nivel con conversaciones y comprensión.', duration_hours: 30, level: 'Intermedio', image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
];

export default function Education() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [enrolled, setEnrolled] = useState({});
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    base44.entities.Course.list().then(data => {
      if (data.length > 0) setCourses([...MOCK_COURSES, ...data]);
    }).catch(() => {});
  }, []);

  const filtered = activeCategory === 'Todos' ? courses : courses.filter(c => c.category === activeCategory);

  const handleEnroll = async (course) => {
    setEnrolled(prev => ({ ...prev, [course.id]: true }));
    toast.success(`¡Inscrito en "${course.title}"!`);
  };

  const toggleFavorite = async (course) => {
    const key = course.id;
    if (favorites[key]) {
      setFavorites(prev => { const n = { ...prev }; delete n[key]; return n; });
    } else {
      setFavorites(prev => ({ ...prev, [key]: true }));
      const user = await base44.auth.me().catch(() => null);
      if (user) {
        base44.entities.Favorite.create({ item_id: course.id, item_type: 'course', item_title: course.title, item_image: course.image_url, user_email: user.email }).catch(() => {});
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ConectaBenLogo size={28} showText={false} />
            <div>
              <h1 className="text-xl font-bold text-foreground">Formación</h1>
              <p className="text-xs text-muted-foreground">Aprende, crece y construye tu futuro.</p>
            </div>
          </div>
          <Bell size={22} className="text-foreground" />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              activeCategory === cat ? 'bg-foreground text-background border-foreground' : 'bg-card border-border text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses list */}
      <div className="px-4 pb-4 space-y-3">
        {filtered.map(course => (
          <div key={course.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex gap-3 p-3">
            <img src={course.image_url} alt={course.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CAT_COLORS[course.category] || 'bg-muted text-muted-foreground'}`}>
                {course.category}
              </span>
              <h3 className="font-bold text-foreground text-sm mt-1 leading-snug">{course.title}</h3>
              <p className="text-muted-foreground text-[11px] mt-0.5 line-clamp-2">{course.description}</p>
              <div className="flex items-center gap-3 mt-1.5 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock size={11} />
                  <span className="text-[11px]">{course.duration_hours} horas</span>
                </div>
                <span className="text-[11px]">· {course.level}</span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between flex-shrink-0">
              <button onClick={() => toggleFavorite(course)}>
                {favorites[course.id] ? <BookmarkCheck size={16} className="text-primary" /> : <Bookmark size={16} className="text-muted-foreground" />}
              </button>
              <Button
                size="sm"
                onClick={() => handleEnroll(course)}
                disabled={enrolled[course.id]}
                className={`text-xs px-3 py-1.5 rounded-xl ${enrolled[course.id] ? 'bg-green-500 hover:bg-green-500' : 'bg-primary'}`}
              >
                {enrolled[course.id] ? '✓ Inscrito' : 'Inscribirse'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}