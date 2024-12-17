import { Outlet, useLocation } from "react-router-dom";

import UserProvider from "@/providers/user-provider";

import TopNav from "@/components/top-nav";

export default function Shared() {
  const location = useLocation();

  return (
    <UserProvider>
      {!location.pathname.includes("workspace") ? (
        <div className="h-full">
          <TopNav />
          <div className="pt-28">
            <Outlet />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </UserProvider>
  );
}
