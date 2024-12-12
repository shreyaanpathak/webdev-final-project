// Session.tsx  
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Session({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCurrentUser = async () => {
    try {
      if (currentUser?._id) {
        const user = await client.profile(currentUser._id);
        if (user) {
          dispatch(setCurrentUser(user));
        }
      }
    } catch (err) {
      console.error("Session check failed:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [currentUser?._id]);

  return <>{children}</>;
}
