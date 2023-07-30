const PlansPage = () => {
  return (
    <div className="sm:w-full sm:h-full md:w-screen md:h-screen md:flex md:justify-center md:items-center lg:px-20">
      <section className="p-8 bg-slate-800 md:rounded-lg shadow-md shadow-slate-900 ">
        <h1 className="text-2xl font-semibold mb-4">Escolha o seu plano</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 p-6 rounded-lg h-96 ">
            <h2 className="text-xl font-semibold mb-4 text-yellow-600">
              Plano Básico
            </h2>
            <p className="text-gray-600 max-h-3/5 h-3/5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              laboriosam quos suscipit explicabo nesciunt id.
            </p>
            <div>
              <p className="text-yellow-600 font-semibold mt-4">R$ 19,99/mês</p>
              <button className="w-full mt-4 bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-yellow-600">
                Escolher
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg h-96">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Plano Padrão
            </h2>
            <p className="text-gray-600 max-h-3/5 h-3/5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestias, quas quidem aliquam quae nam aliquid, repellat deleniti
              et maxime dolore placeat praesentium doloremque iusto?
            </p>
            <div>
              <p className="text-blue-600 font-semibold mt-4">R$ 39,99/mês</p>
              <button className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600">
                Escolher
              </button>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg h-96">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Plano Premium
            </h2>
            <p className="text-gray-600 max-h-3/5 h-3/5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
              nostrum.
            </p>
            <div>
              <p className="text-green-600 font-semibold mt-4">R$ 79,99/mês</p>
              <button className="w-full mt-4 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600">
                Escolher
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { PlansPage };
