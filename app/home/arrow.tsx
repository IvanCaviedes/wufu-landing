import { ArrowDown, ArrowRight } from "lucide-react";

export function Arrow({ down = false }: { down?: boolean }) {
  return down ? <ArrowDown size={18} /> : <ArrowRight size={18} />;
}
