import apiV1 from '@/configs/api.config';
import {CategoryResponse, TypeENUM} from './types';

const getAllCategories = async (
  type?: TypeENUM,
): Promise<CategoryResponse[]> => {
  try {
    const endpoint = '/categories' + (type ? `?type=${type}` : '');
    const res = await apiV1.get(endpoint);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Get all categories failed');
  }
};

export {getAllCategories};
