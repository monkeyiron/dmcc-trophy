import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Support() {
  return (
    <div className="container mx-auto py-24 px-4 md:px-6 relative">
      <Separator className="mb-24 border-white/10" />
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Card className="glass-card overflow-hidden border-white/10 shadow-elevated mb-12 group">
          <div className="w-full h-80 md:h-[400px] relative overflow-hidden bg-background/50">
            <img
              src="/illustrations/support.png"
              alt="Support the Event"
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
              <div className="inline-flex items-center justify-center p-4 rounded-xl bg-accent/20 border border-accent/30 mb-6 text-accent shadow-glow-accent backdrop-blur-md">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h2 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] text-glow line-clamp-2">
                Support <br /><span className="text-transparent bg-clip-text bg-gradient-accent">The Event</span>
              </h2>
            </div>
          </div>
        </Card>

        {/* Content Section */}
        <div className="space-y-6 text-lg md:text-xl text-muted-foreground/90 font-medium leading-relaxed max-w-3xl px-2">
          <p>
            The 3rd Meira Chukhattpa Annual Sports Meet is a monumental effort brought to life by the DMCC community. It requires significant resources to host the 7-A Side Football Tournament and traditional events while ensuring a premium experience for all athletes and spectators.
          </p>
          <p>
            We welcome contributions and sponsorships from community members, local businesses, and well-wishers. Your support directly fuels the passion, energy, and success of this incredible celebration of sportsmanship.
          </p>
        </div>

        <Separator className="my-14 border-white/10" />

        <div className="px-2">
          <h3 className="font-heading font-bold text-3xl text-foreground uppercase tracking-tight mb-4 flex items-center">
            How to Contribute
            <div className="ml-4 h-1 w-12 bg-primary rounded-full shadow-glow-primary"></div>
          </h3>
          <p className="mb-10 text-muted-foreground/80 text-lg font-medium max-w-2xl">
            For sponsorships, partnerships, and donations, please contact the organizing committee directly or visit the DMCC office during working hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Button size="lg" className="h-14 px-10 text-sm uppercase tracking-[0.15em] font-black rounded-full bg-gradient-primary border-0 shadow-glow-primary text-white hover:scale-105 transition-all group">
              Contact Organizers
              <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-sm uppercase tracking-[0.1em] font-bold rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-foreground transition-all">
              Download Pitch Deck
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
