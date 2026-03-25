import { apiRequest } from '../api/api';
import type { Pet } from '../types/pets.interface';
import type { ApiResponse } from '../types/api-response.interface';
import type { PetDetails } from '../types/pet-details.interface';

export async function getPets(): Promise<Pet[]> {
  const response = await apiRequest<ApiResponse<Pet[]>>('/pets');
  return response.data;
}

export async function getPetById(id: number): Promise<PetDetails> {
  const response = await apiRequest<ApiResponse<PetDetails>>(`/pets/${id}`);
  return response.data;
}
