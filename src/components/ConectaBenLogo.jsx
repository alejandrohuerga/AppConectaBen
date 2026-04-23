export default function ConectaBenLogo({ size = 40, showText = true, textSize = 'text-xl' }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="https://media.base44.com/images/public/user_69ea08668f1e33b76e29c6c1/373803ae3_WhatsAppImage2026-04-21at213936.jpeg"
        alt="ConectaBen Logo"
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
      {showText && (
        <span className={`font-bold text-foreground ${textSize} tracking-tight`}>ConectaBen</span>
      )}
    </div>
  );
}