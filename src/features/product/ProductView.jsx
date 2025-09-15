import React, { useState } from "react";
import {
  useDeleteProductsMutation,
  useGetProductsQuery,
} from "../../services/productsApi";
import Loading from "../../page/Loading";
import ErrorPage from "../../page/ErrorPage";
import ProductsForm from "./ProductsForm";
import ProductEdit from "./ProductEdit";

export default function ProductView() {
  const { data, isLoading, isError } = useGetProductsQuery();

  const [deleteProducts] = useDeleteProductsMutation();

  const [modalData, setModalData] = useState("");

  const closeMode = () =>{
    document.getElementById('my_modal_5').close()
  }

  const handleEdit = (item) => {
   setModalData(item);
    document.getElementById('my_modal_5').showModal()
  };

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
            <p className="text-sm text-gray-600 flex-1 ">{item.category}</p>
            <p className="text-sm text-gray-600 flex-1 ">{item.description}</p>
            <div className="flex gap-5">
              <button
                onClick={() => handleEdit(item)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProducts(item.id)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <ProductsForm />
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit from</h3>
          <ProductEdit modalData={modalData} oncloseMode={closeMode}/>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
