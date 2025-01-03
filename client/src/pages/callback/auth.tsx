import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { authenticate_github } from "@/api/auth";

import { toast } from "sonner";
import { localSync } from "@/api/local";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      params.get("method") &&
      params.get("code") &&
      params.get("method") === "git"
    ) {
      handleGitCallback();
    }
  }, [params]);

  const handleGitCallback = async () => {
    try {
      const response = await authenticate_github(params.get("code") as string);
      localSync("token", response.data.DATA);
      navigate("/home");
      toast.success("Authentication was successful.");
    } catch (error) {
      toast.error("Something went wrong while authenticating!");
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      Authenticating...
    </div>
  );
}
