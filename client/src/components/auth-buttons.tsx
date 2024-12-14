import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { authorize_github } from "@/api/auth";

export default function AuthButtons() {
  const handleGitAuth = () => {
    try {
      window.location.assign(authorize_github(true));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button className="flex gap-2 items-center" onClick={handleGitAuth}>
        <Github className="h-4 w-4" />
        <p>Sign in</p>
      </Button>
    </div>
  );
}
