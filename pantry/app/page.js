import {Box,Stack} from '@mui/material';


const item= ['tomato', 'celery', 'cucumber','meat'];

export default function Home() {
  return (

    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <h1>Pantry Tracker</h1>

      
    <Stack width = "800px" height = "500px" border = "1px solid black" spacing={2}>

    {item.map((i) => (

    <Box
      key= {i}
      width= "100%"
      height= "100px"
      display= "flex"
      justifyContent= "center"
      alignItems= "center"
      border= "1px solid black"
      >
        <h2>{i}</h2>
      </Box>
    ))}


    </Stack>

    </Box>



  )
}
