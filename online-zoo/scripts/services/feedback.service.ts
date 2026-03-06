import { apiRequest } from '../api/api';
import type { Feedback } from '../types/feedback.interface';
import type { ApiResponse } from '../types/api-response.interface';

export async function getFeedback(): Promise<Feedback[]> {
  const response = await apiRequest<ApiResponse<Feedback[]>>('/feedback');
  return response.data;
}