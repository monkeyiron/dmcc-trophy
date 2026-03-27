import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "../../pages/Home";
import EventGrid from "../events/EventGrid";
import DignitariesSection from "../events/DignitariesSection";
import Register from "../../pages/Register";
import Support from "../../pages/Support";

export default function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 w-full mx-auto pb-24 space-y-32">
        <section id="home"><Home /></section>
        <div className="container mx-auto px-4 md:px-6"><div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" /></div>
        <section id="events" className="container mx-auto px-4 md:px-6"><EventGrid /></section>
        <div className="container mx-auto px-4 md:px-6"><div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" /></div>
        <section id="dignitaries"><DignitariesSection /></section>
        <section id="register"><Register /></section>
        <section id="support"><Support /></section>
      </main>
      <Footer />
    </div>
  );
}
