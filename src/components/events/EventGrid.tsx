import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Activity, Target, Zap, Flag } from "lucide-react";

const events = [
  {
    title: "Thabal Chongba",
    description: "The grand finale community dance under the moonlight.",
    featured: true,
    icon: <Trophy className="w-6 h-6 text-primary" />,
  },
  {
    title: "Tug of War",
    description: "Ultimate test of strength, grip, and team coordination.",
    featured: false,
    icon: <Activity className="w-5 h-5 text-accent" />,
  },
  {
    title: "Spoon Race",
    description: "Balance, speed, and focus for all age groups.",
    featured: false,
    icon: <Zap className="w-5 h-5 text-primary" />,
  },
  {
    title: "Blind Hit",
    description: "Classic festival game of precision, blindfolded.",
    featured: false,
    icon: <Target className="w-5 h-5 text-accent" />,
  },
  {
    title: "Track Races",
    description: "100m, 200m, and relay sprints for speed demons.",
    featured: false,
    icon: <Flag className="w-5 h-5 text-primary" />,
  },
];

export default function EventGrid() {
  return (
    <div className="py-24 relative overflow-hidden">
      
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mb-16 relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="font-heading font-black text-5xl md:text-6xl tracking-tight uppercase text-glow">
          Tournament <span className="text-transparent bg-clip-text bg-gradient-primary">Highlights</span>
        </h2>
        <p className="text-muted-foreground mt-6 text-lg md:text-xl font-medium leading-relaxed">
          Beyond the flagship 7-A Side Football Tournament, the 3rd Meira Chukhattpa Annual Sports Meet features traditional and competitive events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px] relative z-10">
        
        {/* Featured Card */}
        <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-end overflow-hidden relative group glass-card border-white/10 hover:border-primary/50 transition-colors duration-500">
          <div className="absolute inset-0 bg-background/40 z-10 group-hover:bg-background/20 transition-colors duration-500" />
          <img 
            src="/illustrations/events_chibi.png" 
            alt="Featured Event" 
            className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
          
          <div className="relative z-20 p-8 mt-auto translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary shadow-glow-primary border-0 font-bold tracking-wider uppercase">
              Main Event
            </Badge>
            <h3 className="font-heading font-black text-4xl sm:text-5xl text-white uppercase tracking-tight mb-3 text-glow">
              {events[0].title}
            </h3>
            <p className="text-white/80 font-medium max-w-md text-lg leading-relaxed">
              {events[0].description}
            </p>
          </div>
        </Card>

        {/* Standard Cards */}
        {events.slice(1).map((event, index) => (
          <Card
            key={event.title}
            className={`flex flex-col relative overflow-hidden transition-all duration-300 glass hover:-translate-y-1 hover:shadow-glow-primary hover:border-primary/50 group ${
              index === 0 ? "md:col-span-2" : "col-span-1 md:col-span-2 lg:col-span-1"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="flex-1 p-6 z-10">
              <div className="flex justify-between items-start w-full mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  {event.icon}
                </div>
                <span className="text-5xl font-black text-white/5 group-hover:text-primary/20 transition-colors duration-300 font-heading">
                  0{index + 2}
                </span>
              </div>
              <div className="mt-auto space-y-2">
                <CardTitle className="font-heading uppercase tracking-tight text-2xl font-bold group-hover:text-glow">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  {event.description}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}

      </div>
    </div>
  );
}
