import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <a href="#home" className="flex items-center space-x-2 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring rounded-md group">
          <Trophy className="h-6 w-6 text-primary group-hover:animate-pulse" />
          <span className="font-heading font-black text-xl tracking-tight uppercase text-foreground">DMCC Trophy</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#events" className="transition-colors hover:text-primary text-foreground/80 tracking-wide uppercase focus:outline-none focus:ring-2 focus:ring-ring rounded-sm relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
            Events
          </a>
          <a href="#support" className="transition-colors hover:text-primary text-foreground/80 tracking-wide uppercase focus:outline-none focus:ring-2 focus:ring-ring rounded-sm relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
            Support
          </a>
          <Button asChild className="h-10 px-6 uppercase tracking-widest bg-gradient-primary hover:opacity-90 transition-opacity border-0 shadow-glow-primary text-white">
            <a href="#register">Register</a>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur-xl px-4 py-6 flex flex-col space-y-6 animate-in slide-in-from-top-2 absolute w-full top-16 left-0 shadow-elevated">
          <a href="#events" onClick={() => setIsOpen(false)} className="text-lg font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors">Events</a>
          <a href="#support" onClick={() => setIsOpen(false)} className="text-lg font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors">Support</a>
          <Button asChild className="w-full h-12 uppercase tracking-widest bg-gradient-primary border-0 shadow-glow-primary text-white">
            <a href="#register" onClick={() => setIsOpen(false)}>Register Team</a>
          </Button>
        </div>
      )}
    </header>
  );
}
