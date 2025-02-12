import { ReactNode } from "react";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardProps {
  children: ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full">
      <div className="bg-blue-600 px-6 py-4 flex flex-row items-center justify-start gap-6">
        <div>
          <img className="h-20 w-20 rounded-full " src={logo} />
          <p className="text-xl font-bold">Gazin Tech</p>
        </div>
        <div className="flex flex-row gap-4 text-md font-bold">
          <button
            onClick={() => {
              navigate("/");
            }}
            className={` p-2 rounded-lg ${
              location.pathname === "/" && "bg-blue-800"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate("/niveis");
            }}
            className={` p-2 rounded-lg ${
              location.pathname === "/niveis" && "bg-blue-800"
            }`}
          >
            Niveis
          </button>

          <button
            onClick={() => {
              navigate("/desenvolvedores");
            }}
            className={` p-2 rounded-lg ${
              location.pathname === "/desenvolvedores" && "bg-blue-800"
            }`}
          >
            Desenvolvedores
          </button>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
