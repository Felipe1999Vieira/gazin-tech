import { useEffect, useState } from "react";
import Table from "../../components/Table";
import PrimaryButton from "../../components/PrimaryButton";
import Modal from "../../components/Modal";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import { Toast } from "../../components/Toast";

interface Desenvolvedor {
  id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  hobby: string;
  nivel: {
    id: 1;
    nivel: string;
  };
}

export default function Desenvolvedores() {
  const navigate = useNavigate();

  const [desenvolvedores, setDesenvolvedores] = useState<Desenvolvedor[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const [devToDelete, setDevToDelete] = useState<Desenvolvedor | null>(null);

  const perPage = 10;

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleConfirmDelete = () => {
    setIsModalDeleteOpen(false);
    deleteDesenvolvedor();
  };

  const handleClose = () => {
    setIsModalDeleteOpen(false);
  };

  const handleEdit = (id: number) => {
    navigate(`/desenvolvedores/${id}`);
  };

  const handleDelete = (id: number) => {
    const dev = desenvolvedores.find((item) => item.id === id);
    if (dev) {
      setDevToDelete(dev);
      setIsModalDeleteOpen(true);
    }
  };

  const deleteDesenvolvedor = async () => {
    try {
      await api.delete(`/desenvolvedores/${devToDelete?.id}`);
      setIsModalDeleteOpen(false);
      Toast("success", `${devToDelete?.nome} removido com sucesso!`);
      if (devToDelete) {
        setDesenvolvedores((prev) =>
          prev.filter((dev) => dev.id !== devToDelete.id)
        );
      }
    } catch (error) {
      const messsage = formatErrorMessage(error);
      Toast("error", messsage);
    }
  };

  async function getDesenvolvedores(pagina: number) {
    if (loading || (totalPaginas && pagina > totalPaginas)) return;
    setLoading(true);

    try {
      const response = await api.get("/desenvolvedores", {
        params: {
          page: paginaAtual,
          perPage: perPage,
        },
      });
      const { data, meta } = response.data;
      setDesenvolvedores(data.desenvolvedores);
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
    getDesenvolvedores(paginaAtual);
  }, [paginaAtual]);

  return (
    <div className="p-6">
      <div className="flex flex-row w-full my-2 justify-between">
        <h1 className="text-2xl font-semibold text-neutral-100">
          Desenvolvedores
        </h1>
        <div className="w-1/6">
          <PrimaryButton
            onClick={() => {
              navigate("/desenvolvedores/add");
            }}
            text="Adicionar desenvolvedor"
          />
        </div>
      </div>
      <Table
        columns={["Id", "Nome", "Sexo", "Data Nascimento", "Hobby", "Nível"]}
        data={
          desenvolvedores.length >= 1 &&
          desenvolvedores.map((dev) => ({
            id: dev.id,
            nome: dev.nome,
            sexo: dev.sexo === "M" ? "Masculino" : "Feminino",
            data_nascimento: new Date(dev.data_nascimento).toLocaleDateString(
              "pt-BR"
            ),
            hobby: dev.hobby,
            nivel: dev.nivel.nivel,
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
        onConfirm={handleConfirmDelete}
        message={`Você tem certeza que deseja remover o desenvolvedor ${devToDelete?.nome}?`}
      />
    </div>
  );
}
