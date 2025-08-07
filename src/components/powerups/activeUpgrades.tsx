import { Button } from "@/components/ui/button";
import upgrades from "./activeUpgradesList";
import TooltipWrapper from "../shared/toolTipWrapper";

interface ActiveUpgradesProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  clickPower: number;
  setClickPower: React.Dispatch<React.SetStateAction<number>>;
}

const ActiveUpgrades: React.FC<ActiveUpgradesProps> = ({
  score,
  setScore,
  clickPower,
  setClickPower,
}) => {
  const handlePurchase = (upgradeIndex: number, cost: number) => {
    if (score < cost) return;

    setScore((score) => score - cost);

    const newClickPower = clickPower * upgrades[upgradeIndex].effect;
    setClickPower(newClickPower);
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
