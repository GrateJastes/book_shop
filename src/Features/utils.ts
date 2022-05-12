import { URLSearchParamsInit } from 'react-router-dom';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig } from 'axios';

export const axiosBaseQuery = (baseUrl = ''): BaseQueryFn<{
    url: string,
    method?: string,
    data?: any,
    params?: AxiosRequestConfig['params'],
}> => async ({url, params, data, method}) => await axios({
    url,
    params,
    method: method || 'GET',
    data,
});

export const addParams = (
    oldParams: URLSearchParams,
    newParams: Array<{ name: string, value: string }>,
    paramsSetter: (nextInit: URLSearchParamsInit) => void,
): void => {
    newParams.forEach((param) => oldParams.set(param.name, param.value))
    paramsSetter(oldParams);
};
