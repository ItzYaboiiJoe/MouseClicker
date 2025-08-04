import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-gray-900 to-black text-white flex flex-col">
      {/* Top Bar */}
      <header className="bg-zinc-900 px-6 py-4 shadow-md text-xl font-bold flex justify-between">
        <span>Mouse Clicker Game</span>
        <span>Score: 0</span>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col md:flex-row">
        {/* Clicker Area */}
        <section className="flex-1 flex flex-col items-center justify-center p-8">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-2xl font-bold px-8 py-6 rounded-full shadow-lg transition-all active:scale-95 hover:cursor-pointer">
            Click Me!
          </Button>
        </section>

        {/* Shop / Sidebar */}
        <aside className="w-full md:w-1/3 border-l border-gray-700 bg-zinc-950 p-6">
          <h2 className="text-2xl font-semibold mb-4">Shop</h2>
          <Separator />
          <div className="space-y-4 my-4">
            <h3>Active Upgrades</h3>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg hover:cursor-pointer">
              Double Tap
            </Button>
            <h3>Passive Upgrades</h3>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg hover:cursor-pointer">
              Bot Clicker
            </Button>
          </div>
        </aside>
      </main>
    </div>
  );
}
