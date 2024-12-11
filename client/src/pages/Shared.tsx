import TopNav from "@/components/top-nav";
import { Outlet } from "react-router-dom";

export default function Shared() {
  return (
    <div className="h-full">
      <TopNav />
      <Outlet />
    </div>
  );
}
