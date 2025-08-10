import { Button } from "../ui/button";
import upgrades from "./passiveUpgradesList";
import TooltipWrapper from "../shared/toolTipWrapper";
import { useState, useEffect } from "react";

interface PassiveUpgradesProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  passive: number;
  setPassive: React.Dispatch<React.SetStateAction<number>>;
}

type PassiveUpgradeData = {
  levels: number[];
  finalPurchased: boolean[];
};

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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("passiveUpgradeData");
    if (raw) {
      const parsed: PassiveUpgradeData = JSON.parse(raw);
      if (
        Array.isArray(parsed.levels) &&
        Array.isArray(parsed.finalPurchased)
      ) {
        setUpgradeLevels(parsed.levels);
        setFinalLevelPurchased(parsed.finalPurchased);
      }
    }
    setHydrated(true);
  }, []);

  // Saving upgrade levels to local storage
  useEffect(() => {
    if (!hydrated) return;
    const upgradeData: PassiveUpgradeData = {
      levels: upgradeLevels,
      finalPurchased: finalLevelPurchased,
    };
    localStorage.setItem("passiveUpgradeData", JSON.stringify(upgradeData));
  }, [upgradeLevels, finalLevelPurchased, hydrated]);

  useEffect(() => {
    const handleLoad = (e: Event) => {
      const { detail } = e as CustomEvent<PassiveUpgradeData>;
      if (detail?.levels && detail?.finalPurchased) {
        setUpgradeLevels(detail.levels);
        setFinalLevelPurchased(detail.finalPurchased);
        localStorage.setItem("passiveUpgradeData", JSON.stringify(detail));
      }
    };
    window.addEventListener("load-passive-upgrades", handleLoad);
    return () =>
      window.removeEventListener("load-passive-upgrades", handleLoad);
  }, []);

  const handlePurchase = (upgradeIndex: number, cost: number) => {
    // Button wont work if the user doesn't have enough points
    if (score < cost) return;

    // Fetching last index of levels array
    const maxLevelIndex = upgrades[upgradeIndex].levels.length - 1;

    setScore((score) => score - cost);

    // Increasing passive power
    const newPassive = passive + upgrades[upgradeIndex].value;
    setPassive(newPassive);

    // Updating the level of the purchased upgrade
    setUpgradeLevels((prevLevels) => {
      const newLevels = [...prevLevels];
      const currentLevel = newLevels[upgradeIndex];

      // Marking the final level as purchased to disable further purchases
      if (currentLevel === maxLevelIndex) {
        setFinalLevelPurchased((prev) => {
          const updated = [...prev];
          updated[upgradeIndex] = true;
          return updated;
        });
      }

      // Only update the button to the next level if not at max level
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
              className="w-full bg-blue-600 hover:bg-blue-800 hover:cursor-pointer"
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
