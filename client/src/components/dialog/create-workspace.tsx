import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createWorkspace } from "@/api/workspace";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../ui/spinner";
import { Check } from "lucide-react";

const formSchema = z.object({
  workspace_name: z.string(),
  workspace_description: z.string(),
});

interface CreateWorkspaceProps {
  dialogState: boolean;
  onCloseDialog: () => void;
}

const CreateWorkspace: React.FC<CreateWorkspaceProps> = ({
  dialogState,
  onCloseDialog,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspace_name: "",
      workspace_description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await createWorkspace(values);

      if (response.data.DATA) {
        navigate(`/workspace/${response.data.DATA}`);
        toast.success("Workspace has been created successfully");
      } else {
        toast.success("Something went wrong!");
      }
    } catch (error) {
      toast.error("Couldn't create a workspace. Sorry!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogState} onOpenChange={onCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Let's create a workspace?</DialogTitle>
          <DialogDescription>It could be anything!</DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 pt-4"
            >
              <FormField
                control={form.control}
                name="workspace_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workspace_description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                <Button disabled={loading}>
                  {loading ? (
                    <span className="flex justify-center items-center gap-2">
                      <p>Creating</p>
                      <Spinner />
                    </span>
                  ) : (
                    <span className="flex justify-center items-center gap-2">
                      <p>I'm ready!</p>
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              }
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
