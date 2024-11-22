import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4 mt-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-between items-center flex-col md:flex-row">
          <p>Desenvolvido por Busca Imóveis</p>
          <p className="my-2 md:my-0">Contacto: <a href="mailto:contacto@buscaimoveis.pt" className="text-blue-400">contacto@buscaimoveis.pt</a></p>
        </div>
        
        <p className="text-gray-400 text-sm md:mt-2">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
