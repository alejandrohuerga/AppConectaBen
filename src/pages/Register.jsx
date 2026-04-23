import { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = () => {
    base44.auth.redirectToLogin('/preferencias');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://media.base44.com/images/public/user_69ea08668f1e33b76e29c6c1/373803ae3_WhatsAppImage2026-04-21at213936.jpeg"
            alt="ConectaBen"
            className="w-20 h-20 rounded-full object-cover shadow-md mb-3"
          />
          <h1 className="text-2xl font-bold text-foreground tracking-tight">ConectaBen</h1>
          <p className="text-foreground font-semibold mt-3 text-lg">Crea tu cuenta</p>
          <p className="text-muted-foreground text-sm mt-1">Únete a ConectaBen y empieza a conectar.</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Nombre completo" className="pl-11 h-14 rounded-2xl border-border bg-card text-base shadow-sm" />
          </div>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input type="email" placeholder="Email" className="pl-11 h-14 rounded-2xl border-border bg-card text-base shadow-sm" />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              className="pl-11 pr-12 h-14 rounded-2xl border-border bg-card text-base shadow-sm"
            />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repetir contraseña"
              className="pl-11 pr-12 h-14 rounded-2xl border-border bg-card text-base shadow-sm"
            />
            <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            onClick={handleRegister}
            className="w-full h-14 rounded-2xl text-base font-bold bg-foreground hover:bg-foreground/90 text-background shadow-md mt-2"
          >
            Crear cuenta
          </Button>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-foreground font-bold">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}