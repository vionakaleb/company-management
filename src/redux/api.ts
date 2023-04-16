import { QueryLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    fetchBaseQuery as rtkFetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const fetchBaseQuery: typeof rtkFetchBaseQuery = (options) => {
    let baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

    return rtkFetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders(headers) {
            // Note: Authorization to be implemented later
            // const authToken = '';
            // if (authToken) {
            //     headers.set('Authorization', authToken);
            // }
        },
        ...options,
    });
};

export const handleFetchError = (
    api: QueryLifecycleApi<
        unknown,
        BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
        unknown,
        string
    >,
) => {
    api.queryFulfilled.catch((err: any) => {
        if (err.error) {
            const isSuccess = ![400, 401].includes(err.error.originalStatus);
            if (isSuccess && err.error.data) {
                alert(err.error.data);
            } else {
                alert(`Error: ${err.error.originalStatus || 'Not connected to API.'}`);
            }
        }
    });
};
