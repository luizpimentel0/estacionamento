import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { ListTable } from "../ListTable";
import { Modal } from "../Modal";
import { VehicleForm } from "./components/VehiclesForm";

const columns = [
  {
    key: "owner_name",
    header: "Proprietário",
  },
  {
    key: "plate",
    header: "Placa",
  },
  {
    key: "year",
    header: "Ano",
  },
  {
    key: "monthly_fee",
    header: "Mensalidade",
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

export const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState({
    id: "",
    plate: "",
    year: "",
    monthly_fee: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/veiculos`);

      setVehicles(
        result.data.map(
          ({
            vehicle_id,
            owner,
            plate,
            year,
            monthly_fee,
            createdAt,
            updatedAt,
          }) => {
            return {
              id: vehicle_id,
              owner_name: owner.name,
              plate,
              year,
              monthly_fee,
              createdAt: new Date(createdAt).toLocaleDateString(),
              updatedAt: new Date(updatedAt).toLocaleDateString(),
            };
          },
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewVehicle = () => {
    setCurrentVehicle(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = ({ id, owner_name, plate, year, monthly_fee }) => {
    setCurrentVehicle({ id, owner_name, plate, year, monthly_fee });
    setIsModalOpen(true);
  };

  const handleSaveVehicle = async (vehicleData) => {
    try {
      const id = vehicleData.id;
      const url = id ? `${BASE_URL}/veiculos/${id}` : `${BASE_URL}/veiculos`;

      const method = vehicleData.id ? "put" : "post";

      console.log(vehicleData);

      const response = await axios[method](url, vehicleData);

      if (response.status === 200 || response.status === 201)
        await fetchVehicles();
    } catch (error) {
      console.error("Ocorreu um erro na operação;", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/veiculos/${id}`);

      if (response.status === 200) {
        setVehicles(vehicles.filter((vehicles) => vehicles.id !== id));
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
            Listando veículos
          </h1>
          <button
            className="bg-green-400 p-3 rounded-lg hover:bg-green-500 transition-colors duration-100 ease-in"
            onClick={() => handleNewVehicle()}
          >
            Adicionar novo veículo
          </button>
        </div>
        <ListTable
          data={vehicles}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <VehicleForm
          vehicle={currentVehicle}
          onSave={handleSaveVehicle}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};
