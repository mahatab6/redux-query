import React from "react";
import { useGetProductsQuery } from "../../services/productsApi";
import Loading from "../../page/Loading";
import ErrorPage from "../../page/ErrorPage";

export default function ProductView() {
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
      {data?.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
        >
          <h2 className="text-lg font-semibold mb-2  text-black">
            {item.title}
          </h2>
          <p className="text-sm text-gray-600 flex-1 ">
            {item.description}
          </p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
