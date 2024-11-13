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
import { GitBranch, Calendar, Tag, Download, Rocket } from "lucide-react";
import Link from "next/link";

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
}: {
  owner?: string;
  repo?: string;
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

  if (loading) {
    return (
      <>
        <CardHeader>
          <CardTitle>Latest Releases</CardTitle>
          <CardDescription>Loading latest releases...</CardDescription>
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
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

  return (
    <>
      <CardHeader>
        <CardTitle>Latest Releases</CardTitle>
        <CardDescription>
          Recent releases for {owner}/{repo}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea
          className="h-[500px] pr-4 -mt-16"
          style={{
            maskImage: `linear-gradient(to bottom, transparent 2rem, black 5rem)`,
            maskComposite: "intersect",
          }}
        >
          <div className="h-16" />
          {releases.map((release) => (
            <div key={release.id} className="mb-6">
              <Link
                href={release.html_url}
                target="_blank"
                className="flex items-center space-x-2"
              >
                <Rocket className="w-4 h-4 mr-2" />
                <span className="text-lg font-semibold mb-2">
                  {release.name}
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
              <p className="text-sm text-muted-foreground mb-2">
                {release.body.split("\n").slice(0, 3).join("\n")}
              </p>
              <div className="space-y-1">
                {release.assets.map((asset) => (
                  <div key={asset.name} className="flex items-center text-sm">
                    <Link href={asset.browser_download_url} target="_blank">
                      <Download className="w-4 h-4 mr-2 inline" />
                      <span className="flex-1">{asset.name}</span>
                      <span className="text-muted-foreground ml-2">
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
