export type LoginData = {
  email: string;
  password: string;
};
export type LoginResponse = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  token: string;
};

export type SignUpData = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
};
