import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery, handleFetchError } from '../redux/api';

export const apiConfig = {
    office: '/office',
};

// RTK Query
export const officeApi = createApi({
    reducerPath: 'officeApi',
    baseQuery: fetchBaseQuery(),
    tagTypes: ['office'],
    keepUnusedDataFor: 10,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getAllOffice: builder.query<any, any>({
            onQueryStarted: (arg, api) => {
                handleFetchError(api);
            },
            query(id) {
                return {
                    url: `${apiConfig.office}/company/${id}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: any) => {
                return response;
            },
            providesTags: ['office'],
        }),
        getDetailOffice: builder.query<any, number>({
            onQueryStarted: (arg, api) => {
                handleFetchError(api);
            },
            query(id) {
                return {
                    url: `${apiConfig.office}/${id}`,
                    method: 'GET',
                };
            },
            transformResponse: (response: any) => {
                return response[0];
            },
            providesTags: ['office'],
        }),
        createOffice: builder.mutation<string[], any>({
            onQueryStarted: (arg, api: any) => {
                handleFetchError(api);
            },
            query(body) {
                return {
                    url: `${apiConfig.office}`,
                    body,
                    method: 'POST',
                };
            },
            transformResponse: (response: any) => {
                return response;
            },
            invalidatesTags: ['office'],
        }),
        updateOffice: builder.mutation<string[], any>({
            onQueryStarted: (arg, api: any) => {
                handleFetchError(api);
            },
            query(payload) {
                const { id, body } = payload;
                return {
                    url: `${apiConfig.office}/${id}`,
                    body,
                    method: 'PUT',
                };
            },
            transformResponse: (response: any) => {
                return response;
            },
            invalidatesTags: ['office'],
        }),
        deleteOffice: builder.mutation<string[], any>({
            onQueryStarted: (arg, api: any) => {
                handleFetchError(api);
            },
            query(id) {
                return {
                    url: `${apiConfig.office}/${id}`,
                    method: 'DELETE',
                };
            },
            transformResponse: (response: any) => {
                return response;
            },
            invalidatesTags: ['office'],
        }),
    }),
});

export const {
    useGetAllOfficeQuery,
    useCreateOfficeMutation,
    useUpdateOfficeMutation,
    useGetDetailOfficeQuery,
    useDeleteOfficeMutation,
} = officeApi;
