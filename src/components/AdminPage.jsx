import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Container, Typography, Paper } from '@material-ui/core';

const AdminPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    const filteredData = storedData.filter(user => user.userType === 'business' || user.userType === 'endUser');
    setUserData(filteredData);
  }, []);

  const handleApprovalChange = (index) => {
    const updatedData = [...userData];
    updatedData[index].isApproved = updatedData[index].isApproved === 'Approved' ? 'Pending' : 'Approved';
    localStorage.setItem('userData', JSON.stringify(updatedData));
    setUserData(updatedData);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>User Table</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SrNo</TableCell>
              <TableCell>Registration Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Business Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Approved Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.userType}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.businessName}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>
                  <button onClick={() => handleApprovalChange(index)}>
                    {user.isApproved}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default AdminPage;
