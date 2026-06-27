import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import MusicBox from "./MusicBox";

const links = [
  { to: "/", label: "[01] Home", end: true },
  { to: "/experience", label: "[02] Me" },
  { to: "/projects", label: "[03] Work" },
  { to: "/eye", label: "[04] Eye" },
];

export default function Navbar() {
  return (
    <header className="replica-topbar site-topbar">
      <p>ntay@localhost:~$</p>
      <nav aria-label="Primary navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => cn(isActive && "is-active")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <MusicBox />
      <div className="replica-window-controls" aria-hidden="true">
        <span>_</span>
        <span>[]</span>
        <span>x</span>
      </div>
    </header>
  );
}
