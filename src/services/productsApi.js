import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productAPI = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes:["products"],

    endpoints: (builder) => ({

        getProducts: builder.query({
            query: () => 'products',
            providesTags:["products"]
        }),

        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:["products"]
        }),
    })
})


export const { useGetProductsQuery, useDeleteProductsMutation } = productAPI;