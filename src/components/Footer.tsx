"use client";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Github, Heart } from "lucide-react";

export function Footer() {
  const handleGitHubClick = () => {
    // 実際のGitHubリポジトリURLに置き換えてください
    window.open(
      "https://github.com/your-username/social-insurance-calculator",
      "_blank",
    );
  };

  return (
    <footer className="mt-12 border-t bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="size-3 text-red-500" />
              <span>for the community</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span>MIT License</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              オープンソースプロジェクト
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGitHubClick}
              className="h-8"
            >
              <Github className="size-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="text-center text-xs text-muted-foreground">
          <p>
            この計算ツールは参考値を提供します。実際の保険料については関係機関にご確認ください。
          </p>
        </div>
      </div>
    </footer>
  );
}