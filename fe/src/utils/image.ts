import {API_URI_IMAGE} from '@/constants';

export const getImgSource = (url: string): string => {
  return `${API_URI_IMAGE}/${url}`;
};
