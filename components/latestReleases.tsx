"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GitBranch,
  Calendar,
  Tag,
  Download,
  Rocket,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface Asset {
  name: string;
  download_count: number;
  browser_download_url: string;
  size: number;
}

interface Release {
  id: number;
  name: string;
  tag_name: string;
  published_at: string;
  html_url: string;
  body: string;
  assets: Asset[];
}

export default function GitHubReleases({
  owner = "vercel",
  repo = "next.js",
  latest = null,
  showHeader = true,
  showLatestRelevantRelease = true,
}: {
  owner?: string;
  repo?: string;
  latest?: null | number;
  showHeader?: boolean;
  showLatestRelevantRelease?: boolean;
}) {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/releases`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch releases");
        }
        const data = await response.json();
        setReleases(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching releases. Please try again later.");
        setLoading(false);
      }
    };

    fetchReleases();
  }, [owner, repo]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDownloadCount = (count: number) => {
    return new Intl.NumberFormat("en-US", { notation: "compact" }).format(
      count,
    );
  };

  const deviceOS: () =>
    | "windows"
    | "macos"
    | "linux"
    | "android"
    | "ios"
    | undefined = () => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent;
      console.log("Your UA is", userAgent);
      if (userAgent.includes("Windows")) {
        return "windows";
      } else if (userAgent.includes("Mac")) {
        return "macos";
      } else if (userAgent.includes("Linux")) {
        return "linux";
      } else if (userAgent.includes("Android")) {
        return "android";
      } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
        return "ios";
      }
    }
  };

  if (loading) {
    return (
      <>
        {showHeader && (
          <CardHeader>
            <CardTitle>Latest Releases</CardTitle>
            <CardDescription>Loading latest releases...</CardDescription>
          </CardHeader>
        )}
        <CardContent className="min-w-[550px] min-h-max h-full max-h-[500px] animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
          <Skeleton className="h-4 w-1/5 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const latestReleases = latest ? releases.slice(0, latest) : releases;

  const os = deviceOS();

  return (
    <>
      {showHeader && (
        <CardHeader>
          <CardTitle>Latest Releases</CardTitle>
          <CardDescription>
            Recent releases for {owner}/{repo}
          </CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <ScrollArea
          className="h-full max-h-[700px] overflow-auto pr-4 -mt-16"
          style={{
            maskImage: `linear-gradient(to bottom, transparent 2rem, black 4rem, black 90%, transparent 97%)`,
            maskComposite: "intersect",
          }}
        >
          <div className="h-16" />
          {latestReleases.map((release, index) => (
            <div
              key={release.id}
              className={`mb-6 ${index != 0 && "border-t border-neutral-200/50 pt-6"}`}
            >
              <Link
                href={release.html_url}
                target="_blank"
                className="flex items-center space-x-2"
              >
                <span className="text-lg font-semibold mb-2 flex items-center">
                  <Rocket className="w-6 h-6 mr-2" />
                  {release.name}
                  {index == 0 && (
                    <Badge variant="default" className="ml-2 flex items-center">
                      <PartyPopper className="w-4 h-4 mr-1 inline" />
                      <span>Latest</span>
                    </Badge>
                  )}
                </span>
              </Link>
              <div className="flex items-center space-x-4 mb-2">
                <Badge variant="secondary">
                  <Tag className="w-4 h-4 mr-1" />
                  {release.tag_name}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(release.published_at)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {release.body
                  .replace(/[\n]+/g, "\n")
                  .split("\n")
                  .slice(0, 4)
                  .map((line, index, total) => (
                    <p key={index}>
                      {line.trimEnd()}
                      {index == total.length - 1 && "..."}
                    </p>
                  ))}
              </div>
              {showLatestRelevantRelease && index == 0 && (
                <>
                  <ShowReleasesForDevice release={release} deviceOS={os} />
                  <div className="text-sm text-muted-foreground my-1">
                    Or download the latest release for your device:
                  </div>
                </>
              )}
              <div className="space-y-1">
                {release.assets.map((asset) => (
                  <div
                    key={asset.name}
                    className="flex items-center text-sm group"
                  >
                    <Link
                      href={asset.browser_download_url}
                      target="_blank"
                      className="group-hover:text-green-400 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2 inline" />
                      <span className="flex-1">{asset.name}</span>
                      <span className="text-muted-foreground ml-2 group-hover:text-green-400/60 transition-colors">
                        {formatDownloadCount(asset.download_count)} downloads
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </>
  );
}

function ShowReleasesForDevice({
  release,
  deviceOS,
}: {
  release: Release;
  deviceOS: "windows" | "macos" | "linux" | "android" | "ios" | undefined;
}) {
  const relevantRelease = displayRelevantRelease(release, deviceOS);
  if (relevantRelease && deviceOS) {
    return (
      <Link
        href={relevantRelease.browser_download_url}
        target="_blank"
        className="flex items-center space-x-2 py-2"
      >
        <Button size="sm" variant="default">
          <Download className="w-4 h-4 mr-2 inline" />
          DeskThing {release.name} for{" "}
          {deviceOS[0].toUpperCase().replace("I", "i").replace("M", "m") +
            deviceOS.slice(1).replace("os", "OS")}
        </Button>
      </Link>
    );
  } else {
    return <div>No release for {deviceOS}. Sorry about that.</div>;
  }
}

function displayRelevantRelease(
  release: Release,
  deviceOS: "windows" | "macos" | "linux" | "android" | "ios" | undefined,
) {
  if (deviceOS === "windows") {
    return release.assets.find((asset) => asset.name.includes("win"));
  } else if (deviceOS === "macos") {
    return release.assets.find((asset) => asset.name.includes("mac"));
  } else if (deviceOS === "linux") {
    return release.assets.find((asset) => asset.name.includes("linux"));
  } else if (deviceOS === "android") {
    return null;
  } else if (deviceOS === "ios") {
    return null;
  } else {
    return null;
  }
}
