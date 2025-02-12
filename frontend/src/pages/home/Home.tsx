import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full  flex flex-col items-center justify-center">
      <div className="gap-12 flex flex-col ">
        <p className="text-2xl font-bold">Olá, bem vindo!</p>
        <button
          onClick={() => {
            navigate("/niveis");
          }}
          className={` p-2 rounded-lg bg-blue-400`}
        >
          Visualizar Niveis
        </button>

        <button
          onClick={() => {
            navigate("/desenvolvedores");
          }}
          className={` p-2 rounded-lg bg-blue-400`}
        >
          Visualizar Desenvolvedores
        </button>
        <p className="text-sm text-gray-500">
          Code by. Felipe Vieira{" "}
          <a
            className="text-blue-400"
            href="https://www.linkedin.com/in/felipe1999vieira/"
            target="_blank"
          >
            Linkedin.
          </a>
        </p>
      </div>
    </div>
  );
}
