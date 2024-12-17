/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

import { localFetch, localRemove } from "@/api/local";
import { getUser } from "@/api/user";
import { UserAtom } from "@/lib/atoms";

export default function useUserSession() {
  const navigate = useNavigate();
  const [_user, _setUser] = useAtom(UserAtom);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const validateSession = useCallback(async () => {
    const token = localFetch("token");

    if (!token) {
      handleLogout();
      return;
    }

    try {
      const response = await getUser();
      _setUser(response.data.DATA);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      handleLogout();
    }
  }, []);

  const handleLogout = useCallback(() => {
    localRemove("token");
    _setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  }, [navigate, _setUser]);

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  return { isLoggedIn, user: _user, setUser: _setUser, handleLogout };
}
