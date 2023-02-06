import React from "react";
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const EditLink = ({link}) => {
  const navigate = useNavigate();

  return <IconButton onClick={() => navigate(link)}><EditIcon /></IconButton>
}

export default EditLink;
