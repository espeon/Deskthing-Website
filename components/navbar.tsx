import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeSwitch } from "./theme-switch";
import { SiGithub } from "react-icons/si";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export function Navbar() {
  let links: LinkProps[] = [
    { href: "/", children: "Home" },
    { href: "/about", children: "About" },
    { href: "/apps", children: "Apps" },
    { href: "/releases", children: "Download" },
  ];
  return (
    <header className="border-b border-green-900/20 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]" title="Menu">
              {links.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link href={link.href}>
                    <SheetTitle>{link.children}</SheetTitle>
                  </Link>
                </SheetClose>
              ))}
            </SheetContent>
          </Sheet>
          <Link
            href="/"
            className="text-xl font-bold text-green-500 hover:text-green-400 transition-colors font-mono"
          >
            DeskThing
          </Link>
          <div className="hidden md:flex gap-2">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                <Button variant="ghost" size="sm">
                  {link.children}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Link
            href="https://github.com/yourusername/deskthing"
            target="_blank"
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiGithub className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
