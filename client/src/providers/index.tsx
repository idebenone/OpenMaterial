import { Provider as JotaiProvider } from "jotai";

import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <JotaiProvider>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </JotaiProvider>
    </ThemeProvider>
  );
}
