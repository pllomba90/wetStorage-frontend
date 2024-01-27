import React from "react";
import { useNavigate, Outlet } from "react-router-dom";


function PrivateRoute({ exact,path, element, children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    console.debug(
      "PrivateRoute",
      "exact=", exact,
      "path=", path,
      "element=", element,
      "token=", token,
      "children=", children
  );
  
   return(
      token ? <Outlet/> : navigate("/")
   );
    }
  
  export default PrivateRoute;