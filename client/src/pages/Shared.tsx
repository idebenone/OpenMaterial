import TopNav from "@/components/top-nav";
import { Outlet } from "react-router-dom";

export default function Shared() {
  return (
    <div className="h-full">
      <TopNav />
      <div className="pt-28">
        <Outlet />
      </div>
    </div>
  );
}
