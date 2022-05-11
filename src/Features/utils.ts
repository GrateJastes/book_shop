import { URLSearchParamsInit } from 'react-router-dom';

export const addParams = (
    oldParams: URLSearchParams,
    newParams: Array<{ name: string, value: string }>,
    paramsSetter: (nextInit: URLSearchParamsInit) => void,
): void => {
    newParams.forEach((param) => oldParams.set(param.name, param.value))
    paramsSetter(oldParams);
};
