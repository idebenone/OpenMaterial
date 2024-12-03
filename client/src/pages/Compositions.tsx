import { fetchCompositions } from "@/api/compositions";
import CreateComposition from "@/components/dialog/CreateComposition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Compositions = () => {
  const [composition, setComposition] = useState<any[]>([]);
  const [createComposition, setCreateComposition] = useState<boolean>(false);

  const handleFetchCompositions = async () => {
    try {
      const response = await fetchCompositions();
      setComposition(response.data.DATA);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchCompositions();
  }, []);

  return (
    <div className=" h-full p-2 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Input placeholder="Search for material" className="max-w-52" />
        <Button
          className="flex gap-2 items-center"
          onClick={() => setCreateComposition(!createComposition)}
        >
          <p>Create</p>
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>

      <div className="h-full">
        {composition.length === 0 && (
          <div className="flex justify-center items-center">
            <p className="text-muted-foreground font-semibold">
              No Compositions Found
            </p>
          </div>
        )}

        <div className="">
          {composition.map((comp, _) => (
            <Link key={comp.id} to={`${comp.composition_id}`}>
              <div className="p-3 border rounded-md cursor-pointer">
                <p>{comp.composition_name}</p>
                <p>{comp.composition_description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CreateComposition
        dialogState={createComposition}
        onCloseDialog={() => setCreateComposition(!createComposition)}
      />
    </div>
  );
};

export default Compositions;
