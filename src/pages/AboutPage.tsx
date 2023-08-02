import { Button, Card, Typography } from "@mui/material";

const AboutPage = () => {

  const clearDbHandler = () => {
  }

  return <Card sx={ {
    width: 1,
    p: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  } }>
    <Typography variant='h5'>About page</Typography>
    <Typography>Traffic lights meter</Typography>

    <Typography variant='h5'>Actions</Typography>
    <Button sx={ {width: 1} }
            variant="outlined"
            color="error"
            onClick={ clearDbHandler }>Clear database</Button>
  </Card>
}

export default AboutPage
