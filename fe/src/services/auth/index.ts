import apiV1 from '@/configs/api.config';
import {LoginData, LoginResponse, SignUpData} from './types';

const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await apiV1.post('/users/login', data);
    return response.data.data as LoginResponse;
  } catch (error) {
    console.error(error);
    throw new Error('Wrong email or password');
  }
};

const signUp = async (data: SignUpData): Promise<boolean> => {
  try {
    await apiV1.post('/users/register', data);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error('Register Failed');
  }
};

export {login, signUp};
