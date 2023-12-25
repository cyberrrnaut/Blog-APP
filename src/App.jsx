import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authslice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !login ? (<div className="min-h-sc">Test</div>) : null;




}
export default App;