import Client from 'api/client/client';

export const getUser = () =>
  Client({
    url: `current-user`,
  });

export const getUsersService = (role) =>
  Client({
    url: `users`,
    params: {
      role,
    },
  });

export const signUpService = (payload) =>
  Client({
    url: `user/register`,
    method: 'POST',
    data: payload,
  });

export const updateUserService = (userId, payload) =>
  Client({
    url: `user/${userId}`,
    method: 'PATCH',
    data: payload,
  });
