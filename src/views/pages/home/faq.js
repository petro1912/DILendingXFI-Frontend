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
        <Typography variant="h1" sx={{textAlign: 'center', mb: 6}}>Frequently Asked Questions</Typography>
        <Accordion>
          <AccordionSummary
            id='panel-header-1'
            aria-controls='panel-content-1'
            expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <Fab color='primary' size='small' sx={{mr: 2}}>
                <Icon icon='tabler:question-mark' />
              </Fab>
              <Typography variant='h4'>Accordion 1</Typography>
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
            id='panel-header-2'
            aria-controls='panel-content-2'
            expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary' }}>
              Sugar plum sesame snaps caramels. Cake pie tart fruitcake sesame snaps donut cupcake macaroon. Gingerbread
              pudding cheesecake pie ice cream.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            id='panel-header-3'
            aria-controls='panel-content-3'
            expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
          >
            <Typography>Accordion 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: 'text.secondary' }}>
              Gingerbread lemon drops bear claw gummi bears bonbon wafer jujubes tiramisu. Jelly pie cake. Sweet roll
              dessert sweet pastry powder.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </BoxContainer>
    </Box>
  )
}

export default FAQ
