import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath : "api",
    baseQuery : fetchBaseQuery({ baseUrl : "https://ecommerce-backend-2pvg.onrender.com/api/v1", credentials : "include" }),
    endpoints : (builder) => ({

        register : builder.mutation({
            query : (payload) => ({
                url : "/users/register",
                method : "POST",
                body : payload
            })
        }),

        login : builder.mutation({
            query : (payload) => ({
                url : "/users/login",
                method : "POST",
                body : payload
            })
        }),

        updateUser : builder.mutation({
            query : (payload) => ({
                url : "/users/update",
                method : "PUT",
                body : payload
            })
        }),

        getAllProduct : builder.query({
            query : (queryVal) => ({
                url : `/products${queryVal ? `?&minPrice=${queryVal?.minPrice}&maxPrice=${queryVal?.maxPrice}&title=${queryVal?.title ? queryVal?.title : ""}` : "?"}`,
                method : "GET"
            })
        }),

        getSingleProduct : builder.query({
            query : (id) => ({
                url : `/products/${id}`,
                method : "GET"
            })
        }),

    })
});


export const { useRegisterMutation, useLoginMutation, useGetAllProductQuery, useGetSingleProductQuery, useUpdateUserMutation } = apiSlice;
