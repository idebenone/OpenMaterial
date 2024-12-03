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
import { createComposition } from "@/api/compositions";

const formSchema = z.object({
  composition_name: z.string(),
  composition_description: z.string(),
});

interface CreateCompositionProps {
  dialogState: boolean;
  onCloseDialog: () => void;
}

const CreateComposition: React.FC<CreateCompositionProps> = ({
  dialogState,
  onCloseDialog,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      composition_name: "",
      composition_description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createComposition(values);
      onCloseDialog();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={dialogState} onOpenChange={onCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ready to compose?</DialogTitle>
          <DialogDescription>
            A composition could be anything!
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 pt-4"
            >
              <FormField
                control={form.control}
                name="composition_name"
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
                name="composition_description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Start</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateComposition;
