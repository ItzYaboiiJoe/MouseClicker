import { Button } from "../ui/button";
import upgrades from "./passiveUpgradesList";
import TooltipWrapper from "../shared/toolTipWrapper";

interface PassiveUpgradesProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const PassiveUpgrades: React.FC<PassiveUpgradesProps> = ({
  score,
  setScore,
}) => {
  const handlePurchase = (cost: number) => {
    setScore((score) => score - cost);
  };

  return (
    <div className="space-y-4">
      <h3>Passive Upgrades</h3>
      {upgrades.map((upgrade, index) => (
        <TooltipWrapper key={index} content={upgrade.tooltip}>
          <Button
            onClick={() => handlePurchase(upgrade.cost)}
            disabled={score < upgrade.cost}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 hover:cursor-pointer"
          >
            {upgrade.label} — {upgrade.cost}
          </Button>
        </TooltipWrapper>
      ))}
    </div>
  );
};

export default PassiveUpgrades;
