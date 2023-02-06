import React from "react";
import {useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const DeleteLink = ({link}) => {
  const navigate = useNavigate();

  return <IconButton onClick={() => navigate(link)}><DeleteIcon color={'error'} /></IconButton>
}

export default DeleteLink;
