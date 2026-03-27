import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Calendar, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Respect user's motion preference
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      // Set all elements to their final visible state immediately
      gsap.set([".hero-badge", ".hero-title", ".hero-desc", ".hero-info", ".hero-buttons", ".hero-image"], {
        opacity: 1, y: 0, scale: 1,
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Choreograph the hero load timeline
    tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.8, delay: 0.2 })
      .from(".hero-title", { y: 40, opacity: 0, duration: 1, stagger: 0.2 }, "-=0.6")
      .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-info", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-image", { scale: 0.98, opacity: 0, duration: 1.5, ease: "power2.out" }, "-=1.0");
  }, { scope: container });

  return (
    <div className="flex flex-col" ref={container}>
      <section id="home" className="relative flex min-h-[70vh] md:min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-background pt-12 pb-8 md:pt-20 md:pb-12">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mt-4 lg:mt-0">
        
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 md:space-y-8 max-w-2xl">
          
            {/* Tagline Badge */}
            <div className="hero-badge inline-flex items-center border bg-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground rounded-none">
              <Trophy className="mr-2 h-4 w-4 text-primary" />
              Delhi Meetei Coordinating Committee
            </div>

            {/* Main Headline */}
            <div className="space-y-2 md:space-y-4">
              <h1 className="hero-title font-heading text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]">
                Meira <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Chukhattpa</span>
              </h1>
              <p className="hero-title text-xl md:text-2xl font-semibold text-muted-foreground tracking-wide uppercase">
                3rd Annual Sports Meet
              </p>
            </div>

            {/* Body Copy */}
            <p className="hero-desc text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
              Empowering our children through sport, celebrating Thabal Chongba, and uniting through 7-A Side Football.
            </p>
            
            {/* Call to Action */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto pt-2">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <a href="#register">
                  Register Squad
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <a href="#events">View Events</a>
              </Button>
            </div>

            {/* Event Dashboard Cards */}
            <div className="hero-info grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg pt-6 md:pt-8 mt-2 border-t border-border/50">
              
              {/* Date Card */}
              <div className="flex flex-col p-4 rounded-none bg-muted/30 border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-background rounded-none shadow-sm border">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">When</span>
                </div>
                <div className="text-sm font-bold text-foreground">29 MARCH 2026</div>
                <div className="text-xs font-medium text-muted-foreground mt-0.5">8:30 AM (SUNDAY)</div>
              </div>

              {/* Location Card */}
              <a 
                href="https://maps.app.goo.gl/6Su6sR1ntmqavd8g6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col p-4 rounded-none bg-background border border-primary/20 shadow-md shadow-primary/5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-primary/10 text-primary p-1.5 rounded-none opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <ArrowRight className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-primary/10 rounded-none">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-primary">Where</span>
                </div>
                <div className="text-sm font-bold text-foreground">Bhaskaracharya College</div>
                <div className="text-xs font-medium text-muted-foreground mt-0.5">Sector 2, Dwarka <span className="inline-block ml-1 opacity-70 group-hover:opacity-100 transition-opacity">— View Map</span></div>
              </a>
            </div>

          </div>
          
          {/* Main Hero Illustration */}
          <div className="hero-image relative w-full max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl z-10">
            <div className="absolute inset-0 bg-background/20 z-10" />
            <motion.img 
              animate={{ y: [0, -15, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src="/illustrations/hero-section.png" 
              alt="Football Match Action" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-none shadow-2xl shadow-primary/10 border"
            />
          </div>
          
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-50 hidden md:flex flex-col items-center gap-2">
          <motion.span 
            animate={{ opacity: [0.3, 1, 0.3] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground"
          >
            Scroll
          </motion.span>
          <div className="h-8 w-px bg-muted-foreground" />
        </div>
      </section>
    </div>
  );
}
