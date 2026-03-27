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
 <Card className="flex flex-col relative overflow-hidden transition-all duration-300 hover:border-primary/50 group h-full">
 <CardHeader className="relative z-10 flex flex-col h-full">
 <div className="flex justify-between items-start mb-6">
 <Badge variant="secondary" className="uppercase tracking-widest text-[10px] font-bold">
 {role}
 </Badge>
 <Star className="w-5 h-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
 </div>
 <CardTitle className="font-heading uppercase tracking-tight text-xl leading-snug text-foreground mt-auto">
 {name}
 </CardTitle>
 {title && (
 <CardDescription className="text-sm mt-3 text-muted-foreground transition-colors leading-relaxed">
 {title}
 </CardDescription>
 )}
 </CardHeader>
 </Card>
 );
}
