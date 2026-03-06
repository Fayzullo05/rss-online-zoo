import { apiRequest } from '../api/api';
import type { Pet } from '../types/pets.interface';
import type { ApiResponse } from '../types/api-response.interface';

export async function getPets(): Promise<Pet[]> {
  const response = await apiRequest<ApiResponse<Pet[]>>('/pets');
  return response.data;
}

export async function getPetById(id: number): Promise<Pet> {
  const response = await apiRequest<ApiResponse<Pet>>(`/pets/${id}`);
  return response.data;
}