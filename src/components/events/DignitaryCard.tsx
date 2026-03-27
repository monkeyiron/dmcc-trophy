import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface DignitaryProps {
  name: string;
  role: string;
  title?: string;
}

export default function DignitaryCard({ name, role, title }: DignitaryProps) {
  return (
    <Card className="flex flex-col relative overflow-hidden transition-all duration-300 glass hover:-translate-y-1 hover:shadow-glow-primary hover:border-primary/50 group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <Badge className="uppercase tracking-widest text-[10px] font-extrabold bg-primary/20 text-primary hover:bg-primary/30 border-0 px-3 py-1">
            {role}
          </Badge>
          <Star className="w-5 h-5 text-white/5 shadow-sm group-hover:text-primary transition-colors duration-300 group-hover:animate-pulse" />
        </div>
        <CardTitle className="font-heading uppercase tracking-tight text-xl leading-snug group-hover:text-glow text-foreground mt-auto">
          {name}
        </CardTitle>
        {title && (
          <CardDescription className="text-sm font-medium mt-3 text-muted-foreground group-hover:text-foreground/80 transition-colors leading-relaxed">
            {title}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
