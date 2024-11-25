import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../Modal";
import { OwnerForm } from "./components/OwnerForm";
import { ListTable } from "../ListTable";
import { BASE_URL } from "../../utils/constants";

const columns = [
  {
    key: "name",
    header: "Nome",
  },
  {
    key: "cpf",
    header: "CPF",
  },
  {
    key: "createdAt",
    header: "Criado em:",
  },
  {
    key: "updatedAt",
    header: "Atualizado em:",
  },
  {
    key: "actions",
    header: "Ações",
  },
];

export const Owner = () => {
  const [owners, setOwners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOwner, setCurrentOwner] = useState({
    id: "",
    name: "",
    cpf: "",
  });

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/proprietario`);

      setOwners(
        result.data.map(({ owner_id, name, cpf, createdAt, updatedAt }) => {
          return {
            id: owner_id,
            name,
            cpf,
            createdAt: new Date(createdAt).toLocaleDateString(),
            updatedAt: new Date(updatedAt).toLocaleDateString(),
          };
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewOwner = () => {
    setCurrentOwner(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = ({ id, name, cpf }) => {
    setCurrentOwner({ id, name, cpf });
    setIsModalOpen(true);
  };

  const handleSaveOwner = async (ownerData) => {
    try {
      const url = ownerData.id
        ? `${BASE_URL}/proprietario/${ownerData.id}`
        : `${BASE_URL}/proprietario`;

      const method = ownerData.id ? "put" : "post";

      const response = await axios[method](url, ownerData);

      if (response.status === 200 || response.status === 201)
        await fetchOwners();
    } catch (error) {
      console.error("Ocorreu um erro na operação;", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/proprietario/${id}`);

      if (response.status === 200) {
        setOwners(owners.filter((owner) => owner.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl antialiased font-bold py-4 text-neutral-200">
            Listando proprietários
          </h1>
          <button
            className="bg-green-400 p-3 rounded-lg hover:bg-green-500 transition-colors duration-100 ease-in"
            onClick={() => handleNewOwner()}
          >
            Adicionar novo proprietário
          </button>
        </div>
        <ListTable
          data={owners}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OwnerForm
          owner={currentOwner}
          onSave={handleSaveOwner}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};
