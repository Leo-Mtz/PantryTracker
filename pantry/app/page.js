'use client'; // Ensures that this component is client-side

import { Box, Stack, Typography, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase'; // Adjust path based on your file structure

export default function Home() {

  const [pantry,setPantry]=useState([]);
  useEffect( () => {
    const updatePantry = async () => {
    const snapshot= query(collection(firestore, 'pantry'));
    const docs= await getDocs(snapshot);
    const pantryList=[];
    docs.forEach((doc) => {
      pantryList.push(doc.id)
 
    })
    console.log(pantryList);
    setPantry(pantryList);
  }

  updatePantry()
  }, []);
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bgcolor="#e0f7fa" // Light blue background for the whole page
    >
      <Box
        width="80%"
        maxWidth="800px"
        mb={4}
        p={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#00796b" // Darker background for the header
        borderRadius={2} // Rounded corners for the header
      >
        <Typography variant="h1" component="h1" color="white" gutterBottom>
          Pantry Tracker
        </Typography>
      </Box>

      <Box
        width="80%"
        maxWidth="800px"
        height="500px"
        overflow="auto"
        border="1px solid #00796b"
        borderRadius={2}
        bgcolor="white"
        p={2}
      >
        <Stack spacing={2}>
          {pantry.map((item) => (
            <Card
              key={item}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
                bgcolor: 'white',
                border: '1px solid #00796b',
                boxShadow: 2,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#004d40', // Darker color on hover
                  color: 'white',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
