import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
  const { ref, visible } = useInView(0.05);

  return (
    <section
      ref={ref}
      id={id}
      className={`animate-in-view ${visible ? 'visible' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
