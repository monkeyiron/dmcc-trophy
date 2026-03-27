import { useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Activity, Target, Zap, Flag } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const events = [
  {
    title: "Football Open",
    description: "Meetei clubs & guests competing for the ultimate trophy.",
    featured: true,
    icon: <Trophy className="w-6 h-6 text-primary" />,
  },
  {
    title: "Sprint Races",
    description: "100m & 200m pure speed dashes to test elite agility.",
    featured: false,
    icon: <Flag className="w-5 h-5 text-muted-foreground" />,
  },
  {
    title: "Spoon Race",
    description: "Balance & speed combined in a classic tradition.",
    featured: false,
    icon: <Zap className="w-5 h-5 text-muted-foreground" />,
  },
  {
    title: "Blind Hit",
    description: "(Chaphu Thugaibi) — Fun game testing precision blindfolded.",
    featured: false,
    icon: <Target className="w-5 h-5 text-muted-foreground" />,
  },
  {
    title: "In & Out",
    description: "Classic challenge testing reaction time and focus.",
    featured: false,
    icon: <Activity className="w-5 h-5 text-muted-foreground" />,
  },
  {
    title: "Tug of War",
    description: "The ultimate test of raw strength and community grip.",
    featured: false,
    icon: <Target className="w-5 h-5 text-muted-foreground" />,
  },
  {
    title: "Thabal Chongba",
    description: "The grand finale community dance under the moonlight.",
    featured: false,
    icon: <Activity className="w-5 h-5 text-muted-foreground" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.3 } }
};

export default function EventGrid() {
  const magneticRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = magneticRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Rotate up to 10 degrees based on mouse position
      xTo(x * 20); 
      yTo(-y * 20);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: magneticRef });

  return (
    <div className="py-12 md:py-24 relative overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-8 md:mb-16 relative z-10 text-center max-w-3xl mx-auto"
      >
        <h2 className="font-heading font-black text-4xl md:text-5xl tracking-tight text-foreground">
          Tournament <span className="text-primary">Highlights</span>
        </h2>
        <p className="text-muted-foreground mt-6 text-lg md:text-xl leading-relaxed">
          Beyond the flagship 7-A Side Football Tournament, the 3rd Meira Chukhattpa Annual Sports Meet features traditional and competitive events.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[250px] relative z-10 perspective-[1000px]"
      >
        
        {/* Featured Card */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 relative transform-gpu">
          <Card 
            ref={magneticRef}
            className="w-full h-full flex flex-col justify-end overflow-hidden relative group transition-colors hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transform-gpu preserve-3d"
          >
            <img 
              src="/illustrations/tournament-highlights.png" 
              alt="Featured Event" 
              className="absolute inset-0 w-full h-full object-cover translate-y-8 scale-[1.05] opacity-90 transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
            
            <div className="relative z-20 p-8 mt-auto translate-y-2 group-hover:translate-y-0 transition-transform duration-500 transform-gpu translate-z-[50px]">
              <Badge className="mb-4">
                Main Event
              </Badge>
              <h3 className="font-heading font-bold text-3xl sm:text-4xl text-foreground tracking-tight mb-3">
                {events[0].title}
              </h3>
              <p className="text-muted-foreground max-w-md text-base leading-relaxed">
                {events[0].description}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Standard Cards */}
        {events.slice(1).map((event, index) => (
          <motion.div 
            key={event.title}
            variants={itemVariants}
            className={index === 0 ? "md:col-span-2 h-full" : "col-span-1 md:col-span-2 lg:col-span-1 h-full"}
          >
            <Card className="h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 group">
              <CardHeader className="flex-1 p-6 z-10">
                <div className="flex justify-between items-start w-full mb-6">
                  <div className="p-3 bg-muted shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                    {event.icon}
                  </div>
                  <span className="text-5xl font-black text-muted/50 group-hover:text-muted transition-colors duration-300 font-heading">
                    0{index + 2}
                  </span>
                </div>
                <div className="mt-auto space-y-2">
                  <CardTitle className="font-heading tracking-tight text-xl font-bold group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {event.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}

      </motion.div>
    </div>
  );
}
