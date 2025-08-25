import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: boolean;
  glow?: boolean;
}

export const FloatingCard = ({ 
  children, 
  className, 
  delay = false,
  glow = false 
}: FloatingCardProps) => {
  return (
    <Card className={cn(
      "medical-card",
      delay ? "floating-delayed" : "floating",
      glow && "animate-pulse-glow",
      className
    )}>
      {children}
    </Card>
  );
};