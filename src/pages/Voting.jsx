import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Send } from 'lucide-react';
import ConectaBenLogo from '@/components/ConectaBenLogo';
import { toast } from 'sonner';

const MOCK_POLL = {
  id: 'poll1',
  question: '¿Qué tienda o servicio quieres que venga a Benavente?',
  description: 'Tu voto ayuda a decidir el futuro de nuestra ciudad.',
  options: [
    { id: 'zara', label: 'Zara', votes: 324, emoji: '👗' },
    { id: 'cine4d', label: 'Cine 4D', votes: 178, emoji: '🎬' },
    { id: 'starbucks', label: 'Starbucks', votes: 142, emoji: '☕' },
    { id: 'bolera', label: 'Bolera', votes: 76, emoji: '🎳' },
  ]
};

export default function Voting() {
  const [poll, setPoll] = useState(MOCK_POLL);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
    base44.entities.Poll.list().then(polls => {
      if (polls.length > 0) setPoll(polls[0]);
    }).catch(() => {});
    loadComments();
  }, []);

  const loadComments = () => {
    base44.entities.Comment.list().then(setComments).catch(() => {});
  };

  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  const handleVote = async () => {
    if (!selectedOption) return;
    setHasVoted(true);
    const updated = {
      ...poll,
      options: poll.options.map(o => o.id === selectedOption ? { ...o, votes: o.votes + 1 } : o)
    };
    setPoll(updated);
    toast.success('¡Gracias por tu voto!');

    if (user) {
      base44.entities.Vote.create({ poll_id: poll.id, option_id: selectedOption, user_email: user.email }).catch(() => {});
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    const newComment = { poll_id: poll.id, text: comment, user_name: user?.full_name || 'Anónimo', user_email: user?.email || '' };
    await base44.entities.Comment.create(newComment);
    setComments(prev => [{ ...newComment, created_date: new Date().toISOString() }, ...prev]);
    setComment('');
    toast.success('Comentario enviado');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <ConectaBenLogo size={32} textSize="text-lg" />
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* Title */}
        <div>
          <div className="flex items-start gap-2">
            <h1 className="text-3xl font-black text-foreground leading-tight flex-1">✨ Tu Opinión Cuenta</h1>
            <span className="text-2xl mt-1">💬</span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">Juntos hacemos de Benavente un lugar mejor.</p>
        </div>

        {/* Poll card */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground text-lg">📊</span>
            </div>
            <div>
              <h2 className="font-bold text-foreground text-base leading-snug">{poll.question}</h2>
              <p className="text-muted-foreground text-xs mt-0.5">{poll.description}</p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {poll.options.map(option => {
              const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
              return (
                <div key={option.id}>
                  <button
                    onClick={() => !hasVoted && setSelectedOption(option.id)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                      selectedOption === option.id && !hasVoted
                        ? 'border-primary bg-accent'
                        : 'border-border bg-card hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{option.emoji}</span>
                        <span className="font-semibold text-foreground text-sm">{option.label}</span>
                      </div>
                      {(hasVoted || true) && (
                        <div className="text-right">
                          <span className="font-bold text-sm text-foreground">{pct}%</span>
                          <p className="text-[10px] text-muted-foreground">{option.votes} votos</p>
                        </div>
                      )}
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleVote}
            disabled={!selectedOption || hasVoted}
            className={`w-full mt-4 h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              hasVoted ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90'
            } disabled:opacity-50`}
          >
            🗳️ {hasVoted ? '¡Voto registrado!' : 'Votar'}
          </button>
        </div>

        {/* Comment section */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary text-lg">💬</span>
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Cuéntanos tu opinión</h3>
              <p className="text-muted-foreground text-xs">Deja tu sugerencia o comenta por qué te gustaría que viniera ese servicio a Benavente.</p>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:border-primary"
              onKeyDown={e => e.key === 'Enter' && handleComment()}
            />
            <button
              onClick={handleComment}
              className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center"
            >
              <Send size={16} className="text-primary-foreground" />
            </button>
          </div>

          {comments.length > 0 && (
            <div className="mt-3 space-y-2">
              {comments.slice(0, 5).map((c, i) => (
                <div key={i} className="bg-muted/30 rounded-xl p-3">
                  <p className="text-xs font-semibold text-foreground">{c.user_name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}