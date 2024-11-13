import { Link } from "react-router-dom";
import { House, Book, BookMarked } from "lucide-react";
export interface NavBarProps {
  selectedOption?: string;
  setSelectedOption: (option: string) => void;
}

const NavBar = ({ selectedOption, setSelectedOption }: NavBarProps) => {
  return (
    <nav className="flex-none bg-sky-700 text-white min-h-screen flex flex-col rounded-r-2xl">
      <div className={"my-4 text-2xl font-bold flex justify-center"}>
        <img src="/src/assets/NavLogo.png" alt="causa" className="size-20" />
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="h-auto">
          <ul className=" cursor-pointer space-y-3 h-auto mt-4">
            <li className="mx-6 rounded shadow-sm bg-gray-500 h-11">
              <Link
                className="flex justify-around px-3 size-full py-2"
                to="/dashboard"
                onClick={() => setSelectedOption("Home")}
              >
                <House className="size-5" />
                {"Home"}
              </Link>
            </li>
            <li className="cursor-pointer mx-6 shadow-sm rounded bg-gray-500 h-11">
              <Link
                className="flex justify-around px-3 py-2"
                to="/dashboard/documents"
                onClick={() => setSelectedOption("Documents")}
              >
                <Book className="size-5" />
                {"Documents"}
              </Link>
            </li>
            <li className="cursor-pointer mx-6 shadow-sm rounded bg-gray-500 h-11">
              <Link
                className="flex justify-around px-3 py-2"
                to="/dashboard/reservations"
                onClick={() => setSelectedOption("Reservations")}
              >
                <BookMarked className="size-5" />
                {"Reservations"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
