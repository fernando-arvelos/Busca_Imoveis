import React from "react";

const AboutPage = () => {
  return (
    <div>
      <header className="bg-blue-800 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Sobre Nós</h1>
          <p className="text-lg mt-2">
            Bem-vindo ao Busca Imóveis: Seu portal para encontrar o lar perfeito!
          </p>
        </div>
      </header>
      <main className="container mx-auto py-12 px-4">
        <section className="text-center mb-12">
          <p className="text-gray-700 leading-relaxed">
            No Busca Imóveis, acreditamos que encontrar o imóvel ideal deve ser
            uma experiência simples, prática e acessível. Nosso propósito é
            conectar pessoas ao seu próximo lar ou investimento, reunindo em um
            único lugar as melhores oportunidades de imóveis disponíveis nos
            principais bancos de Portugal.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Por que o Busca Imóveis?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Comprar um imóvel pode ser uma tarefa desafiadora, mas nós
              facilitamos esse processo ao reunir:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>Imóveis direto da banca:</strong> Todas as propriedades
                listadas no Busca Imóveis são provenientes dos principais bancos
                de Portugal.
              </li>
              <li>
                <strong>Diversidade de opções:</strong> Oferecemos uma ampla
                variedade de imóveis para atender às suas necessidades.
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://via.placeholder.com/400"
              alt="Busca Imóveis"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            Nosso compromisso
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            No Busca Imóveis, estamos comprometidos em oferecer uma plataforma
            confiável e eficiente que coloca o cliente em primeiro lugar.
            Trabalhamos para ajudar você a encontrar o imóvel certo, economizar
            tempo e aproveitar os benefícios exclusivos de comprar diretamente
            da banca.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
