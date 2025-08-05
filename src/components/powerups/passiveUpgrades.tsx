import { Button } from "../ui/button";
import upgrades from "./passiveUpgradesList";
import TooltipWrapper from "../shared/toolTipWrapper";
import { useState } from "react";

interface PassiveUpgradesProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  passive: number;
  setPassive: React.Dispatch<React.SetStateAction<number>>;
}

const PassiveUpgrades: React.FC<PassiveUpgradesProps> = ({
  score,
  setScore,
  passive,
  setPassive,
}) => {
  const [upgradeLevels, setUpgradeLevels] = useState<number[]>(
    Array(upgrades.length).fill(0)
  );
  const [finalLevelPurchased, setFinalLevelPurchased] = useState<boolean[]>(
    Array(upgrades.length).fill(false)
  );

  const handlePurchase = (upgradeIndex: number, cost: number) => {
    if (score < cost) return;

    const maxLevelIndex = upgrades[upgradeIndex].levels.length - 1;

    setScore((score) => score - cost);

    const newPassive = passive + upgrades[upgradeIndex].value;
    setPassive(newPassive);

    setUpgradeLevels((prevLevels) => {
      const newLevels = [...prevLevels];
      const currentLevel = newLevels[upgradeIndex];

      if (currentLevel === maxLevelIndex) {
        setFinalLevelPurchased((prev) => {
          const updated = [...prev];
          updated[upgradeIndex] = true;
          return updated;
        });
      }

      if (currentLevel < maxLevelIndex) {
        newLevels[upgradeIndex] += 1;
      }

      return newLevels;
    });
  };

  return (
    <div className="space-y-4">
      <h3>Passive Upgrades</h3>
      {upgrades.map((upgrade, index) => {
        const levelIndex = upgradeLevels[index];
        const currentLevel = upgrade.levels[levelIndex];
        const isFinalLevel = levelIndex === upgrade.levels.length - 1;
        const isMaxed = isFinalLevel && finalLevelPurchased[index];

        return (
          <TooltipWrapper
            key={upgrade.id}
            content={
              isMaxed ? "This upgrade is maxed out." : currentLevel.tooltip
            }
            secondContent={isMaxed ? "" : currentLevel.effect}
          >
            <Button
              onClick={() => handlePurchase(index, currentLevel.cost)}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 hover:cursor-pointer"
            >
              {isMaxed
                ? "Max Upgrade Reached"
                : `${currentLevel.label} — ${currentLevel.cost}`}
            </Button>
          </TooltipWrapper>
        );
      })}
    </div>
  );
};

export default PassiveUpgrades;
