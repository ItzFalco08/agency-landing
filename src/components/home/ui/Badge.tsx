"use client";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BadgeCheck } from "lucide-react";
import { useTheme } from "next-themes";

export default function Badge() {
    const theme = useTheme();
    const isDark = (theme.theme == "dark")
  return (
    <HoverBorderGradient className="p-1 px-2 flex gap-2 items-center bg-transparent">
        <BadgeCheck size={20} stroke={isDark ? "#fff" : "#000"}/>
        
        <p className="text-sm text-muted-foreground me-1.5">
            Done over <span className="font-semibold text-foreground">50+</span> projects.
        </p>
    </HoverBorderGradient>
  );
}
