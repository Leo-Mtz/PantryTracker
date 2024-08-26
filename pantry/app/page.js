'use client'; // Asegura que este componente se renderice en el lado del cliente

// Importa componentes de Material UI y React
import { Box, Stack, Typography, Card, CardContent, Button, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Importa funciones de Firebase que permiten al usuario interactuar con los datos de Firebase
import { collection, getDocs, query, where, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Ajusta la ruta según la estructura de tu archivo

// Componente Home
export default function Home() {
  const [pantry, setPantry] = useState([]); // Estado para la lista de artículos de la despensa
  const [open, setOpen] = useState(false); // Estado para el modal
  const [newItem, setNewItem] = useState(''); // Estado para el nuevo artículo
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

  // Función para manejar la apertura del modal
  const handleOpen = () => setOpen(true);

  // Función para manejar el cierre del modal
  const handleClose = () => setOpen(false);

  // Función para actualizar el estado `newItem` con el valor del campo de texto
  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  // Función para manejar la búsqueda
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Función para obtener los datos de la despensa desde Firestore
  const updatePantry = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, 'pantry'));
      const pantryList = snapshot.docs.map(doc => doc.id);
      setPantry(pantryList);
    } catch (error) {
      console.error('Error updating pantry:', error);
    }
  };

  useEffect(() => {
    updatePantry();
  }, []);

  // Función para añadir un nuevo item a la colección 'pantry' en Firestore
  const addItem = async (item) => {
    try {
      const itemRef = doc(collection(firestore, 'pantry'), item);
      await setDoc(itemRef, { exists: true });
      updatePantry(); // Actualiza la lista de despensa después de añadir el nuevo item
      handleClose(); // Cierra el modal después de añadir el item
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Función para eliminar un item de la colección 'pantry' en Firestore
  const removeItem = async (item) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      try {
        const itemRef = doc(collection(firestore, 'pantry'), item);
        await deleteDoc(itemRef);
        updatePantry(); // Actualiza la lista de despensa después de eliminar el item
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }
  };

  // Filtra los elementos de la despensa según el texto de búsqueda
  const busqueda = pantry.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // UI del programa
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bgcolor="#e0f7fa"
    >
      {/* Barra de búsqueda */}
      <Box width="80%" maxWidth="800px" mb={4}>
        <TextField
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search"
          fullWidth
          margin="normal"
        />
      </Box>

      {/* Modal para añadir nuevo artículo */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: "flex",
          gap: 3,
          flexDirection: 'column'
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add item
          </Typography>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={newItem}
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={() => addItem(newItem)}>
            Add
          </Button>
        </Box>
      </Modal>

      {/* Encabezado */}
      <Box
        width="80%"
        maxWidth="800px"
        mb={4}
        p={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#00796b"
        borderRadius={2}
      >
        <Typography variant="h1" component="h1" color="white" gutterBottom>
          Pantry Tracker
        </Typography>
      </Box>

      {/* Lista de artículos de la despensa */}
      <Box
        width="80%"
        maxWidth="800px"
        height="400px"
        overflow="auto"
        border="1px solid #00796b"
        borderRadius={2}
        bgcolor="white"
        p={2}
      >
        <Stack spacing={2}>
          {busqueda.map((item) => (
            <Card
              key={item}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 100,
                bgcolor: 'white',
                border: '1px solid #00796b',
                boxShadow: 2,
                borderRadius: 2,
                padding: 2,
                '&:hover': {
                  bgcolor: '#004d40',
                  color: 'white',
                },
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Typography>

              <IconButton
                onClick={() => removeItem(item)}
                sx={{
                  color: 'red',
                  '&:hover': {
                    color: 'darkred',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </Stack>
      </Box>

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Item
      </Button>
    </Box>
  );
}
