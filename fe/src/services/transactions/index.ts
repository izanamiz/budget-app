import apiV1 from '@/configs/api.config';
import {TransactionRequest, TransactionResponse} from './types';

const createTransaction = async (
  data: TransactionRequest,
): Promise<TransactionResponse> => {
  try {
    const response = await apiV1.post('/transaction', data);
    return response.data.data as TransactionResponse;
  } catch (error) {
    console.error(error);
    throw new Error('Wrong email or password');
  }
};

export {createTransaction};
