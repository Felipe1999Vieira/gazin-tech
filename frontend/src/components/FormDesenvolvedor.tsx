import React, { useState, useEffect } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { Toast } from "./Toast";
import { formatErrorMessage } from "../utils/formatErrorMessage";

interface DeveloperFormProps {
  onSubmit: (formData: Desenvolvedor) => void;
  initialData?: Desenvolvedor;
}

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

interface NivelOption {
  id: number;
  nivel: string;
}

export default function DeveloperForm({
  onSubmit,
  initialData,
}: DeveloperFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Desenvolvedor>({
    id: 1,
    nome: "",
    sexo: "M",
    data_nascimento: "",
    hobby: "",
    nivel: {
      id: 2,
      nivel: "",
    },
  });

  const [nivelOptions, setNivelOptions] = useState<NivelOption[]>([]);
  const [nivelSelected, setNivelSelected] = useState<NivelOption | null>();
  const [pageNiveis, setPageNiveis] = useState(1);
  const perPage = 10;

  const getNiveis = async () => {
    try {
      const { data } = await api.get(`/niveis`, {
        params: {
          page: pageNiveis,
          perPage,
        },
      });

      if (data.data) {
        setNivelOptions((prevOptions) => [...prevOptions, ...data.data.niveis]);
        if (data.meta.current_page < data.meta.last_page) {
          setPageNiveis((prevPage) => prevPage + 1);
        }
      }
    } catch (error) {
      const messsage = formatErrorMessage(error);
      Toast("error", messsage);
      navigate("/desenvolvedores");
    }
  };

  useEffect(() => {
    if (pageNiveis !== 1) {
      getNiveis();
    }
  }, [pageNiveis]);

  useEffect(() => {
    getNiveis();
    if (initialData) {
      setFormData(initialData);
      setNivelSelected(initialData.nivel);
    }
  }, [initialData]);

  const handleChange = (key: keyof Desenvolvedor, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangeSelect = (field: string, value: number) => {
    const selectedNivel = nivelOptions.find((nivel) => nivel.id === value);
    setNivelSelected(selectedNivel);

    if (selectedNivel) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: selectedNivel,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: {
          id: null,
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <label className="block mb-2">Nível</label>
      <select
        value={nivelSelected?.id}
        onChange={(e) => handleChangeSelect("nivel", Number(e.target.value))}
        className="w-full border p-4 rounded-md mb-4 bg-neutral-700 border-neutral-800"
      >
        <option key={0} value={0}>
          Selecione uma opção
        </option>
        {nivelOptions &&
          nivelOptions.map((nivel) => (
            <option key={nivel.id} value={nivel.id}>
              {nivel.nivel}
            </option>
          ))}
      </select>

      <label className="block mb-2">Nome</label>
      <input
        type="text"
        value={formData.nome}
        onChange={(e) => handleChange("nome", e.target.value)}
        className="w-full border p-4 rounded-md mb-4 bg-neutral-700 border-neutral-800"
        placeholder="Digite o nome"
      />

      <label className="block mb-2">Sexo</label>
      <div className="flex gap-4 mb-4">
        <label>
          <input
            type="radio"
            value="M"
            checked={formData.sexo === "M"}
            onChange={() => handleChange("sexo", "M")}
            className="mr-2"
          />
          Masculino
        </label>
        <label>
          <input
            type="radio"
            value="F"
            checked={formData.sexo === "F"}
            onChange={() => handleChange("sexo", "F")}
            className="mr-2"
          />
          Feminino
        </label>
      </div>

      <label className="block mb-2">Data de Nascimento</label>
      <input
        type="date"
        value={formData.data_nascimento}
        onChange={(e) => handleChange("data_nascimento", e.target.value)}
        className="w-full border p-4 rounded-md mb-4 bg-neutral-700 border-neutral-800"
      />

      <label className="block mb-2">Hobby</label>
      <textarea
        value={formData.hobby}
        onChange={(e) => handleChange("hobby", e.target.value)}
        className="w-full border p-4 rounded-md mb-4 bg-neutral-700 border-neutral-800"
        placeholder="Digite o hobby"
      />

      <button
        type="submit"
        className="block w-full rounded-md bg-indigo-600 px-3 py-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 "
      >
        Salvar
      </button>
    </form>
  );
}
