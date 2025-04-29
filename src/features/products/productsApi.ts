import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  reviews?: string[]; // added reviews field
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
    }),
    updateProduct: builder.mutation<Product, { id: number; body: Partial<Product> }>({
      query: ({ id, body }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductByIdQuery, 
  useGetCategoriesQuery, 
  useUpdateProductMutation 
} = productsApi;