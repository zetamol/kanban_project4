import React from "react";
import UserMenu from "./UserMenu/UserMenu";

export default function Navbar() {
  return (
    <div className="navbar">
      Awesome Kanban Board
      <UserMenu />
    </div>
  );
}
