'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

const stats: Stat[] = [
  { label: 'Projects Completed', value: 25, suffix: '+' },
  { label: 'Communities Served', value: 150, suffix: '+' },
  { label: 'Lives Impacted', value: 5000, suffix: '+' },
  { label: 'Acres Revitalized', value: 500, suffix: '+' },
];

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {Math.floor(count).toLocaleString()}{suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="py-16 bg-neutral-cream">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base text-foreground/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

