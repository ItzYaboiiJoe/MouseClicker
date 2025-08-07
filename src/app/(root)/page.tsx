"use client";

import { useEffect, useState } from "react";
import Header from "@/components/shared/header";
import ActiveUpgrades from "@/components/powerups/activeUpgrades";
import PassiveUpgrades from "@/components/powerups/passiveUpgrades";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [score, setScore] = useState(0);
  const [lifetimeScore, setLifetimeScore] = useState(0);
  const [passivePoints, setPassivePoints] = useState(0);
  const [clickPower, setClickPower] = useState(1);

  // Increment score on button click
  const incrementScore = () => {
    setScore(score + clickPower);
    setLifetimeScore(lifetimeScore + clickPower);
  };

  // Auto clicks based on upgrades
  useEffect(() => {
    const interval = setInterval(() => {
      if (passivePoints > 0) {
        const increment = passivePoints / 10;
        setScore(score + increment);
        setLifetimeScore(lifetimeScore + increment);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [passivePoints, score, lifetimeScore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-gray-900 to-black text-white flex flex-col">
      {/* Top Bar */}
      <Header score={Math.floor(score)} lifetime={Math.floor(lifetimeScore)} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Clicker Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <Button
            onClick={incrementScore}
            className="bg-emerald-500 hover:bg-emerald-600 text-2xl font-bold px-8 py-6 rounded-full shadow-lg transition-all active:scale-95 hover:cursor-pointer"
          >
            Click Me!
          </Button>
        </div>

        {/* Shop / Sidebar */}
        <div className="w-full md:max-w-lg border-l border-gray-700 bg-zinc-950 p-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Shop</h2>
            <h2 className="text-2xl font-semibold mb-4 mr-6">
              Per Second: {passivePoints.toFixed(1)}
            </h2>
          </div>

          <Separator />

          <div className="space-y-4 my-4">
            {/* Active Upgrades Buttons */}
            <ActiveUpgrades
              score={score}
              setScore={setScore}
              clickPower={clickPower}
              setClickPower={setClickPower}
            />
            {/* Passive Upgrades Buttons */}
            <PassiveUpgrades
              score={score}
              setScore={setScore}
              passive={passivePoints}
              setPassive={setPassivePoints}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
