import {
  Box,
  Fab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
}  from '@mui/material'
import BoxContainer from "src/@core/components/container"
import Icon from 'src/@core/components/icon'

const FAQ = () => {
  return (
    <Box className="works">
      <BoxContainer>
        <Box sx={{maxWidth: 800, margin: 'auto'}}>
          <Typography variant="h1" sx={{textAlign: 'center', mb: 12}}>Frequently Asked Questions</Typography>
          <Accordion>
            <AccordionSummary
              id='panel-header-1'
              aria-controls='panel-content-1'
              expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
            >
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Typography variant='h4'>What is Defi Lending and How it works?</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary', mt: 4 }}>
                Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
                Topping soufflé tart sweet croissant.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              id='panel-header-1'
              aria-controls='panel-content-1'
              expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
            >
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Typography variant='h4'>What is the benefit of DI Lending?</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary', mt: 4 }}>
                Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
                Topping soufflé tart sweet croissant.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              id='panel-header-1'
              aria-controls='panel-content-1'
              expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
            >
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Typography variant='h4'>What is key feature of DI Lending?</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary', mt: 4 }}>
                Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
                Topping soufflé tart sweet croissant.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              id='panel-header-1'
              aria-controls='panel-content-1'
              expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
            >
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Typography variant='h4'>DI Lending's Investment is safe?</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary', mt: 4 }}>
                Wafer sesame snaps chocolate bar candy canes halvah. Cupcake sesame snaps sweet tart dessert biscuit.
                Topping soufflé tart sweet croissant.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </BoxContainer>
    </Box>
  )
}

export default FAQ
