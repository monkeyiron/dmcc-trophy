import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Calendar, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section id="home" className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-background pt-20 pb-12">
        
        {/* Modern Ambient Background - Subtle Mesh Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] h-[40rem] w-[40rem] rounded-full bg-accent/10 blur-[150px]" />
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 mt-8 lg:mt-0">
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-2xl">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Trophy className="mr-2 h-4 w-4 fill-primary text-primary" />
              DMCC Prestige Tournament
            </div>

            {/* Main Headline */}
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              <h1 className="font-heading text-6xl font-black uppercase tracking-tight text-foreground md:text-7xl lg:text-8xl leading-none">
                <span className="text-glow">Meira</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-primary">Chukhattpa</span>
              </h1>
              <p className="text-xl md:text-2xl font-bold text-accent tracking-wide uppercase mt-4 text-glow-accent">
                3rd Annual Sports Meet
              </p>
            </div>

            {/* Body Copy */}
            <p className="text-lg font-medium leading-relaxed text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 max-w-xl">
              7-A Side Football excellence, cultural tradition, and community spirit forged in the heart of DMCC.
            </p>
            
            {/* Event Info */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm font-semibold text-foreground/80 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-600">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>March 2026 - May 2026</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span>DMCC Grounds</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
              <Button asChild size="lg" className="h-14 px-8 text-base font-black uppercase tracking-[0.1em] rounded-full group bg-gradient-primary border-0 shadow-glow-primary text-white hover:scale-105 transition-all">
                <a href="#register">
                  Register Squad
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-black uppercase tracking-[0.1em] rounded-full border-border/50 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors text-foreground">
                <a href="#events">View Events</a>
              </Button>
            </div>

          </div>
          
          {/* Main Hero Illustration */}
          <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl animate-in zoom-in fade-in duration-1000 delay-300">
            {/* Glowing backdrop for the illustration */}
            <div className="absolute inset-0 bg-gradient-accent rounded-full opacity-20 blur-[80px]"></div>
            <img 
              src="/illustrations/hero.png" 
              alt="Kids playing football and sports" 
              className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-500 ease-in-out"
            />
          </div>
          
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Scroll</span>
          <div className="h-12 w-[2px] bg-gradient-to-b from-primary to-transparent rounded-full" />
        </div>
      </section>
    </div>
  );
}
