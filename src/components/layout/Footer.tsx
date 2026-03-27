import { Trophy, HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/30 mt-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container mx-auto py-12 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="font-heading font-black text-xl tracking-tight uppercase">DMCC Trophy</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            The 3rd Meira Chukhattpa Annual Sports Meet. A celebration of sport, grit, and enduring community spirit.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground">Quick Links</h4>
          <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <a href="#events" className="hover:text-primary transition-colors">Tournament Highlights</a>
            <a href="#dignitaries" className="hover:text-primary transition-colors">Honoured Guests</a>
            <a href="#register" className="hover:text-primary transition-colors">Team Registration</a>
          </nav>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground">Community</h4>
          <a href="#support" className="inline-flex items-center space-x-2 text-sm font-bold text-accent hover:text-primary transition-colors tracking-wide">
            <HeartHandshake className="w-4 h-4" />
            <span>Support the Event</span>
          </a>
        </div>
      </div>
      
      <div className="py-6 border-t border-border/20 text-center text-xs text-muted-foreground/60 font-medium">
        Built with deep passion by the DMCC Community &copy; 2026
      </div>
    </footer>
  );
}
