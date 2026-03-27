import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    if (isStepValid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .insert({
          team_name: data.teamName,
          manager_name: data.managerName,
          coach_name: data.coachName,
          captain_name: data.captainName,
          contact_phone: data.contactPhone,
          payment_agreed: data.agreeFee,
          rules_accepted: data.agreeRules
        })
        .select('id')
        .single();

      if (teamError) throw teamError;

      const teamId = teamData.id;

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
      
      const { error: playersError } = await supabase
        .from('players')
        .insert(allPlayers);

      if (playersError) throw playersError;

      setIsSuccess(true);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="py-24 max-w-2xl mx-auto text-center px-4 md:px-0 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
        <Card className="p-8 md:p-12 glass-card border-primary/30 relative z-10">
          <CardHeader>
            <div className="w-full h-48 mb-8 overflow-hidden rounded-xl bg-background/50 flex items-center justify-center border border-white/10 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
              <img 
                src="/illustrations/register.png" 
                alt="Registration Success" 
                className="w-full h-full object-cover opacity-90 scale-105 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <CardTitle className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter text-glow">
              <span className="text-transparent bg-clip-text bg-gradient-primary">Squad Ready</span>
            </CardTitle>
            <CardDescription className="text-lg font-medium text-foreground/90 mt-4 leading-relaxed">
              Your team has been successfully registered for the 3rd Meira Chukhattpa Annual Sports Meet. Please bring the fee to the venue on the event day.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-8">
            <Button onClick={() => window.location.href = '#home'} size="lg" className="h-14 w-full text-base font-black uppercase tracking-[0.1em] rounded-full bg-gradient-primary hover:opacity-90 shadow-glow-primary text-white border-0 transition-all">
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-24 max-w-4xl mx-auto px-4 md:px-0 relative">
      
      {/* Ambient background glow */}
      <div className="absolute -top-10 -left-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <Card className="glass-card border-white/10 relative z-10 overflow-hidden shadow-elevated">
        <CardHeader className="md:flex-row md:items-start justify-between bg-white/5 border-b border-white/10 p-6 md:p-10">
          <div>
            <CardTitle className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tight text-glow">
              Register <span className="text-transparent bg-clip-text bg-gradient-accent">Team</span>
            </CardTitle>
            <CardDescription className="mt-4 text-base md:text-lg font-medium text-foreground/80">
              Thajamanbi Trophy 7-A Side Football Tournament
            </CardDescription>
          </div>
          <div className="mt-4 md:mt-0 bg-primary/20 text-primary px-5 py-2 rounded-full font-bold text-sm tracking-[0.15em] uppercase inline-flex items-center shadow-glow-primary border border-primary/30">
            Step {step + 1} <span className="opacity-50 ml-1">/ {STEPS.length}</span>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-10">
          <div className="flex mb-10 gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-2 rounded-full transition-all duration-500 shadow-sm ${i <= step ? "bg-primary shadow-glow-primary" : "bg-white/10"}`} />
                <div className={`mt-3 text-[10px] md:text-xs font-bold uppercase tracking-widest ${i <= step ? "text-primary" : "text-muted-foreground hidden md:block"}`}>
                  {s}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {step === 0 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
                <div className="pb-2 border-b border-white/10">
                  <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-white">Team Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 md:col-span-2">
                    <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Team Name</Label>
                    <Input {...register("teamName")} placeholder="Enter team name" className="h-14 bg-black/20 border-white/10 focus-visible:ring-primary text-lg" />
                    {errors.teamName && <p className="text-destructive text-sm font-medium">{errors.teamName.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Manager Name</Label>
                    <Input {...register("managerName")} placeholder="Full name" className="h-14 bg-black/20 border-white/10 font-medium" />
                    {errors.managerName && <p className="text-destructive text-sm font-medium">{errors.managerName.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Coach Name</Label>
                    <Input {...register("coachName")} placeholder="Full name" className="h-14 bg-black/20 border-white/10 font-medium" />
                    {errors.coachName && <p className="text-destructive text-sm font-medium">{errors.coachName.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Captain Name</Label>
                    <Input {...register("captainName")} placeholder="Full name" className="h-14 bg-black/20 border-white/10 font-medium" />
                    {errors.captainName && <p className="text-destructive text-sm font-medium">{errors.captainName.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Contact Phone</Label>
                    <Input {...register("contactPhone")} type="tel" placeholder="10-digit mobile number" className="h-14 bg-black/20 border-white/10 font-medium" />
                    {errors.contactPhone && <p className="text-destructive text-sm font-medium">{errors.contactPhone.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
                <div className="pb-2 border-b border-white/10">
                  <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-white">Main Squad</h3>
                  <p className="text-primary font-medium text-sm mt-2">Exactly 7 players required.</p>
                </div>
                
                <div className="space-y-5">
                  {playerFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-center bg-black/20 p-2 rounded-lg border border-white/5">
                      <div className="flex-none w-10 h-10 flex items-center justify-center font-black text-accent bg-accent/10 rounded-md">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <Input {...register(`players.${index}.name`)} placeholder="Player Name" className="h-12 bg-transparent border-0 focus-visible:ring-0 focus-visible:border-b focus-visible:border-primary rounded-none px-2 font-medium" />
                        {errors.players?.[index]?.name && <p className="text-destructive text-xs px-2">{errors.players[index]?.name?.message}</p>}
                      </div>
                      <div className="w-24 space-y-1 border-l border-white/10 pl-4">
                        <Input {...register(`players.${index}.jersey`)} placeholder="No." className="h-12 bg-transparent border-0 focus-visible:ring-0 font-heading text-xl text-center font-black text-primary px-0" />
                        {errors.players?.[index]?.jersey && <p className="text-destructive text-xs text-center">{errors.players[index]?.jersey?.message}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.players?.root && <p className="text-destructive text-sm font-bold bg-destructive/10 text-center py-2 rounded-md">{errors.players.root.message}</p>}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
                <div className="pb-2 border-b border-white/10 flex justify-between items-end">
                  <div>
                    <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-white">Substitutes</h3>
                    <p className="text-muted-foreground font-medium text-sm mt-2">Add up to 5 substitutes.</p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => subFields.length < 5 && appendSub({ name: "", jersey: "" })}
                    disabled={subFields.length >= 5}
                    className="mb-2 rounded-full border-primary/50 text-primary hover:bg-primary/20 hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Sub
                  </Button>
                </div>
                
                {subFields.length === 0 ? (
                  <div className="p-12 border-2 border-dashed border-white/10 rounded-xl text-center text-muted-foreground/60 font-medium bg-black/10">
                    No substitutes added. You can proceed without or add up to 5.
                  </div>
                ) : (
                  <div className="space-y-5">
                    {subFields.map((field, index) => (
                      <div key={field.id} className="flex gap-4 items-center bg-black/20 p-2 rounded-lg border border-white/5 animate-in fade-in zoom-in-95">
                        <div className="flex-none w-10 h-10 flex items-center justify-center font-black text-muted-foreground bg-white/5 rounded-md">
                          S{index + 1}
                        </div>
                        <div className="flex-1 space-y-1">
                          <Input {...register(`substitutes.${index}.name`)} placeholder="Substitute Name" className="h-12 bg-transparent border-0 focus-visible:ring-0 focus-visible:border-b focus-visible:border-primary rounded-none px-2 font-medium text-muted-foreground" />
                          {errors.substitutes?.[index]?.name && <p className="text-destructive text-xs px-2">{errors.substitutes[index]?.name?.message}</p>}
                        </div>
                        <div className="w-20 space-y-1 border-l border-white/10 pl-4">
                          <Input {...register(`substitutes.${index}.jersey`)} placeholder="No." className="h-12 bg-transparent border-0 focus-visible:ring-0 font-heading text-xl text-center font-black text-muted-foreground px-0" />
                          {errors.substitutes?.[index]?.jersey && <p className="text-destructive text-xs text-center">{errors.substitutes[index]?.jersey?.message}</p>}
                        </div>
                        <Button type="button" variant="ghost" size="icon" className="h-10 w-10 text-destructive/50 hover:text-destructive hover:bg-destructive/10 rounded-md" onClick={() => removeSub(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.substitutes?.root && <p className="text-destructive text-sm bg-destructive/10 text-center py-2 rounded-md">{errors.substitutes.root.message}</p>}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
                <div className="pb-2 border-b border-white/10">
                  <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-white">Agreements</h3>
                </div>
                
                <div className="space-y-6">
                  <Card className="bg-black/20 border-white/10 hover:border-primary/50 transition-colors group">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <input type="checkbox" id="agreeFee" {...register("agreeFee")} className="mt-1.5 w-5 h-5 accent-primary cursor-pointer" />
                      <div className="space-y-2">
                        <Label htmlFor="agreeFee" className="text-lg font-bold cursor-pointer group-hover:text-primary transition-colors">
                          I agree to pay the registration fee
                        </Label>
                        <p className="text-sm font-medium text-muted-foreground">
                          Fee must be paid in cash at the venue on the event day to complete tournament entry.
                        </p>
                        {errors.agreeFee && <p className="text-destructive text-sm font-bold">{errors.agreeFee.message}</p>}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/20 border-white/10 hover:border-primary/50 transition-colors group">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <input type="checkbox" id="agreeRules" {...register("agreeRules")} className="mt-1.5 w-5 h-5 accent-primary cursor-pointer" />
                      <div className="space-y-2">
                        <Label htmlFor="agreeRules" className="text-lg font-bold cursor-pointer group-hover:text-primary transition-colors">
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
              </div>
            )}

            <Separator className="my-8 border-white/10" />
            
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 0 || isSubmitting}
                className="h-12 px-6 uppercase font-black tracking-widest text-xs rounded-full border-white/20 bg-transparent hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              
              {step < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="h-12 px-8 uppercase font-black tracking-[0.1em] text-sm rounded-full bg-white text-black hover:bg-white/90 transition-colors"
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 px-10 uppercase font-black tracking-[0.1em] rounded-full bg-gradient-primary border-0 shadow-glow-primary text-white hover:scale-105 transition-all text-sm"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              )}
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
