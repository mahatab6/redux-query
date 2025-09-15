import React from "react";
import { useDeleteProductsMutation, useGetProductsQuery } from "../../services/productsApi";
import Loading from "../../page/Loading";
import ErrorPage from "../../page/ErrorPage";
import ProductsForm from "./ProductsForm";

export default function ProductView() {
  const { data, isLoading, isError } = useGetProductsQuery();

  const [deleteProducts] = useDeleteProductsMutation();
  

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
   <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
      {data?.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
        >
          <h2 className="text-lg font-semibold mb-2  text-black">
            {item.title}
          </h2>
          <h3 className="text-lg font-semibold mb-2  text-black">
            {item.price}
          </h3>
          <p className="text-sm text-gray-600 flex-1 ">
            {item.category}
          </p>
          <p className="text-sm text-gray-600 flex-1 ">
            {item.description}
          </p>
          <button onClick={() => deleteProducts(item.id) } className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Delete
          </button>
        </div>
      ))}
    </div>

    <div>
        <ProductsForm/>
    </div>
   </>
  );
}
