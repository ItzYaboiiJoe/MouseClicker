import { Button } from "@/components/ui/button";
import TooltipWrapper from "../shared/toolTipWrapper";

const ActiveUpgrades = () => {
  return (
    <div className="space-y-4">
      <h3>Active Upgrades</h3>
      <TooltipWrapper content="Increases click power by 2x for 30 seconds.">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg hover:cursor-pointer">
          Double Tap
        </Button>
      </TooltipWrapper>
    </div>
  );
};

export default ActiveUpgrades;
