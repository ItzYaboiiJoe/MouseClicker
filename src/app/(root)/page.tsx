"use client";

import { useState } from "react";
import Header from "@/components/shared/header";
import ActiveUpgrades from "@/components/powerups/activeUpgrades";
import PassiveUpgrades from "@/components/powerups/passiveUpgrades";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [score, setScore] = useState(0);
  const [lifetimeScore, setLifetimeScore] = useState(0);

  const incrementScore = () => {
    setScore(score + 1);
    setLifetimeScore(lifetimeScore + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-gray-900 to-black text-white flex flex-col">
      {/* Top Bar */}
      <Header score={score} lifetime={lifetimeScore} />

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
        <div className="w-full md:w-1/3 border-l border-gray-700 bg-zinc-950 p-6">
          <h2 className="text-2xl font-semibold mb-4">Shop</h2>

          <Separator />

          <div className="space-y-4 my-4">
            {/* Active Upgrades Buttons */}
            <ActiveUpgrades score={score} setScore={setScore} />
            {/* Passive Upgrades Buttons */}
            <PassiveUpgrades score={score} setScore={setScore} />
          </div>
        </div>
      </div>
    </div>
  );
}
