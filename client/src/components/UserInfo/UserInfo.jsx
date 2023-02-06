import React, {useMemo} from "react";
import { Avatar, Box, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment';

const UserInfo = ({user}) => {

  const userName = useMemo(() => `${user.firstName} ${user.lastName}`, [user]);
  const userIn = useMemo(() => user.firstName.charAt(0), [user]);
  const gender = useMemo(() => user.gender === "female" ? "Mrs." : "Mr.", [user]);

  return <Box sx={{display: 'flex'}}>
    <Box sx={{mr: {xs: 2, sm: 3, md: 5}}}>
      <Avatar sx={{width: {sm: 150}, height: {sm: 150}, fontSize: {sm: 60}}}>{userIn}</Avatar>
    </Box>
    <Box xs={12} sm={6} md={10}>
      <Typography variant="h2" sx={{fontSize: { xs: 34, sm: 48, md: 60 }}} gutterBottom>
        {gender} {userName}
      </Typography>
      {user?.studyProgram && <>{user?.studyProgram?.name}</>}
      {user?.dateOfBirth && <Box sx={{display: 'flex', alignItems: 'center'}}>
        <CalendarMonthIcon sx={{mr: 1}} /> <Typography>{moment(user.dateOfBirth).format('LL')}</Typography>
      </Box>}
    </Box>
  </Box>
}

export default UserInfo;
