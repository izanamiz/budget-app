import {API_URI_V1} from '@/constants';
import axios from 'axios';

const apiV1 = axios.create({
  baseURL: API_URI_V1,
});

export default apiV1;
