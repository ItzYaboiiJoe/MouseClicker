import { Button } from "../ui/button";
import TooltipWrapper from "../shared/toolTipWrapper";

const PassiveUpgrades = () => {
  return (
    <div className="space-y-4">
      <h3>Passive Upgrades</h3>
      <TooltipWrapper content="Automatically clicks for you every 10 seconds.">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg hover:cursor-pointer">
          Bot Clicker
        </Button>
      </TooltipWrapper>
    </div>
  );
};

export default PassiveUpgrades;
