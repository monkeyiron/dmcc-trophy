import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate("/admin");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-heading font-black text-4xl uppercase tracking-tight text-foreground">Admin Access</h1>
          <p className="text-muted-foreground font-medium mt-2 text-sm tracking-wide">DMCC Event — Restricted Area</p>
        </div>

        <Card>
          <CardHeader className="border-b pb-6">
            <CardTitle className="font-heading text-xl uppercase tracking-wider">Sign In</CardTitle>
            <CardDescription>Enter your admin credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dmcc.org"
                  required
                  className="h-12 font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 font-medium"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 font-bold uppercase tracking-widest">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-muted-foreground mt-8 font-medium">
          This area is restricted to DMCC event administrators only.
        </p>
      </div>
    </div>
  );
}
