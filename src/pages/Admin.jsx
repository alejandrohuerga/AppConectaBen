import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Plus, Trash2, Edit2, Calendar, BookOpen, Building2, BarChart2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const TABS = [
  { id: 'events', label: 'Eventos', icon: Calendar },
  { id: 'courses', label: 'Formación', icon: BookOpen },
  { id: 'businesses', label: 'Comercios', icon: Building2 },
  { id: 'polls', label: 'Votaciones', icon: BarChart2 },
];

function EventForm({ onSave, onClose }) {
  const [data, setData] = useState({ title: '', date: '', time: '', location: '', category: 'Cultura', image_url: '', description: '' });
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-card w-full max-w-md rounded-t-3xl p-5 space-y-3 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">Nuevo Evento</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        {['title', 'date', 'time', 'location', 'image_url', 'description'].map(field => (
          <Input key={field} placeholder={field.replace('_', ' ')} value={data[field]} onChange={e => setData(p => ({ ...p, [field]: e.target.value }))} className="rounded-xl" />
        ))}
        <select value={data.category} onChange={e => setData(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm">
          {['Conciertos', 'Deportes', 'Cultura', 'Familia', 'Gastronomía', 'Otros'].map(c => <option key={c}>{c}</option>)}
        </select>
        <Button onClick={() => onSave(data)} className="w-full rounded-xl">Guardar</Button>
      </div>
    </div>
  );
}

function CourseForm({ onSave, onClose }) {
  const [data, setData] = useState({ title: '', description: '', category: 'Marketing Digital', duration_hours: '', level: 'Principiante', image_url: '', instructor: '' });
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-card w-full max-w-md rounded-t-3xl p-5 space-y-3 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">Nuevo Curso</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        {['title', 'description', 'duration_hours', 'image_url', 'instructor'].map(field => (
          <Input key={field} placeholder={field.replace('_', ' ')} value={data[field]} onChange={e => setData(p => ({ ...p, [field]: e.target.value }))} className="rounded-xl" />
        ))}
        <select value={data.category} onChange={e => setData(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm">
          {['Marketing Digital', 'Idiomas', 'Emprendimiento', 'Tecnología', 'Arte', 'Otros'].map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={data.level} onChange={e => setData(p => ({ ...p, level: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm">
          {['Principiante', 'Intermedio', 'Avanzado'].map(l => <option key={l}>{l}</option>)}
        </select>
        <Button onClick={() => onSave(data)} className="w-full rounded-xl">Guardar</Button>
      </div>
    </div>
  );
}

function BusinessForm({ onSave, onClose }) {
  const [data, setData] = useState({ name: '', description: '', category: 'Ocio', tag: '', image_url: '', address: '', is_coming_soon: false });
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-card w-full max-w-md rounded-t-3xl p-5 space-y-3 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">Nuevo Negocio</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        {['name', 'description', 'tag', 'image_url', 'address'].map(field => (
          <Input key={field} placeholder={field.replace('_', ' ')} value={data[field]} onChange={e => setData(p => ({ ...p, [field]: e.target.value }))} className="rounded-xl" />
        ))}
        <select value={data.category} onChange={e => setData(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm">
          {['Ocio', 'Moda', 'Gastronomía', 'Deporte', 'Tecnología', 'Servicios', 'Otros'].map(c => <option key={c}>{c}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={data.is_coming_soon} onChange={e => setData(p => ({ ...p, is_coming_soon: e.target.checked }))} />
          Próximamente
        </label>
        <Button onClick={() => onSave(data)} className="w-full rounded-xl">Guardar</Button>
      </div>
    </div>
  );
}

function PollForm({ onSave, onClose }) {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([{ id: '1', label: '', votes: 0 }, { id: '2', label: '', votes: 0 }]);
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-card w-full max-w-md rounded-t-3xl p-5 space-y-3 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">Nueva Votación</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <Input placeholder="Pregunta" value={question} onChange={e => setQuestion(e.target.value)} className="rounded-xl" />
        <Input placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} className="rounded-xl" />
        <p className="text-sm font-medium text-foreground">Opciones:</p>
        {options.map((opt, i) => (
          <div key={opt.id} className="flex gap-2">
            <Input placeholder={`Opción ${i + 1}`} value={opt.label} onChange={e => setOptions(prev => prev.map((o, j) => j === i ? { ...o, label: e.target.value } : o))} className="rounded-xl" />
            {options.length > 2 && <button onClick={() => setOptions(prev => prev.filter((_, j) => j !== i))}><X size={16} className="text-destructive" /></button>}
          </div>
        ))}
        <button onClick={() => setOptions(prev => [...prev, { id: String(prev.length + 1), label: '', votes: 0 }])} className="text-primary text-sm font-medium">+ Añadir opción</button>
        <Button onClick={() => onSave({ question, description, options, is_active: true, total_votes: 0 })} className="w-full rounded-xl">Guardar</Button>
      </div>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [polls, setPolls] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      if (u.role !== 'admin') navigate('/');
    }).catch(() => navigate('/'));
    loadAll();
  }, []);

  const loadAll = () => {
    base44.entities.Event.list().then(setEvents).catch(() => {});
    base44.entities.Course.list().then(setCourses).catch(() => {});
    base44.entities.Business.list().then(setBusinesses).catch(() => {});
    base44.entities.Poll.list().then(setPolls).catch(() => {});
  };

  const handleSave = async (data) => {
    if (activeTab === 'events') { await base44.entities.Event.create(data); loadAll(); }
    else if (activeTab === 'courses') { await base44.entities.Course.create(data); loadAll(); }
    else if (activeTab === 'businesses') { await base44.entities.Business.create(data); loadAll(); }
    else if (activeTab === 'polls') { await base44.entities.Poll.create(data); loadAll(); }
    setShowForm(false);
    toast.success('Guardado correctamente');
  };

  const handleDelete = async (id) => {
    if (activeTab === 'events') await base44.entities.Event.delete(id);
    else if (activeTab === 'courses') await base44.entities.Course.delete(id);
    else if (activeTab === 'businesses') await base44.entities.Business.delete(id);
    else if (activeTab === 'polls') await base44.entities.Poll.delete(id);
    loadAll();
    toast.success('Eliminado');
  };

  const currentData = { events, courses, businesses, polls }[activeTab];

  const getItemLabel = (item) => item.title || item.name || item.question || '';

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-40">
        <button onClick={() => navigate('/perfil')}><ArrowLeft size={20} /></button>
        <h1 className="font-bold text-lg text-foreground">Panel de Administración</h1>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto px-4 py-3 gap-2 border-b border-border">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === id ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground">{currentData.length} elementos</h2>
          <Button size="sm" onClick={() => setShowForm(true)} className="rounded-xl flex items-center gap-1.5">
            <Plus size={14} />Añadir
          </Button>
        </div>

        <div className="space-y-2">
          {currentData.map(item => (
            <div key={item.id} className="bg-card border border-border rounded-2xl p-3 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">{getItemLabel(item)}</p>
                <p className="text-xs text-muted-foreground">{item.category || item.level || ''}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {currentData.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-4xl mb-2">📭</p>
              <p className="text-sm">Sin elementos. Añade el primero.</p>
            </div>
          )}
        </div>
      </div>

      {showForm && activeTab === 'events' && <EventForm onSave={handleSave} onClose={() => setShowForm(false)} />}
      {showForm && activeTab === 'courses' && <CourseForm onSave={handleSave} onClose={() => setShowForm(false)} />}
      {showForm && activeTab === 'businesses' && <BusinessForm onSave={handleSave} onClose={() => setShowForm(false)} />}
      {showForm && activeTab === 'polls' && <PollForm onSave={handleSave} onClose={() => setShowForm(false)} />}
    </div>
  );
}