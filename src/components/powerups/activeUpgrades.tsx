import { Button } from "../ui/button";

const ActiveUpgrades = () => {
  return (
    <div className="space-y-4">
      <h3>Active Upgrades</h3>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg hover:cursor-pointer">
        Double Tap
      </Button>
    </div>
  );
};

export default ActiveUpgrades;
