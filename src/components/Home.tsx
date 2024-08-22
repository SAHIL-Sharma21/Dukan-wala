import { useState } from "react";
import useCart from "../hooks/useCart";

const Home: React.FC = () => {
  const { items, loading, error, addItemToCart } = useCart();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage: number = 16;

  const totalPage = Math.ceil(items?.length! / itemPerPage);

  const currentItems = items?.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return (
      <span className="loading loading-spinner text-error loading-lg"></span>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-white">{error}</span>
      </div>
    );
  }

  return (
    <>
      <main className="p-6 max-w-7xl mx-auto">
        <section className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-white">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Explore our wide range of products and add them to your cart.
          </p>
        </section>

        {items && items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentItems?.map((item) => (
                <div
                  key={item.id}
                  className="card bg-base-300 shadow-md rounded-lg"
                >
                  <figure className="px-4 pt-4">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h3 className="card-title text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 mt-2">
                      {item.description.length > 100
                        ? `${item.description.slice(0, 100)}... `
                        : item.description}
                      {item.description.length > 100 && (
                        <a href="#" className="text-gray-500">
                          more+1
                        </a>
                      )}
                    </p>
                    <div className="card-actions justify-between items-center mt-4">
                      <p className="font-bold text-lg text-secondary">
                        ${item.price}
                      </p>
                      <button
                        className="btn btn-primary cursor-pointer"
                        onClick={() => addItemToCart(item)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="btn btn-outline mr-4"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPage}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-lg font-medium text-center text-gray-600">
            No Items Available
          </p>
        )}
      </main>
    </>
  );
};

export default Home;
