import { useEffect, useState } from "react";
import Table from "../../components/Table";
import PrimaryButton from "../../components/PrimaryButton";
import Modal from "../../components/Modal";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import { Toast } from "../../components/Toast";

interface Niveis {
  id: number;
  nivel: string;
  totalDesenvolvedores: number;
}

export default function Niveis() {
  const navigate = useNavigate();

  const [niveis, setNiveis] = useState<Niveis[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const [nivelToDelete, setNivelToDelete] = useState<Niveis | null>(null);

  const perPage = 10;

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalDeleteOpen(false);
    deleteNivel();
  };

  const handleClose = () => {
    setIsModalDeleteOpen(false);
  };

  const handleEdit = (id: number) => {
    navigate(`/niveis/${id}`);
  };

  const handleDelete = (id: number) => {
    const nivel = niveis.find((item) => item.id === id);
    if (nivel) {
      setNivelToDelete(nivel);
      setIsModalDeleteOpen(true);
    }
  };

  const deleteNivel = async () => {
    try {
      await api.delete(`/niveis/${nivelToDelete?.id}`);
      setIsModalDeleteOpen(false);
      Toast("success", `${nivelToDelete?.nivel} removido com sucesso!`);
      if (nivelToDelete) {
        setNiveis((prev) =>
          prev.filter((nivel) => nivel.id !== nivelToDelete.id)
        );
      }
    } catch (error) {
      const messsage = formatErrorMessage(error);
      Toast("error", messsage);
    }
  };

  async function getNiveis(pagina: number) {
    if (loading || (totalPaginas && pagina > totalPaginas)) return;
    setLoading(true);

    try {
      const response = await api.get("/niveis", {
        params: {
          page: paginaAtual,
          perPage: perPage,
        },
      });
      const { data, meta } = response.data;
      setNiveis(data.niveis);
      setTotalPaginas(meta.last_page);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    } finally {
      setLoading(false);
    }
  }

  function handlePrevPage() {
    if (paginaAtual > 1) {
      setPaginaAtual((prev) => prev - 1);
    }
  }

  function handleNextPage() {
    if (totalPaginas === null || paginaAtual < totalPaginas) {
      setPaginaAtual((prev) => prev + 1);
    }
  }

  useEffect(() => {
    getNiveis(paginaAtual);
  }, [paginaAtual]);

  return (
    <div className="p-6">
      <div className="flex flex-row w-full my-2 justify-between">
        <h1 className="text-2xl font-semibold text-neutral-100">Niveis</h1>
        <div className="w-1/6">
          <PrimaryButton
            onClick={() => {
              navigate("/niveis/add");
            }}
            text="Adicionar nivel"
          />
        </div>
      </div>
      <Table
        columns={["Id", "Nome", "Total de Desenvolvedores"]}
        data={
          niveis.length >= 1 &&
          niveis.map((nivel) => ({
            id: nivel.id,
            nome: nivel.nivel,
            totalDesenvolvedores: nivel.totalDesenvolvedores,
          }))
        }
        onEdit={handleEdit}
        onDelete={handleDelete}
        isPagination={true}
        currentPage={paginaAtual}
        onHandleNextPage={handleNextPage}
        onHandlePrevPage={handlePrevPage}
        totalPages={totalPaginas}
      />

      <Modal
        isOpen={isModalDeleteOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message={`Você tem certeza que deseja remover este nível ${nivelToDelete?.nivel}?`}
      />
    </div>
  );
}
