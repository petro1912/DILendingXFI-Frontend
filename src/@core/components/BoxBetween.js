import { Box } from "@mui/material"

const BoxBetween = (props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} {...props}>
      {props.children}
    </Box>
  )
}

export default BoxBetween
