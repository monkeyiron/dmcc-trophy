import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

/** Organizer contact — update here if details change */
const CONTACT = {
  name: "Roberson Oinam",
  phone: "+91 97179 21812",
} as const;

export default function Support() {
  const [isOpen, setIsOpen] = useState(false);

 return (
 <div className="container mx-auto py-12 md:py-24 px-4 md:px-6 relative">
 <div className="max-w-4xl mx-auto relative z-10">
 <Card className="overflow-hidden mb-8 md:mb-12 group">
 <div className="w-full h-52 md:h-[400px] relative overflow-hidden bg-muted">
 <img
 src="/illustrations/support-the-event.png"
 alt="Support the Event"
 className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
 />
 {/* Gradient overlays for depth */}
 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
 <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

 <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
 <div className="inline-flex items-center justify-center p-4 bg-muted border mb-6 text-primary backdrop-blur-md">
 <HeartHandshake className="w-8 h-8" />
 </div>
 <h2 className="font-heading font-extrabold text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] text-foreground line-clamp-2">
 Support <br /><span className="text-primary">The Event</span>
 </h2>
 </div>
 </div>
 </Card>

 {/* Content Section */}
 <div className="space-y-6 text-lg md:text-xl text-muted-foreground/90 font-medium leading-relaxed max-w-3xl px-2">
 <p>
 The 3rd Meira Chukhattpa Annual Sports Meet is a monumental effort brought to life by the Delhi Meetei Coordinating Committee (DMCC). It requires significant resources to host the 7-A Side Football Tournament and traditional events while ensuring a premium experience for all athletes and spectators.
 </p>
 <p>
 We welcome contributions and sponsorships from community members, local businesses, and well-wishers. Your support directly fuels the passion, energy, and success of this incredible celebration of sportsmanship.
 </p>
 </div>

 <Separator className="my-8 md:my-14" />

 <div className="px-2">
 <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-between">
 <div className="flex-1 space-y-6">
 <h3 className="font-heading font-black text-3xl md:text-5xl text-foreground uppercase tracking-tight leading-[1.1]">
 Your Contribution <br className="hidden md:block"/><span className="text-primary">Empowers Our Youth.</span>
 </h3>
 <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
 For sponsorships, partnerships, and donations, please contact the organizing committee directly or scan the QR code to contribute instantly. Every contribution directly fuels the passion, energy, and success of this incredible celebration of sportsmanship.
 </p>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="h-12 px-10 text-sm font-bold uppercase tracking-wider group mt-4 rounded-none">
                Contact Organizer
                <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0 gap-0 border-border shadow-2xl shadow-primary/10 rounded-none bg-background overflow-hidden">
              <DialogHeader>
                 <DialogTitle className="sr-only">Contact Details</DialogTitle>
              </DialogHeader>
              <div className="bg-muted p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-black text-4xl uppercase tracking-tighter leading-[0.9] mb-4">
                    Direct <br/><span className="text-primary">Line</span>
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-wider leading-relaxed border-b border-border pb-6">
                    Reach out for sponsorships, logistics, or premium VIP access.
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Official Contact</span>
                    <span className="font-bold text-foreground tracking-tight text-xl">{CONTACT.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Direct Network</span>
                    <span className="font-heading font-black text-3xl md:text-4xl tracking-widest text-foreground truncate">{CONTACT.phone}</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
 </div>

 <div className="flex-none w-full md:w-[320px] bg-muted p-8 border flex flex-col items-center text-center">
 <h4 className="font-heading font-black text-2xl uppercase mb-2">Support the Event</h4>
 <p className="text-sm font-medium text-muted-foreground mb-6">Scan to donate instantly via UPI</p>
 <div className="w-full aspect-square bg-white p-3 border-2 border-primary/20 mb-6 shadow-sm">
 <img src="/illustrations/qr-code.jpeg" alt="UPI QR Code — radheoinam@oksbi" className="w-full h-full object-contain" />
 </div>
 <Badge variant="outline" className="font-mono font-bold tracking-widest text-sm py-1.5 px-4 bg-background select-all">
 radheoinam@oksbi
 </Badge>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
