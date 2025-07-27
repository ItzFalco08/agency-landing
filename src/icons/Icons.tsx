"use client";
import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import globeIcon from "@/icons/source/globe.json";
import marketingIcon from "@/icons/source/marketing.json";
import codeIcon from "@/icons/source/code.json";
import softwareIcon from "@/icons/source/software.json";

import { useTheme } from "next-themes"; 


function Globe({colors}: {colors?: string}) {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    const interval = setInterval(() => {
        playerRef.current?.playFromBeginning();
    }, 3000); // Play every 3 seconds

    return () => {
      clearInterval(interval); // Cleanup
    }
  }, [])
    
  return (
    <Player 
      ref={playerRef}
      icon={globeIcon}
      colors={colors}
      size={34}
    />
  )
}

function Marketing({colors }: { colors?: string }) {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    const interval = setInterval(() => {
        playerRef.current?.playFromBeginning();
    }, 3000); // Play every 3 seconds
  
    return () => {
      clearInterval(interval); // Cleanup
    }
  }, [])
    
  return (
    <Player 
      ref={playerRef}
      icon={marketingIcon}
      colors={colors}
      size={34}
    />
  )
}


function Code({colors}: {colors?: string}) {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    const interval = setInterval(() => {
        playerRef.current?.playFromBeginning();
    }, 3000); // Play every 3 seconds
  
    return () => {
      clearInterval(interval); // Cleanup
    }
  }, [])
  
  return (
    <Player 
      ref={playerRef}
      icon={codeIcon}
      colors={colors}
      size={34}
    />
  )
}

function Software({colors }: { colors?: string }) {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    const interval = setInterval(() => {
        playerRef.current?.playFromBeginning();
    }, 3000); // Play every 3 seconds
  
    return () => {
      clearInterval(interval); // Cleanup
    }
  }, [])
  
  return (
    <Player 
      ref={playerRef}
      icon={softwareIcon}
      colors={colors}
      size={34}
    />
  )
}



export { Globe, Marketing, Code, Software };