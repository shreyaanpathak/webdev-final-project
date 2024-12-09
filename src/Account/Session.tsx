import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Session({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    try {
      const user = await client.profile();
      if (user) {
        dispatch(setCurrentUser(user));
      }
    } catch (err) {
      console.error("Session check failed:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return <>{children}</>;
}
