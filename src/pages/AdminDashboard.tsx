import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  LogOut,
  Users,
  ChevronDown,
  ChevronUp,
  Phone,
  User,
  ShieldCheck,
  Loader2,
  Trash2,
  Trophy,
  Download,
  FileDown,
} from "lucide-react";

type Player = {
  id: string;
  player_name: string;
  jersey_number: string;
  is_substitute: boolean;
};

type Team = {
  id: string;
  team_name: string;
  manager_name: string;
  coach_name: string;
  captain_name: string;
  contact_phone: string;
  payment_agreed: boolean;
  rules_accepted: boolean;
  created_at: string;
  players?: Player[];
};

export default function AdminDashboard() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigate = useNavigate();

  const generatePDF = (team: Team, allTeams = false) => {
    const teamsToExport = allTeams ? teams : [team];
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    teamsToExport.forEach((t, tIdx) => {
      if (tIdx > 0) doc.addPage();

      // Header bar
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, pageWidth, 28, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("DELHI MEETEI COORDINATING COMMITTEE", pageWidth / 2, 11, { align: "center" });
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("3rd Meira Chukhattpa Cum Annual Sports Meet — 29 March 2026", pageWidth / 2, 20, { align: "center" });

      // Team name
      doc.setTextColor(30, 30, 30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(t.team_name.toUpperCase(), 14, 42);

      // Team metadata
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      const meta = [
        `Manager: ${t.manager_name}`,
        `Coach: ${t.coach_name}`,
        `Captain: ${t.captain_name}`,
        `Contact: ${t.contact_phone}`,
        `Fee Agreed: ${t.payment_agreed ? "Yes" : "No"}`,
        `Registered: ${new Date(t.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}`,
      ];
      meta.forEach((line, i) => doc.text(line, 14 + (i % 3) * 62, 52 + Math.floor(i / 3) * 7));

      // Main players table
      const mainPlayers = (t.players ?? []).filter(p => !p.is_substitute);
      const subs = (t.players ?? []).filter(p => p.is_substitute);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30, 30, 30);
      doc.text("MAIN SQUAD", 14, 72);

      autoTable(doc, {
        startY: 76,
        head: [["#", "Jersey No.", "Player Name", "Role"]],
        body: mainPlayers.map((p, i) => [
          String(i + 1).padStart(2, "0"),
          p.jersey_number,
          p.player_name,
          i === 0 ? "Captain" : "Player",
        ]),
        styles: { font: "helvetica", fontSize: 10, cellPadding: 4 },
        headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [240, 247, 255] },
        columnStyles: { 0: { cellWidth: 12 }, 1: { cellWidth: 24 }, 3: { cellWidth: 22 } },
        margin: { left: 14, right: 14 },
      });

      if (subs.length > 0) {
        const afterMainY = (doc as any).lastAutoTable.finalY + 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(30, 30, 30);
        doc.text(`SUBSTITUTES (${subs.length})`, 14, afterMainY);

        autoTable(doc, {
          startY: afterMainY + 4,
          head: [["#", "Jersey No.", "Player Name"]],
          body: subs.map((p, i) => [
            `S${i + 1}`,
            p.jersey_number,
            p.player_name,
          ]),
          styles: { font: "helvetica", fontSize: 10, cellPadding: 4 },
          headStyles: { fillColor: [100, 116, 139], textColor: 255, fontStyle: "bold" },
          alternateRowStyles: { fillColor: [248, 250, 252] },
          columnStyles: { 0: { cellWidth: 12 }, 1: { cellWidth: 24 } },
          margin: { left: 14, right: 14 },
        });
      }

      // Footer
      const pageH = doc.internal.pageSize.getHeight();
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(0.5);
      doc.line(14, pageH - 16, pageWidth - 14, pageH - 16);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text("Delhi Meetei Coordinating Committee (DMCC) — dmcc-sport official document", pageWidth / 2, pageH - 9, { align: "center" });
    });

    const filename = allTeams
      ? `DMCC_All_Teams_${new Date().toISOString().slice(0, 10)}.pdf`
      : `DMCC_${teamsToExport[0].team_name.replace(/\s+/g, "_")}.pdf`;
    doc.save(filename);
  };

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }
    fetchTeams();
  };

  const fetchTeams = async () => {
    setLoading(true);
    const { data: teamsData, error } = await supabase
      .from("teams")
      .select("*, players(*)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching teams:", error);
    } else {
      setTeams(teamsData || []);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleDelete = async (teamId: string) => {
    if (!confirm("Are you sure you want to delete this team and all its players?")) return;
    setDeleting(teamId);
    // Delete players first (FK constraint)
    await supabase.from("players").delete().eq("team_id", teamId);
    await supabase.from("teams").delete().eq("id", teamId);
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
    setDeleting(null);
  };

  const toggleExpand = (teamId: string) => {
    setExpandedTeam((prev) => (prev === teamId ? null : teamId));
  };

  const mainCount = teams.length;
  const totalPlayers = teams.reduce((acc, t) => acc + (t.players?.filter((p) => !p.is_substitute).length ?? 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-black text-xl uppercase tracking-tight">DMCC Admin</h1>
              <p className="text-xs text-muted-foreground font-medium">Registrations Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {teams.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => generatePDF(teams[0], true)}
                className="gap-2 font-bold uppercase tracking-wider text-xs"
              >
                <FileDown className="w-4 h-4" /> Export All PDF
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2 font-bold uppercase tracking-wider text-xs">
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-black font-heading text-foreground">{mainCount}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Teams Registered</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-black font-heading text-foreground">{totalPlayers}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Main Players</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-2 md:col-span-1">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-black font-heading text-foreground">
                  {teams.reduce((acc, t) => acc + (t.players?.filter((p) => p.is_substitute).length ?? 0), 0)}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Substitutes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Teams List */}
        <div>
          <h2 className="font-heading font-black text-2xl uppercase tracking-tight mb-6">Registered Teams</h2>

          {loading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="font-bold text-sm uppercase tracking-widest">Loading teams...</span>
            </div>
          ) : teams.length === 0 ? (
            <div className="py-24 text-center border-2 border-dashed text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-bold text-lg">No teams registered yet.</p>
              <p className="text-sm mt-1">Teams will appear here as they register.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {teams.map((team, idx) => {
                const mainPlayers = team.players?.filter((p) => !p.is_substitute) ?? [];
                const subs = team.players?.filter((p) => p.is_substitute) ?? [];
                const isExpanded = expandedTeam === team.id;

                return (
                  <Card key={team.id} className="overflow-hidden">
                    <CardHeader className="p-6 flex flex-row items-center justify-between gap-4 cursor-pointer bg-muted/30 hover:bg-muted/60 transition-colors" onClick={() => toggleExpand(team.id)}>
                      <div className="flex items-center gap-5 min-w-0">
                        <span className="font-heading font-black text-4xl text-muted-foreground/30 select-none hidden md:block">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <CardTitle className="font-heading font-black text-xl uppercase tracking-tight truncate">
                            {team.team_name}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                              <User className="w-3 h-3" /> {team.captain_name}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {team.contact_phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:flex gap-2">
                          <Badge variant={team.payment_agreed ? "default" : "secondary"} className="text-xs font-bold uppercase">
                            {team.payment_agreed ? "Fee ✓" : "Fee Pending"}
                          </Badge>
                          <Badge variant="outline" className="text-xs font-bold uppercase">
                            {mainPlayers.length} / 7 Players
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 text-primary border-primary/30 hover:bg-primary/10"
                          onClick={(e) => { e.stopPropagation(); generatePDF(team); }}
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={(e) => { e.stopPropagation(); handleDelete(team.id); }}
                          disabled={deleting === team.id}
                        >
                          {deleting === team.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </Button>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                      </div>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Team Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b">
                          {[
                            { label: "Manager", value: team.manager_name },
                            { label: "Coach", value: team.coach_name },
                            { label: "Captain", value: team.captain_name },
                            { label: "Contact", value: team.contact_phone },
                          ].map((item) => (
                            <div key={item.label}>
                              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                              <p className="font-semibold text-sm text-foreground">{item.value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Main Players */}
                        <div>
                          <h4 className="font-heading font-bold uppercase tracking-wider text-sm mb-4 text-foreground">
                            Main Squad ({mainPlayers.length})
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {mainPlayers.map((p) => (
                              <div key={p.id} className="flex items-center gap-3 p-3 bg-muted border">
                                <span className="font-heading font-black text-xl text-muted-foreground/50 w-8 text-center">
                                  {p.jersey_number}
                                </span>
                                <span className="font-medium text-sm">{p.player_name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Substitutes */}
                        {subs.length > 0 && (
                          <div>
                            <h4 className="font-heading font-bold uppercase tracking-wider text-sm mb-4 text-foreground">
                              Substitutes ({subs.length})
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                              {subs.map((p) => (
                                <div key={p.id} className="flex items-center gap-3 p-3 bg-muted/50 border border-dashed">
                                  <span className="font-heading font-black text-xl text-muted-foreground/40 w-8 text-center">
                                    {p.jersey_number}
                                  </span>
                                  <span className="font-medium text-sm text-muted-foreground">{p.player_name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground">
                          Registered: {new Date(team.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
