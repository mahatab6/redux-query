import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProductsMutation } from "../../services/productsApi";

export default function ProductEdit({ modalData ,oncloseMode }) {

    const [updateProducts] = useUpdateProductsMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 
  useEffect(() => {
    if (modalData) {
      reset({
        title: modalData.title,
        price: modalData.price,
        category: modalData.category,
      });
    }
  }, [modalData, reset]);

  const onSubmit = (data) => {
    const updatedProduct = {
      ...modalData,
      title: data.title,
      price: Number(data.price),
      category: data.category,
    };
    oncloseMode()
   updateProducts({id:updatedProduct.id, product: updatedProduct});
  };

  if (!modalData) return null; 

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* title */}
        <input
          type="text"
          placeholder="Product title"
          {...register("title", { required: "title is required" })}
          className="input input-bordered w-full"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: "Price is required", min: 1 })}
          className="input input-bordered w-full"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          {...register("category", { required: "Category is required" })}
          className="input input-bordered w-full"
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

        {/* Submit */}
        <button type="submit" className="btn btn-primary mt-2">
          Update Product
        </button>
      </form>
    </div>
  );
}