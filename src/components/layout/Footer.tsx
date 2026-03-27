import { HeartHandshake } from "lucide-react";

export default function Footer() {
 return (
 <footer className="border-t bg-muted mt-24">
 <div className="container mx-auto py-12 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
 <div className="flex flex-col items-center md:items-start space-y-4">
 <div className="flex items-center space-x-2">
 <img src="/illustrations/dmcc-logo.png" alt="DMCC Logo" className="h-20 w-auto" />
 <span className="font-heading font-bold text-xl tracking-tight text-foreground">DMCC Event</span>
 </div>
 <p className="text-sm text-muted-foreground max-w-xs">
 The 3rd Meira Chukhattpa Annual Sports Meet. A celebration of sport, grit, and enduring community spirit by the Delhi Meetei Coordinating Committee (DMCC).
 </p>
 </div>

 <div className="flex flex-col items-center md:items-start space-y-4">
 <h4 className="font-heading font-semibold text-sm text-foreground">Quick Links</h4>
 <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
 <a href="#events" className="hover:text-primary transition-colors">Tournament Highlights</a>
 <a href="#dignitaries" className="hover:text-primary transition-colors">Honoured Guests</a>
 <a href="#register" className="hover:text-primary transition-colors">Team Registration</a>
 </nav>
 </div>

 <div className="flex flex-col items-center md:items-start space-y-4">
 <h4 className="font-heading font-semibold text-sm text-foreground">Community</h4>
 <a href="#support" className="inline-flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
 <HeartHandshake className="w-4 h-4" />
 <span>Support the Event</span>
 </a>
 </div>
 </div>
 
  <div className="py-6 border-t text-center text-xs text-muted-foreground">
  <p className="text-[10px] md:text-xs">
  Brewed with coffee &amp; creativity &mdash; Meetei Club South X Team I &copy; DMCC 2026
  </p>
  </div>
 </footer>
 );
}
