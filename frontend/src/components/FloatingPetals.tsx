import { useMemo } from 'react';

const FloatingPetals = () => {
  const petals = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 14,
      duration: 10 + Math.random() * 14,
      delay: Math.random() * 12,
      reverse: Math.random() > 0.5,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-5%',
            animation: `${p.reverse ? 'petal-fall-reverse' : 'petal-fall'} ${p.duration}s ${p.delay}s infinite linear`,
          }}
        >
          {p.id % 3 === 0 ? (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="hsl(var(--rose))" opacity="0.45">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ) : (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="hsl(var(--rose-light))" opacity="0.5">
              <ellipse cx="12" cy="10" rx="5" ry="8" transform={`rotate(${p.id * 25} 12 12)`} />
            </svg>
          )}
        </div>
      ))}

      {/* Sparkle particles */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            width: 3,
            height: 3,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            background: 'hsl(var(--rose-glow))',
            animation: `sparkle-float ${3 + Math.random() * 4}s ${Math.random() * 5}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
