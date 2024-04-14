import {BASE_URL} from '@/constants';
import axios from 'axios';

const httpRequest = axios.create({
  baseURL: BASE_URL,
});

export default httpRequest;
