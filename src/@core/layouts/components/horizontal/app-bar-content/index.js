// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8),
  textDecoration: 'none',
  color: `${theme.palette.text.secondary} !important`,
  '&:hover': {
    color: `${theme.palette.primary.main} !important`
  }
}))

const AppBarContent = props => {

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

      <LinkStyled href='/'>
        <img className='logo' src="/images/logo.png" />
        <Typography variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
          {themeConfig.appName}
        </Typography>
      </LinkStyled>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          sx={{mr: 6}}
          component={LinkStyled}
          href='/markets'
        >
          Markets
        </Typography>
        <Typography
          target='_blank'
          sx={{mr: 6}}
          component={LinkStyled}
          href='https://dilending.gitbook.io/di-lending'
        >
          Documentation
        </Typography>
        <Typography
          target='_blank'
          sx={{mr: 26}}
          component={LinkStyled}
          href='https://pixinvent.ticksy.com'>
          Support
        </Typography>
        <Button variant='outlined'>
          Connect Wallet
        </Button>
        {false && <UserDropdown settings={props.settings} /> }
      </Box>

    </Box>
  )
}

export default AppBarContent
