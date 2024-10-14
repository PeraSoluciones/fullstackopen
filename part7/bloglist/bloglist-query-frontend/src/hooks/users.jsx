import usersService from '../services/users';
import { useQuery } from '@tanstack/react-query';

export const useUsersQuery = () => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    refetchOnWindowFocus: false,
  });

  return users;
};
