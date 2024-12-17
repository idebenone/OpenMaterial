import { ReactNode } from "react";
import useUserSession from "@/hooks/useUserSession";

export default function UserProvider({ children }: { children: ReactNode }) {
  useUserSession();

  return <>{children}</>;
}
