import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");

  function handleCreateWorkspace() {
    navigate("/workspace");
  }

  return (
    <div className="flex  h-full w-full justify-center items-center">
      <div className="flex flex-col gap-2 w-1/3">
        <p className="text-muted-foreground font-semibold">
          Let's create a workspace for ya!
        </p>
        <Input
          placeholder="what do you wanna call it?"
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex gap-2 justify-end">
          <Button className={`${name ? "block" : "hidden"}`} disabled={!name}>
            Clear
          </Button>
          <Button disabled={!name}>I'm ready!</Button>
        </div>
      </div>
    </div>
  );
}
