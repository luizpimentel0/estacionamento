import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";

async function fetchOwnersList() {
  const response = await axios.get(`${BASE_URL}/proprietario/list`);
  return response.data;
}

export const VehicleForm = ({ vehicle, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    owner_id: "",
    plate: "",
    year: "",
    monthly_fee: "",
  });

  const [owners, setOwners] = useState([]);

  useEffect(() => {
    (async function fetch() {
      const data = await fetchOwnersList();

      setOwners(() => data.map((owner) => owner));
    })();
  }, []);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        id: vehicle.id,
        name: vehicle.owner_name,
        plate: vehicle.plate,
        year: vehicle.year,
        monthly_fee: vehicle.monthly_fee,
      });
    }
  }, [vehicle]);

  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const vehicleToSubmit = {
        ...formData,
      };

      await onSave(vehicleToSubmit);
      onClose();
    } catch (error) {
      console.error(error);
      setSubmitStatus({
        success: false,
        message: "Erro ao salvar o veículo. Tente novamente.",
      });
    }
  };

  const title = vehicle?.id ? "Edição de veículo" : "Cadastro de veículo";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fk_owner"
            className="block text-gray-700 font-bold mb-2"
          >
            Proprietário
          </label>
          <select
            type="text"
            id="fk_owner"
            name="fk_owner"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Selecione um proprietário</option>
            {owners.map((owner, index) => (
              <option key={`owner-${index}`} value={owner.owner_id}>
                {owner.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="plate" className="block text-gray-700 font-bold mb-2">
            Placa
          </label>
          <input
            type="text"
            id="plate"
            name="plate"
            value={formData.plate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="000-000"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="monthly_fee"
            className="block text-gray-700 font-bold mb-2"
          >
            Mensalidade
          </label>
          <input
            type="text"
            id="monthly_fee"
            name="monthly_fee"
            value={formData.monthly_fee}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="300,00"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700 font-bold mb-2">
            Ano
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Digite o ano do veículo"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Salvar
        </button>

        {submitStatus.success !== null && (
          <div
            className={`mt-4 p-3 rounded-md text-center ${
              submitStatus.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </form>
    </div>
  );
};
