import { FolderGit2, Users, Cpu, Coffee } from "lucide-react";
import type { Stat } from "@/types";

/** Rendered as animated count-ups wherever a stats section is used. */
export const stats: Stat[] = [
  { id: "stat-projects", label: "Projects Built", value: 5, suffix: "+", icon: FolderGit2 },
  { id: "stat-clients", label: "Happy Clients", value: 3, suffix: "+", icon: Users },
  { id: "stat-tech", label: "Technologies", value: 20, suffix: "+", icon: Cpu },
  { id: "stat-coffee", label: "Cups of Coffee", value: 250, suffix: "+", icon: Coffee },
];
