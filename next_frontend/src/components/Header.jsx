import React from "react";
import Link from "next/link";

const Header = () => {

  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">Busca Imóveis</Link>

      <nav className="flex items-center space-x-6">
      <Link href="/favorites" className="text-gray-700 hover:text-blue-600">Favoritos</Link>
      <Link href="/about" className="text-gray-700 hover:text-blue-600">Sobre Nós</Link>
      </nav>
    </header>
  );
};

export default Header;
