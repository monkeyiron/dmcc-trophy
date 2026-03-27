import DignitaryCard from "./DignitaryCard";
import { Users } from "lucide-react";

const dignitaries = [
  {
    name: "Smt. KH. TOMBI DEVI",
    role: "Chief Guest",
    title: "Arjuna awardee olympian Judoka, Assistant commandant CRPF",
  },
  {
    name: "Prof. Dr. NONGMAITHEM MANICHANDRA",
    role: "President",
    title: "Aryabhatta College, Delhi University",
  },
  {
    name: "Dr. Naorem Bobo",
    role: "Guest of Honour",
    title: "CMO, Maharaja Agrasen Hospital, Dwarka, New Delhi",
  },
  {
    name: "Dr. Seram Rojeshkumar",
    role: "Guest of Honour",
    title: "Covenor, DMCC",
  },
  {
    name: "Hijam Rajen",
    role: "Guest of Honour",
    title: "Socio-Political Commentator, Adv. DMCC",
  },
  {
    name: "Hijam Tilotama",
    role: "Guest of Honour",
    title: "Secretary, Manipur Nurse Association Delhi, Women's Wing DMCC",
  },
];

export default function DignitariesSection() {
  return (
    <div className="container mx-auto py-24 px-4 md:px-6 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-16 text-center flex flex-col items-center relative z-10">
        <div className="inline-flex items-center justify-center p-4 mb-6 rounded-2xl bg-white/5 border border-white/10 shadow-glow-primary rotate-3">
          <Users className="w-8 h-8 text-primary -rotate-3" />
        </div>
        <h2 className="font-heading font-black text-4xl md:text-5xl tracking-tight text-foreground uppercase text-glow">
          Honoured Guests
        </h2>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg font-medium leading-relaxed">
          We are privileged to host distinguished leaders and community figures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {dignitaries.map((dig) => (
          <DignitaryCard
            key={dig.name}
            name={dig.name}
            role={dig.role}
            title={dig.title}
          />
        ))}
      </div>
    </div>
  );
}
