import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, AlertCircle, Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Invalid credentials. Access denied.");
      } else {
        navigate("/admin");
      }
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground mb-6 relative">
            <ShieldCheck className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-75" />
              <span className="relative inline-flex h-3 w-3 bg-primary" />
            </span>
          </div>
          <h1 className="font-heading font-black text-3xl uppercase tracking-tight text-foreground">
            Admin Portal
          </h1>
          <p className="text-muted-foreground font-medium mt-2 text-xs tracking-[0.2em] uppercase">
            DMCC Event — Restricted Area
          </p>
        </div>

        {/* Login Card */}
        <div className="border bg-card shadow-2xl shadow-black/10">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-primary" />

          <div className="p-8">
            <div className="flex items-center gap-2 mb-8 pb-6 border-b">
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Authorised Personnel Only
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
              {/* Error banner */}
              {error && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <Label className="uppercase tracking-[0.15em] text-[10px] font-bold text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  autoComplete="username"
                  className="h-11 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="uppercase tracking-[0.15em] text-[10px] font-bold text-muted-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    autoComplete="current-password"
                    className="h-11 font-medium pr-10"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 font-bold uppercase tracking-widest text-xs mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Verifying…
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Footer warning — intentionally no links */}
        <p className="text-center text-[10px] text-muted-foreground/60 mt-6 font-medium tracking-wide uppercase">
          Unauthorised access is prohibited and may be subject to legal action.
        </p>
      </div>
    </div>
  );
}
