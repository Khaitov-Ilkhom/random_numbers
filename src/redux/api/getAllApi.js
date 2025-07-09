import {api} from "./index.js";

const apis = api.injectEndpoints({
  endpoints: (build) => ({
    getTrivia: build.query({
      query: ({numbers, category}) => ({
        url: `/${numbers}${category}`,
      }),
      providesTags: ["DATA"]
    })
  })
})

export const {useGetTriviaQuery} = apis