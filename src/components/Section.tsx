import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "cta";
}

const Section = ({ id, title, children, className = "", variant = "default" }: SectionProps) => {
  if (variant === "cta") {
    return (
      <section id={id} className={`py-20 px-6 ${className}`}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            {title}
          </h2>
          <Card className="bg-gradient-cta border-none shadow-glow">
            <CardContent className="p-8 text-white">
              {children}
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`py-20 px-6 bg-gradient-section ${className}`}>
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          {title}
        </h2>
        <div className="text-lg leading-relaxed text-foreground/80">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;