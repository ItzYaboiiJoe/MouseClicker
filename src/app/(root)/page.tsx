"use client";

import { useEffect, useState, useRef } from "react";
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
  const [activeDuration, setActiveDuration] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load data from local storage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("mouseClickerData");
    const upgradeData = localStorage.getItem("passiveUpgradeData");

    if (savedData) {
      const parsed = JSON.parse(savedData);
      setScore(Number(parsed.score) || 0);
      setLifetimeScore(Number(parsed.lifeTimeScore) || 0);
      setPassivePoints(Number(parsed.passivePower) || 0);
    }

    if (upgradeData) {
      const parsedUpgrades = JSON.parse(upgradeData);
      // Store it back just in case, and notify PassiveUpgrades
      localStorage.setItem(
        "passiveUpgradeData",
        JSON.stringify(parsedUpgrades)
      );
      window.dispatchEvent(
        new CustomEvent("load-passive-upgrades", { detail: parsedUpgrades })
      );
    }
  }, []);

  // Saving Data to Local Storage
  useEffect(() => {
    const data = {
      score: Math.floor(score),
      lifeTimeScore: Math.floor(lifetimeScore),
      passivePower: passivePoints.toFixed(1),
    };
    localStorage.setItem("mouseClickerData", JSON.stringify(data));
  }, [score, lifetimeScore, passivePoints]);

  //function to save data to as a txt file
  const saveDataToFile = () => {
    const saveData = localStorage.getItem("mouseClickerData");
    const upgradeData = localStorage.getItem("passiveUpgradeData");
    if (!saveData || !upgradeData) return;

    const fullData = {
      saveData: JSON.parse(saveData),
      upgradeData: JSON.parse(upgradeData),
    };

    const encoded = btoa(JSON.stringify(fullData));

    const file = new Blob([encoded], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "mouseClickerData.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  //function to load data from a txt file
  const loadDataFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const encoded = String(reader.result || "");
      const decoded = atob(encoded);
      const fullData = JSON.parse(decoded);

      // Update clicker stats
      const saveData = fullData.saveData;
      setScore(Number(saveData.score));
      setLifetimeScore(Number(saveData.lifeTimeScore));
      setPassivePoints(Number(saveData.passivePower));
      localStorage.setItem("mouseClickerData", JSON.stringify(saveData));

      // Update upgrade levels
      const upgradeData = fullData.upgradeData;
      localStorage.setItem("passiveUpgradeData", JSON.stringify(upgradeData));

      // Fire custom event to notify PassiveUpgrades
      window.dispatchEvent(
        new CustomEvent("load-passive-upgrades", { detail: upgradeData })
      );

      event.target.value = "";
    };

    reader.readAsText(file);
  };

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

  // Countdown for active upgrade duration
  useEffect(() => {
    if (activeDuration <= 0) return;

    const interval = setInterval(() => {
      setActiveDuration((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeDuration]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-gray-900 to-black text-white flex flex-col">
      {/* Top Bar */}
      <Header score={Math.floor(score)} lifetime={Math.floor(lifetimeScore)} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Clicker Area */}
        <div className="flex-1 flex flex-col items-center p-8">
          {/* Centered Button */}
          <div className="flex-grow flex items-center justify-center">
            <Button
              onClick={incrementScore}
              className="bg-emerald-500 hover:bg-emerald-600 text-2xl font-bold px-8 py-6 rounded-full shadow-lg transition-all active:scale-95 hover:cursor-pointer"
            >
              Click Me!
            </Button>
          </div>

          {/* Bottom Info */}
          <div className="text-center h-[4.5rem]">
            <p className="mt-4">Current Click Power: {clickPower}</p>
            {/* Displays the Duration only when its active */}
            {activeDuration > 0 && (
              <p className="mt-4">Active Duration: {activeDuration}</p>
            )}
          </div>
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
              setActiveDuration={setActiveDuration}
            />
            {/* Passive Upgrades Buttons */}
            <PassiveUpgrades
              score={score}
              setScore={setScore}
              passive={passivePoints}
              setPassive={setPassivePoints}
            />
          </div>

          <Separator />

          {/* Save and Load */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={saveDataToFile}
              className="bg-gray-700 text-lg active:scale-95 hover:cursor-pointer"
            >
              Save
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-700 text-lg active:scale-95 hover:cursor-pointer"
            >
              Load
            </Button>
            <input
              type="file"
              accept=".txt"
              ref={fileInputRef}
              onChange={loadDataFromFile}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
