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
import ConnectWallet from 'src/views/pages/home/ConnectWallet'
import { useState } from 'react'
import { useRouter } from 'next/router'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8),
  textDecoration: 'none',
  color: `${theme.palette.text.secondary} !important`,
  '&:hover': {
    color: `${theme.palette.primary.main} !important`
  },
  '&.active': {
    color: `${theme.palette.primary.main} !important`,
    '&:hover': {
      color: `${theme.palette.primary.main} !important`
    },
  }
}))

const AppBarContent = props => {

  const router = useRouter()
  const [account, setAccount] = useState(null);

  console.log(router, router.pathname)
  const activeMenuClass = (name) => {
    return router.pathname.startsWith(name) ? 'active' : ''
  }


  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4}}>
      <LinkStyled href='/'>
        <img className='logo' src="/images/logo.png" />
        <Typography variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
          {themeConfig.appName}
        </Typography>
      </LinkStyled>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            background: '#11111122',
            borderRadius: '20px',
            backdropFilter: 'blur(6px)',
            mr: 26,
            px: 8,
            py: 2,
            border: '2px solid #00CFE8'
          }}>
          <Typography
            sx={{mr: 6}}
            component={LinkStyled}
            className={router.pathname == '/'? 'active' : ''}
            href='/'
          >
            Home
          </Typography>
          <Typography
            sx={{mr: 6}}
            component={LinkStyled}
            className={activeMenuClass('/markets')}
            href='/markets'
          >
            Markets
          </Typography>
          <Typography
            sx={{mr: 6}}
            className={activeMenuClass('/governance')}
            component={LinkStyled}
            href='/governance'
          >
            Governance
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

            className={activeMenuClass('/app')}
            component={LinkStyled}
            href='/app'>
            App
          </Typography>
        </Box>
        <ConnectWallet account={account} setAccount={setAccount}/>
        {false && <UserDropdown settings={props.settings} /> }
      </Box>

    </Box>
  )
}

export default AppBarContent
