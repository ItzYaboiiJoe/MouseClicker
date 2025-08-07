import { useState } from "react";
import { Button } from "@/components/ui/button";
import upgrades from "./activeUpgradesList";
import TooltipWrapper from "../shared/toolTipWrapper";

interface ActiveUpgradesProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  clickPower: number;
  setClickPower: React.Dispatch<React.SetStateAction<number>>;
  setActiveDuration: React.Dispatch<React.SetStateAction<number>>;
}

const ActiveUpgrades: React.FC<ActiveUpgradesProps> = ({
  score,
  setScore,
  clickPower,
  setClickPower,
  setActiveDuration,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handlePurchase = (upgradeIndex: number, cost: number) => {
    if (score < cost || isActive) return;

    setIsActive(true);
    setScore((score) => score - cost);

    // Storing and setting up the click powers
    const originalClickPower = clickPower;
    const newClickPower = clickPower * upgrades[upgradeIndex].effect;
    setClickPower(newClickPower);

    // Reverting click power after the upgrade duration
    const duration = upgrades[upgradeIndex].duration * 1000;
    setActiveDuration(duration / 1000);
    setTimeout(() => {
      setClickPower(originalClickPower);
      setIsActive(false);
    }, duration);
  };

  return (
    <div className="space-y-4">
      <h3>Active Upgrades</h3>
      {upgrades.map((upgrade, index) => (
        <TooltipWrapper key={index} content={upgrade.tooltip}>
          <Button
            onClick={() => handlePurchase(index, upgrade.cost)}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 hover:cursor-pointer"
          >
            {upgrade.label} — {upgrade.cost}
          </Button>
        </TooltipWrapper>
      ))}
    </div>
  );
};

export default ActiveUpgrades;
