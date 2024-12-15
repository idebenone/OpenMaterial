import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import AuthButtons from "./auth-buttons";

export default function TopNav() {
  return (
    <div className="fixed w-full flex justify-center border-b">
      <div className="w-1/2 flex justify-between items-center py-4">
        <Link to="/">
          <span className="flex items-center gap-2">
            <BookOpen />
            <p className="font-bold">OpenMaterial</p>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/home">Home</Link>
          <AuthButtons />
        </div>
      </div>
    </div>
  );
}
