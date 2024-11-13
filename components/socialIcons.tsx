import { Heart } from "lucide-react";
import Link from "next/link";
import {
  SiGithub,
  SiDiscord,
  SiBluesky,
  SiReddit,
  SiTrello,
} from "react-icons/si";
import { Button } from "./ui/button";

export const SocialIcons = ({
  extraIcons = false,
}: {
  extraIcons?: boolean;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Link href="https://github.com/itsriprod/deskthing" target="_blank">
        <Button variant="ghost" size="icon" className="hover:text-green-400">
          <SiGithub className="w-4 h-4" />
        </Button>
      </Link>
      <Link
        href="https://discord.gg/deskthing-1267348109067817051"
        target="_blank"
      >
        <Button variant="ghost" size="icon" className="hover:text-green-400">
          <SiDiscord className="w-4 h-4" />
        </Button>
      </Link>
      <Link href="https://bsky.app/profile/deskthing.app" target="_blank">
        <Button variant="ghost" size="icon" className="hover:text-green-400">
          <SiBluesky className="w-4 h-4" />
        </Button>
      </Link>
      <Link
        href="https://reddit.com/r/deskthing"
        target="_blank"
        className={extraIcons ? "border-r pr-2" : ""}
      >
        <Button variant="ghost" size="icon" className="hover:text-green-400">
          <SiReddit className="w-4 h-4" />
        </Button>
      </Link>
      {extraIcons && (
        <>
          <Link href="https://trello.com/b/6v0paxqV/deskthing" target="_blank">
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
        </>
      )}
    </div>
  );
};
