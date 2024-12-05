import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createWorkspace } from "@/api/workspace";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCreateWorkspace = async () => {
    try {
      const response = await createWorkspace({
        user_id: "dummy",
        workspace_name: name,
        workspace_description: description,
      });
      navigate(`/workspace/${response.data.DATA.id}`);
    } catch (error) {
      console.log(error);
    }
  };

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
        <Textarea
          placeholder="some description?"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-2 justify-end">
          <Button className={`${name ? "block" : "hidden"}`} disabled={!name}>
            Clear
          </Button>
          <Button disabled={!name} onClick={handleCreateWorkspace}>
            I'm ready!
          </Button>
        </div>
      </div>
    </div>
  );
}
