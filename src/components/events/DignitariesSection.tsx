import DignitaryCard from "./DignitaryCard";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4 } }
};

export default function DignitariesSection() {
  return (
    <div className="container mx-auto py-12 md:py-24 px-4 md:px-6 relative overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-8 md:mb-16 text-center flex flex-col items-center relative z-10"
      >
        <div className="inline-flex items-center justify-center p-4 mb-6 bg-muted border">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight text-foreground uppercase">
          Honoured Guests
        </h2>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg font-medium leading-relaxed">
          We are privileged to host distinguished leaders and community figures.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        {dignitaries.map((dig) => (
          <motion.div variants={itemVariants} key={dig.name} className="h-full">
            <DignitaryCard
              name={dig.name}
              role={dig.role}
              title={dig.title}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
