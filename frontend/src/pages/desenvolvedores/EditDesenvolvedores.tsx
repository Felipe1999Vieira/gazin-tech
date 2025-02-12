import { useEffect, useState } from "react";
import FormDesenvolvedor from "../../components/FormDesenvolvedor";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../service/api";
import { Toast } from "../../components/Toast";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

interface Desenvolvedor {
  id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  hobby: string;
  nivel: {
    id: number;
    nivel: string;
  };
}

export default function EditDesenvolvedores() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [desenvolvedor, setDesenvolvedor] = useState<Desenvolvedor>();

  const handleSubmit = async (desenvolvedor: Desenvolvedor) => {
    try {
      const { data } = await api.put(`/desenvolvedores/${desenvolvedor.id}`, {
        nivel_id: desenvolvedor.nivel.id,
        nome: desenvolvedor.nome,
        sexo: desenvolvedor.sexo,
        data_nascimento: desenvolvedor.data_nascimento,
        hobby: desenvolvedor.hobby,
      });
      if (data.data) {
        navigate("/desenvolvedores");
        Toast(
          "success",
          `Sucesso ao editar o desenvolvedor ${desenvolvedor.nome}`
        );
      }
    } catch (error) {
      const messsage = formatErrorMessage(error);
      Toast("error", messsage);
    }
  };

  const getDesenvolvedor = async () => {
    try {
      const { data } = await api.get(`/desenvolvedores/${id}`);
      if (data.data) {
        setDesenvolvedor(data.data);
      }
    } catch (error) {
      const messsage = formatErrorMessage(error);
      Toast("error", messsage);
      navigate("/desenvolvedores");
    }
  };

  useEffect(() => {
    getDesenvolvedor();
  }, []);

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
          <p className="font-bold text-2xl">Editando Desenvolvedor</p>
        </div>
        <div className="w-full">
          {desenvolvedor && (
            <FormDesenvolvedor
              onSubmit={handleSubmit}
              initialData={desenvolvedor}
            />
          )}
        </div>
      </div>
    </div>
  );
}
