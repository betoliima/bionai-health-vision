import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/utils';

interface ScrollSpyNavProps {
  sections: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  className?: string;
}

export const ScrollSpyNav = ({ sections, className }: ScrollSpyNavProps) => {
  const activeSection = useScrollSpy({ 
    sectionIds: sections.map(s => s.id),
    offset: 120 
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={cn(
      "fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3",
      className
    )}>
      {sections.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={cn(
            "group relative flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300",
            "backdrop-blur-md border",
            activeSection === id 
              ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-glow)]" 
              : "bg-card/80 text-muted-foreground border-border hover:bg-primary/10 hover:text-primary"
          )}
          title={label}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className={cn(
              "text-sm font-medium whitespace-nowrap transition-all duration-300",
              activeSection === id ? "opacity-100" : "opacity-0 w-0 overflow-hidden group-hover:opacity-100 group-hover:w-auto"
            )}>
              {label}
            </span>
          </div>
          
          {activeSection === id && (
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </nav>
  );
};