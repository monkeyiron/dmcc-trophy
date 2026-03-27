import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import Home from "../../pages/Home";
import EventGrid from "../events/EventGrid";
import DignitariesSection from "../events/DignitariesSection";
import Register from "../../pages/Register";
import Support from "../../pages/Support";
import { Separator } from "@/components/ui/separator";

export default function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased">
      <Navbar />
      <main className="flex-1 w-full mx-auto pb-12 md:pb-24 space-y-12 md:space-y-32">
        <section id="home"><Home /></section>
        <div className="container mx-auto px-4 md:px-6"><Separator /></div>
        <section id="events" className="container mx-auto px-4 md:px-6"><EventGrid /></section>
        <div className="container mx-auto px-4 md:px-6"><Separator /></div>
        <section id="dignitaries"><DignitariesSection /></section>
        <div className="container mx-auto px-4 md:px-6"><Separator /></div>
        <section id="register"><Register /></section>
        <div className="container mx-auto px-4 md:px-6"><Separator /></div>
        <section id="support"><Support /></section>
      </main>
      <Footer />
    </div>
  );
}
