import React from "react";
import { logOut } from "../utilities/users-service";

function LogoutButton() {
  const handleLogout = () => {
    logOut();
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
