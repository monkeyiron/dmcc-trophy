import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
 const [isOpen, setIsOpen] = useState(false);

 return (
 <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
 <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
 <a href="#home" className="flex items-center space-x-2 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring">
 <Trophy className="h-6 w-6 text-primary" />
 <span className="font-heading font-bold text-xl tracking-tight text-foreground">DMCC Event</span>
 </a>

 {/* Desktop Nav */}
 <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
 <a href="#events" className="transition-colors hover:text-primary text-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring">
 Events
 </a>
 <a href="#support" className="transition-colors hover:text-primary text-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring">
 Support
 </a>
 <Button asChild className="h-10 px-6 hidden sm:inline-flex">
 <a href="#register">Register</a>
 </Button>
 <ThemeToggle />
 </nav>

 {/* Mobile Actions */}
 <div className="flex md:hidden items-center space-x-2">
 <ThemeToggle />
 <Button
  variant="ghost"
  size="icon"
  aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
  aria-expanded={isOpen}
  aria-controls="mobile-nav"
  onClick={() => setIsOpen(!isOpen)}
 >
 {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
 </Button>
 </div>
 </div>

 {/* Mobile Nav */}
 {isOpen && (
 <div id="mobile-nav" className="md:hidden border-b bg-background px-4 py-6 flex flex-col space-y-6 animate-in slide-in-from-top-2 absolute w-full top-16 left-0 shadow-md">
 <a href="#events" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">Events</a>
 <a href="#support" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">Support</a>
 <Button asChild className="w-full h-12">
 <a href="#register" onClick={() => setIsOpen(false)}>Register Team</a>
 </Button>
 </div>
 )}
 </header>
 );
}
