import parkingLot from "../../assets/images/parking-lot.jpg";

export const Home = () => {
  return (
    <main>
      <section className="mt-8 relative overflow-hidden h-80 rounded-lg">
        <picture className="hover:object-scale-down cursor-pointer">
          <img src={parkingLot} alt="estacionamento" />
        </picture>

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-3xl font-bold mb-4">
              Bem-vindo ao gerenciador de estaciomento
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Seguro, protegido, e conveniente para todas as suas necessidades.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
