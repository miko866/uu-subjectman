import React from 'react';

import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import IconButton from '@mui/material/IconButton';

import { ROLES } from 'utils/constants';
import { updateUserService } from 'api/user/user';

const UpdateButton = ({ user }) => {
  const updateUserRole = (user) => {
    updateUserService(user._id, { roleName: ROLES.user })
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <IconButton onClick={() => updateUserRole(user)}>
      <PublishedWithChangesIcon color={'success'} />
    </IconButton>
  );
};

export default UpdateButton;
