import { apiRequest } from '../api/api';
import type { Camera } from '../types/camera.interface';

export async function getCameras(): Promise<Camera[]> {
  const response = await apiRequest<{ data: Camera[] }>('/cameras');
  return response.data;
}
