import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full py-4 text-white text-lg border-b border-b-white">
      <ul className="flex gap-8 group-hover:text-black">
        <li className="hover:text-neutral-400">
          <Link to="/">Início</Link>
        </li>
        <li className="hover:text-neutral-400">
          <Link to="/proprietarios">Proprietários</Link>
        </li>
        <li className="hover:text-neutral-400">
          <Link to="/veiculos">Veículos</Link>
        </li>
      </ul>
    </header>
  );
};
