import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

// Polyfill for UUID generation on non-secure HTTP networks (mobile testing)
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const playerSchema = z.object({
  name: z.string().min(2, "Name required"),
  jersey: z.string().min(1, "Jersey required"),
});

const formSchema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters"),
  managerName: z.string().min(2, "Manager name is required"),
  coachName: z.string().min(2, "Coach name is required"),
  captainName: z.string().min(2, "Captain name is required"),
  contactPhone: z.string().min(10, "Valid contact number required"),
  players: z.array(playerSchema).length(7, "Exactly 7 players are required (7-A Side)"),
  substitutes: z.array(playerSchema).max(5, "Maximum 5 substitutes allowed"),
  agreeFee: z.boolean().refine((val) => val === true, "You must agree to the fee"),
  agreeRules: z.boolean().refine((val) => val === true, "You must accept the terms and rules"),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = ["Team Details", "Main Squad (7)", "Substitutes", "Agreement"];

export default function Register() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      managerName: "",
      coachName: "",
      captainName: "",
      contactPhone: "",
      players: Array(7).fill({ name: "", jersey: "" }),
      substitutes: [],
      agreeFee: false,
      agreeRules: false,
    },
    mode: "onTouched",
  });

  const { control, handleSubmit, register, formState: { errors }, trigger } = form;

  const { fields: playerFields } = useFieldArray({
    control,
    name: "players",
  });

  const { fields: subFields, append: appendSub, remove: removeSub } = useFieldArray({
    control,
    name: "substitutes",
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (step === 0) fieldsToValidate = ["teamName", "managerName", "coachName", "captainName", "contactPhone"];
    if (step === 1) fieldsToValidate = ["players"];
    if (step === 2) fieldsToValidate = ["substitutes"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const teamId = generateUUID();

      const { error: teamError } = await supabase
        .from('teams')
        .insert({
          id: teamId,
          team_name: data.teamName,
          manager_name: data.managerName,
          coach_name: data.coachName,
          captain_name: data.captainName,
          contact_phone: data.contactPhone,
          payment_agreed: data.agreeFee,
          rules_accepted: data.agreeRules
        });

      if (teamError) {
        console.error("Team insert error:", teamError);
        throw new Error("Team registration failed. Please try again.");
      }

      const mainPlayers = data.players.map(p => ({
        team_id: teamId,
        player_name: p.name,
        jersey_number: p.jersey,
        is_substitute: false
      }));

      const substitutePlayers = data.substitutes.map(s => ({
        team_id: teamId,
        player_name: s.name,
        jersey_number: s.jersey,
        is_substitute: true
      }));

      const allPlayers = [...mainPlayers, ...substitutePlayers];
      
      if (allPlayers.length > 0) {
        const { error: playersError } = await supabase
          .from('players')
          .insert(allPlayers);
        if (playersError) {
          console.error("Players insert error:", playersError);
          // Rollback: delete the team we just inserted
          const { error: rollbackError } = await supabase.from('teams').delete().eq('id', teamId);
          if (rollbackError) {
            console.error("Rollback failed — orphaned team:", teamId, rollbackError);
          }
          throw new Error("Player registration failed. Please try again.");
        }
      }

      setIsSuccess(true);
    } catch (error: unknown) {
      console.error("Registration failed:", error);
      const msg = error instanceof Error ? error.message : "An unknown error occurred.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    in: {
      x: 0,
      opacity: 1,
    },
    out: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const pageTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  };

  if (isSuccess) {
    return (
      <div className="py-12 md:py-24 max-w-2xl mx-auto text-center px-4 md:px-0 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="p-8 md:p-12 relative z-10">
            <CardHeader>
              <div className="w-full h-48 mb-8 overflow-hidden bg-muted flex items-center justify-center border relative group rounded-none">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                <motion.img 
                  initial={{ scale: 1 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  src="/illustrations/register.png" 
                  alt="Registration Success" 
                  className="w-full h-full object-cover opacity-90 scale-105"
                />
              </div>
              <CardTitle className="font-heading font-extrabold text-4xl md:text-5xl uppercase tracking-tighter text-primary">
                Squad Ready
              </CardTitle>
              <CardDescription className="text-lg font-medium text-foreground/90 mt-4 leading-relaxed">
                Your team has been successfully registered for the 3rd Meira Chukhattpa Annual Sports Meet. Please bring the fee to the venue on the event day.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-8">
              <Button onClick={() => window.location.href = '#home'} size="lg" className="h-14 w-full text-base font-bold uppercase tracking-wider ">
                Return Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24 max-w-4xl mx-auto px-4 md:px-0 relative">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="relative z-10 overflow-hidden shadow-2xl shadow-primary/5">
          <CardHeader className="md:flex-row md:items-start justify-between bg-muted/50 border-b p-5 md:p-10">
            <div>
              <CardTitle className="font-heading font-extrabold text-4xl md:text-5xl uppercase tracking-tight text-foreground">
                Register <span className="text-primary">Team</span>
              </CardTitle>
              <CardDescription className="mt-4 text-base md:text-lg font-medium text-muted-foreground">
                Thajamanbi Trophy 7-A Side Football Tournament
              </CardDescription>
            </div>
            <div className="mt-4 md:mt-0 bg-primary/10 text-primary px-5 py-2 font-bold text-sm tracking-wider uppercase inline-flex items-center border border-primary/20 rounded-none">
              Step {step + 1} <span className="opacity-50 ml-1">/ {STEPS.length}</span>
            </div>
          </CardHeader>

          <CardContent className="p-5 md:p-10 overflow-hidden relative min-h-[500px]">
            <div className="flex mb-10 gap-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1">
                  <div className={`h-2 transition-all duration-500 shadow-sm rounded-none ${i <= step ? "bg-primary" : "bg-muted"}`} />
                  <div className={`mt-3 text-[10px] md:text-xs font-bold uppercase tracking-widest ${i <= step ? "text-primary" : "text-muted-foreground hidden md:block"}`}>
                    {s}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 h-full flex flex-col justify-between">
              
              <AnimatePresence mode="wait" custom={direction}>
                {step === 0 && (
                  <motion.div 
                    key="step0"
                    custom={direction}
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                    transition={pageTransition}
                    className="space-y-8"
                  >
                    <div className="pb-2 border-b">
                      <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-foreground">Team Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3 md:col-span-2">
                        <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Team Name</Label>
                        <Input {...register("teamName")} placeholder="Enter team name" className="h-14 font-medium text-lg" />
                        {errors.teamName && <p className="text-destructive text-sm font-medium">{errors.teamName.message}</p>}
                      </div>
                      <div className="space-y-3">
                        <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Manager Name</Label>
                        <Input {...register("managerName")} placeholder="Full name" className="h-12 font-medium" />
                        {errors.managerName && <p className="text-destructive text-sm font-medium">{errors.managerName.message}</p>}
                      </div>
                      <div className="space-y-3">
                        <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Coach Name</Label>
                        <Input {...register("coachName")} placeholder="Full name" className="h-12 font-medium" />
                        {errors.coachName && <p className="text-destructive text-sm font-medium">{errors.coachName.message}</p>}
                      </div>
                      <div className="space-y-3">
                        <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Captain Name</Label>
                        <Input {...register("captainName")} placeholder="Full name" className="h-12 font-medium" />
                        {errors.captainName && <p className="text-destructive text-sm font-medium">{errors.captainName.message}</p>}
                      </div>
                      <div className="space-y-3">
                        <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Contact Phone</Label>
                        <Input {...register("contactPhone")} type="tel" placeholder="10-digit mobile number" className="h-12 font-medium" />
                        {errors.contactPhone && <p className="text-destructive text-sm font-medium">{errors.contactPhone.message}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div 
                    key="step1"
                    custom={direction}
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                    transition={pageTransition}
                    className="space-y-8"
                  >
                    <div className="pb-2 border-b">
                      <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-foreground">Main Squad</h3>
                      <p className="text-muted-foreground font-medium text-sm mt-2">Exactly 7 players required.</p>
                    </div>
                    
                    <div className="space-y-3">
                      {playerFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-center bg-muted/50 p-2 border rounded-none">
                          <div className="flex-none w-10 h-10 flex items-center justify-center font-black text-muted-foreground bg-background rounded-none">
                            {index + 1}
                          </div>
                          <div className="flex-1 space-y-1">
                            <Input {...register(`players.${index}.name`)} placeholder="Player Name" className="h-10 bg-transparent border-0 focus-visible:ring-0 focus-visible:border-b focus-visible:border-primary -none px-2 font-medium" />
                            {errors.players?.[index]?.name && <p className="text-destructive text-xs px-2">{errors.players[index]?.name?.message}</p>}
                          </div>
                          <div className="w-24 space-y-1 border-l pl-4">
                            <Input {...register(`players.${index}.jersey`)} placeholder="No." className="h-10 bg-transparent border-0 focus-visible:ring-0 font-heading text-xl text-center font-black px-0" />
                            {errors.players?.[index]?.jersey && <p className="text-destructive text-xs text-center">{errors.players[index]?.jersey?.message}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.players?.root && <p className="text-destructive text-sm font-bold bg-destructive/10 rounded-none text-center py-2 ">{errors.players.root.message}</p>}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    custom={direction}
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                    transition={pageTransition}
                    className="space-y-8"
                  >
                    <div className="pb-2 border-b flex justify-between items-end">
                      <div>
                        <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-foreground">Substitutes</h3>
                        <p className="text-muted-foreground font-medium text-sm mt-2">Add up to 5 substitutes.</p>
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => subFields.length < 5 && appendSub({ name: "", jersey: "" })}
                        disabled={subFields.length >= 5}
                        className="mb-2 uppercase tracking-wider text-xs font-bold"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Sub
                      </Button>
                    </div>
                    
                    {subFields.length === 0 ? (
                      <div className="p-12 border-2 border-dashed rounded-none text-center text-muted-foreground font-medium bg-muted/50">
                        No substitutes added. You can proceed without or add up to 5.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <AnimatePresence>
                          {subFields.map((field, index) => (
                            <motion.div 
                              key={field.id} 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex gap-4 items-center bg-muted/50 p-2 border rounded-none"
                            >
                              <div className="flex-none w-10 h-10 flex items-center justify-center font-black text-muted-foreground bg-background rounded-none">
                                S{index + 1}
                              </div>
                              <div className="flex-1 space-y-1">
                                <Input {...register(`substitutes.${index}.name`)} placeholder="Substitute Name" className="h-10 bg-transparent border-0 focus-visible:ring-0 focus-visible:border-b focus-visible:border-primary -none px-2 font-medium" />
                                {errors.substitutes?.[index]?.name && <p className="text-destructive text-xs px-2">{errors.substitutes[index]?.name?.message}</p>}
                              </div>
                              <div className="w-20 space-y-1 border-l pl-4">
                                <Input {...register(`substitutes.${index}.jersey`)} placeholder="No." className="h-10 bg-transparent border-0 focus-visible:ring-0 font-heading text-xl text-center font-black px-0" />
                                {errors.substitutes?.[index]?.jersey && <p className="text-destructive text-xs text-center">{errors.substitutes[index]?.jersey?.message}</p>}
                              </div>
                              <Button type="button" variant="ghost" size="icon" className="h-10 w-10 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-none" onClick={() => removeSub(index)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                    {errors.substitutes?.root && <p className="text-destructive text-sm bg-destructive/10 rounded-none text-center py-2 ">{errors.substitutes.root.message}</p>}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    custom={direction}
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                    transition={pageTransition}
                    className="space-y-8"
                  >
                    <div className="pb-2 border-b">
                      <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-foreground">Agreements</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <Card className="bg-muted/50 hover:border-primary/50 transition-colors group">
                        <CardContent className="p-6 flex items-start space-x-4">
                          <input type="checkbox" id="agreeFee" {...register("agreeFee")} className="mt-1.5 w-5 h-5 accent-primary cursor-pointer" />
                          <div className="space-y-2">
                            <Label htmlFor="agreeFee" className="text-lg font-bold cursor-pointer transition-colors">
                              I agree to pay the registration fee
                            </Label>
                            <p className="text-sm font-medium text-muted-foreground">
                              Fee must be paid in cash at the venue on the event day to complete tournament entry.
                            </p>
                            {errors.agreeFee && <p className="text-destructive text-sm font-bold">{errors.agreeFee.message}</p>}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/50 hover:border-primary/50 transition-colors group">
                        <CardContent className="p-6 flex items-start space-x-4">
                          <input type="checkbox" id="agreeRules" {...register("agreeRules")} className="mt-1.5 w-5 h-5 accent-primary cursor-pointer" />
                          <div className="space-y-2">
                            <Label htmlFor="agreeRules" className="text-lg font-bold cursor-pointer transition-colors">
                              I accept the tournament rules
                            </Label>
                            <p className="text-sm font-medium text-muted-foreground">
                              We agree to abide by all rules and acknowledge the Chief Referee decisions as final without dispute.
                            </p>
                            {errors.agreeRules && <p className="text-destructive text-sm font-bold">{errors.agreeRules.message}</p>}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Submission error display */}
                    <AnimatePresence>
                      {submitError && (
                        <motion.div
                          role="alert"
                          aria-live="assertive"
                          aria-atomic="true"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 text-destructive"
                        >
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-sm uppercase tracking-wider">Registration Failed</p>
                            <p className="text-xs font-medium mt-1 opacity-80">{submitError}</p>
                            <p className="text-xs font-medium mt-1 opacity-60">Please check your connection and try again. If the issue persists, contact the organizer.</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12">
                <Separator className="mb-8" />
                <div className="flex justify-between items-center relative z-20">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 0 || isSubmitting}
                    className="h-12 px-6 uppercase font-bold tracking-widest text-xs"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  
                  {step < STEPS.length - 1 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="h-12 px-8 uppercase font-bold tracking-wider text-sm"
                    >
                      Next <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 px-10 uppercase font-bold tracking-wider"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Registration"}
                    </Button>
                  )}
                </div>
              </div>

            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
