import axios from 'axios';
import { Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';

export const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

export const findById = async (id: string) => {
  const { data } = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${id}`);
  return data;
};

export default { getAll, findById };
