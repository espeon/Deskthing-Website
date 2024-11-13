import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "./theme-switch";
import {
  SiGithub,
  SiDiscord,
  SiReddit,
  SiTrello,
  SiBuymeacoffee,
  SiBluesky,
} from "react-icons/si";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <header className="border-t border-green-900/20 sticky top-0 z-50 bg-background/80 backdrop-blur-sm mt-auto">
      <nav className="container mx-auto px-4 py-4 flex flex-col  md:flex-row justify-between lg:items-center">
        <div className="flex flex-col py-4 lg:py-0">
          <div className="text-left">
            <div className="font-mono">DeskThing</div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DeskThing Contributors
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Forever Open Source
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="https://github.com/itsriprod/deskthing" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiGithub className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://github.com/itsriprod/deskthing" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiDiscord className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://github.com/itsriprod/deskthing" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiBluesky className="w-4 h-4" />
            </Button>
          </Link>
          <Link
            href="https://github.com/itsriprod/deskthing"
            target="_blank"
            className="border-r pr-2"
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiReddit className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://github.com/itsriprod/deskthing" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-green-400"
            >
              <SiTrello className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="https://github.com/sponsors/itsriprod" target="_blank">
            <Button variant="ghost" size="icon" className="hover:text-pink-400">
              <Heart className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
