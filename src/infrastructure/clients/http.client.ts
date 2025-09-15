import axios from 'axios';

export const HttpClient = (BaseURL: string) => axios.create({
  baseURL: BaseURL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
  }
});

export const Cancel = axios.Cancel;
