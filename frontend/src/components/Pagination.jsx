
const Pagination = ({ currentPage, totalPages, goToNextPage, goToPreviousPage, setCurrentPage }) => {
  
  const maxPagesToShow = window.innerWidth < 600 ? 3 : 5;

  // intervalo de paginas pra exibir
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 md:space-x-4 mt-6 border-2 border-red-700">
      {/* botão da primeira página */}
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className={`py-2 px-4 rounded-full bg-gray-200`}
      >
        &lt;&lt;
      </button>
      {/* botão da página anterior */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`py-2 px-4 rounded-full bg-gray-200`}
      >
        &lt;
      </button>
      {/* botões de páginas */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`py-2 px-4 rounded-full ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          {pageNumber}
        </button>
      ))}

      {/* botão da próxima página */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`py-2 px-4 rounded-full bg-gray-200`}
      >
        &gt;
      </button>

      {/* botão da última página */}
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className={`py-2 px-4 rounded-full bg-gray-200`}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
