import { URLSearchParamsInit } from 'react-router-dom';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig } from 'axios';

export const axiosBaseQuery = (baseUrl = ''): BaseQueryFn<{
    url: string,
    params?: AxiosRequestConfig['params'],
}> => async ({url, params}) => await axios.get(
    url,
    {
        ...params,
        withCredentials: false,
    },
);

export const addParams = (
    oldParams: URLSearchParams,
    newParams: Array<{ name: string, value: string }>,
    paramsSetter: (nextInit: URLSearchParamsInit) => void,
): void => {
    newParams.forEach((param) => oldParams.set(param.name, param.value))
    paramsSetter(oldParams);
};
