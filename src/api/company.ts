import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery, handleFetchError } from '../redux/api';

export const apiConfig = {
    company: '/company',
};

// RTK Query
export const companyApi = createApi({
    reducerPath: 'companyApi',
    baseQuery: fetchBaseQuery(),
    tagTypes: ['company'],
    keepUnusedDataFor: 10,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getAllCompany: builder.query<any, any>({
            onQueryStarted: (arg, api) => {
                handleFetchError(api);
            },
            query: (params) => ({
                params,
                url: apiConfig.company,
            }),
            transformResponse: (response: any) => {
                return response;
            },
            providesTags: ['company'],
        }),
        getDetailCompany: builder.query<any, number>({
            onQueryStarted: (arg, api) => {
                handleFetchError(api);
            },
            query(id) {
                return {
                    url: `${apiConfig.company}/${id}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: any) => {
                return response[0];
            },
            providesTags: ['company'],
        }),
        createCompany: builder.mutation<string[], any>({
            onQueryStarted: (arg, api: any) => {
                handleFetchError(api);
            },
            query(body) {
                return {
                    url: `${apiConfig.company}`,
                    body,
                    method: 'POST',
                };
            },
            transformResponse: (response: any) => {
                return response;
            },
            invalidatesTags: ['company'],
        }),
        updateCompany: builder.mutation<string[], any>({
            onQueryStarted: (arg, api: any) => {
                handleFetchError(api);
            },
            query(payload) {
                const { id, body } = payload;
                return {
                    url: `${apiConfig.company}/${id}`,
                    body,
                    method: 'PUT',
                };
            },
            transformResponse: (response: any) => {
                return response;
            },
            invalidatesTags: ['company'],
        }),
        deleteCompany: builder.mutation<string[], any>({
            onQueryStarted: (arg, api: any) => {
                handleFetchError(api);
            },
            query(id) {
                return {
                    url: `${apiConfig.company}/${id}`,
                    method: 'DELETE',
                };
            },
            transformResponse: (response: any) => {
                return response;
            },
            invalidatesTags: ['company'],
        }),
    }),
});

export const {
    useGetAllCompanyQuery,
    useCreateCompanyMutation,
    useUpdateCompanyMutation,
    useGetDetailCompanyQuery,
    useDeleteCompanyMutation,
} = companyApi;
