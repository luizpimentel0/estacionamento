import { useEffect, useState } from "react";

export const OwnerForm = ({ owner, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
  });

  useEffect(() => {
    if (owner) {
      setFormData({
        id: owner.id,
        name: owner.name,
        cpf: owner.cpf,
      });
    }
  }, [owner]);

  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const formattedValue =
      name === "cpf"
        ? value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .slice(0, 14)
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ownerToSubmit = {
        ...formData,
        cpf: formData.cpf.replace(/[^\d]/g, ""),
      };

      await onSave(ownerToSubmit);
      onClose();
    } catch (error) {
      console.error(error);
      setSubmitStatus({
        success: false,
        message: "Erro ao salvar o proprietário. Tente novamente.",
      });
    }
  };

  const title = owner?.id
    ? "Edição de proprietário"
    : "Cadastro de proprietário";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Digite o nome completo"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cpf" className="block text-gray-700 font-bold mb-2">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="000.000.000-00"
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
