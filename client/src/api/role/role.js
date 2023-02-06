import Client from 'api/client/client';

export const getRoleService = (roleId) =>
  Client({
    url: `role/${roleId}`,
  });
