import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_KEY = process.env.REACT_APP_SERVICE_KEY;
const APP_ID = process.env.REACT_APP_API_ID;

// mutation -> post, put, delete
// 여기서는 검색 쿼리와 상태 기반으로 레시피를 가져와야 하기때문에 mutation 사용
export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.edamam.com/" }),
  endpoints: (builder) => ({
    getRecipes: builder.mutation({
      query: ({ query, health }) => {
        return {
          url: `search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&&health=${health}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetRecipesMutation } = recipeApi;
