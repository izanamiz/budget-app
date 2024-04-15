import apiV1 from '@/configs/api.config';
import {CategoryResponse, TypeENUM} from './types';

const getAllCategories = async (): Promise<CategoryResponse[]> => {
  try {
    const endpoint = '/categories';
    const res = await apiV1.get(endpoint);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Get all categories failed');
  }
};

const getAllCategoriesByType = async (
  type: TypeENUM,
): Promise<CategoryResponse[]> => {
  try {
    const endpoint = `/categories?type=${type}`;
    const res = await apiV1.get(endpoint);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Get all categories failed');
  }
};

export {getAllCategories, getAllCategoriesByType};
