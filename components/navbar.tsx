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

export function Navbar() {
  return (
    <header className="border-b border-green-900/20 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]" title="Menu">
              <SheetTitle>
                <Link
                  href="/"
                  className="text-xl font-bold text-green-500 hover:text-green-400 transition-colors font-mono"
                >
                  DeskThing
                </Link>
              </SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                  >
                    About
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                  >
                    Docs
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/apps"
                    className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                  >
                    Apps
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Link
            href="/"
            className="text-xl font-bold text-green-500 hover:text-green-400 transition-colors font-mono"
          >
            DeskThing
          </Link>
          <div className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/apps"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Apps
            </Link>
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
