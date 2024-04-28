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
    throw new Error('create transaction failed');
  }
};

const getAllTransactions = async (): Promise<TransactionResponse[]> => {
  try {
    const response = await apiV1.get('/transaction');
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('get all transactions failed');
  }
};

export {createTransaction, getAllTransactions};
