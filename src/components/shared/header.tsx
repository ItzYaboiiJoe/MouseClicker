interface HeaderProps {
  score: number;
}

const Header: React.FC<HeaderProps> = ({ score }) => {
  return (
    <header className="bg-zinc-900 px-6 py-4 shadow-md text-xl font-bold relative flex justify-between items-center">
      <span>Mouse Clicker Game</span>
      <span className="absolute left-1/2 transform -translate-x-1/2">
        Score: {score}
      </span>
    </header>
  );
};

export default Header;
