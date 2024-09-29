import { Link } from "@remix-run/react";
import { IconLogoGear } from "../assets/icons";

export default function Navbar() {
  return (
    <nav className="fixed w-screen top-0 bg-slate-900 p-4 flex justify-between">
      <ul className="flex space-x-4">
        <IconLogoGear iconSize={24} className={"text-white"} />
        <li>
          <Link to="/" prefetch="intent" className="text-white hover:text-green-400">Home</Link>
        </li>
        <li>
          <Link to="/releases" prefetch="intent" className="text-white hover:text-green-400">Releases</Link>
        </li>
        <li>
          <Link to="/apps" prefetch="intent" className="text-white hover:text-green-400">Apps</Link>
        </li>
        <li>
          <Link to="/about" prefetch="intent" className="text-white hover:text-green-400">About</Link>
        </li>
        <li>
          <Link to="/supporters" prefetch="intent" className="text-white hover:text-green-400">Supporters</Link>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
      <ul>
        <li>
          <iframe src="https://github.com/sponsors/ItsRiprod/button" title="Sponsor ItsRiprod" height="32" width="114" style={{border: "0", borderRadius: "6px"}}></iframe>
        </li>
      </ul>
    </nav>
  );
}
