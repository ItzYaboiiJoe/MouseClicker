import { Button } from "@/components/ui/button";
import upgrades from "./activeUpgradesList";
import TooltipWrapper from "../shared/toolTipWrapper";

interface ActiveUpgradesProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const ActiveUpgrades: React.FC<ActiveUpgradesProps> = ({ score, setScore }) => {
  const handlePurchase = (cost: number) => {
    if (score < cost) return;

    setScore((score) => score - cost);
  };

  return (
    <div className="space-y-4">
      <h3>Active Upgrades</h3>
      {upgrades.map((upgrade, index) => (
        <TooltipWrapper key={index} content={upgrade.tooltip}>
          <Button
            onClick={() => handlePurchase(upgrade.cost)}
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
