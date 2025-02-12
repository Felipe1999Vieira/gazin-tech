import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { Toast } from "../../components/Toast";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import NivelForm from "../../components/FormNivel";

interface Nivel {
  id: number;
  nivel: string;
}

export default function AddNiveis() {
  const navigate = useNavigate();

  const handleSubmit = async (nivel: Nivel) => {
    try {
      const { data } = await api.post(`/niveis`, {
        nivel: nivel.nivel,
      });
      if (data.data) {
        navigate("/niveis");
        Toast("success", `Sucesso ao cadastrar o desenvolvedor ${nivel.nivel}`);
      }
    } catch (error) {
      const messsage = formatErrorMessage(error);
      Toast("error", messsage);
    }
  };

  return (
    <div className="w-full justify-center flex">
      <div className="flex flex-col items-center justify-center md:w-2/3 sm:w-3/3">
        <div className="w-full p-4 flex items-center gap-4 ">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="rounded-md p-3 flex flex-row bg-neutral-700 hover:bg-neutral-600 items-center"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-100" /> Voltar
          </button>
          <p className="font-bold text-2xl">Adicionando Nível</p>
        </div>
        <div className="w-full">
          <NivelForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
