import { Box, styled, Typography } from "@mui/material";


const AboutContainer = styled(Box)({
  display: 'flex',
  gap: 20
})

const AboutPage = () => {
  return <AboutContainer sx={{
    width: 500,
    height: 450,
    boxShadow: 0,
    backgroundColor: 'primary.light',
    borderRadius: 3,
    p: 2
  }}>
    <Typography>About page</Typography>
  </AboutContainer>
}

export default AboutPage
