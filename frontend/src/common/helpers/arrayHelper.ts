import { ITrigger } from '../models/query/ITrigger';

export const deepArray = (arr1: Array<ITrigger>, arr2: [...Array<ITrigger>, ...Array<ITrigger>]):boolean => arr1.every(
  element => arr2.includes(element)
)
      && arr2.every(
        element => arr1.includes(element)
      );
