import { AUTH_API_MODE } from '../config';
import { apiAuthService } from './api/apiAuthService';
import { demoAuthService } from './demo/demoAuthService';
import { AuthService } from './types';

export function getAuthService(): AuthService {
  if (AUTH_API_MODE === 'demo') {
    return demoAuthService;
  }

  return apiAuthService;
}
