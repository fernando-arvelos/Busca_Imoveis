const Pagination = ({ currentPage, totalPages, goToNextPage, goToPreviousPage, setCurrentPage }) => {
  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`py-2 px-4 rounded-full ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`py-2 px-4 rounded-full ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`py-2 px-4 rounded-full ${currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
