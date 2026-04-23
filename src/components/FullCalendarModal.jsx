import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

const EVENTS_DATES = ['2025-05-24', '2025-05-25', '2025-05-31', '2025-06-01', '2025-06-07', '2025-06-14', '2025-06-21'];

export default function FullCalendarModal({ onClose }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4, 1)); // Mayo 2025

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let day = startDate;
  while (day <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(day));
      day = addDays(day, 1);
    }
    rows.push(week);
  }

  const hasEvent = (d) => EVENTS_DATES.includes(format(d, 'yyyy-MM-dd'));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-card w-full max-w-md rounded-t-3xl p-5 pb-10 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Calendario 2025</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-muted">
            <ChevronLeft size={18} />
          </button>
          <span className="font-bold text-foreground capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </span>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-muted">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
            <div key={d} className="text-center text-[11px] font-bold text-muted-foreground py-1">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        {rows.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7">
            {week.map((d, di) => {
              const inMonth = isSameMonth(d, currentMonth);
              const today = isToday(d);
              const event = hasEvent(d);
              return (
                <div key={di} className="flex flex-col items-center py-1">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all
                    ${today ? 'bg-primary text-primary-foreground font-bold' : ''}
                    ${!today && inMonth ? 'text-foreground' : ''}
                    ${!inMonth ? 'text-muted-foreground/30' : ''}
                  `}>
                    {format(d, 'd')}
                  </div>
                  {event && inMonth && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Día con evento programado</span>
        </div>

        {/* Quick month jumps */}
        <div className="mt-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Ir al mes</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 12 }, (_, i) => {
              const m = new Date(2025, i, 1);
              return (
                <button
                  key={i}
                  onClick={() => setCurrentMonth(m)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    isSameMonth(m, currentMonth) ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground'
                  }`}
                >
                  {format(m, 'MMM', { locale: es })}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}