import { useAuth } from './AuthContext';
import { AuthSuccessResponse } from '../api/types';

export function useCompleteAuthLogin() {
  const { loginWithRole } = useAuth();

  return (response: AuthSuccessResponse) => {
    loginWithRole(response.role);
  };
}
