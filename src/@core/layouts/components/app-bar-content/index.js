// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'
import ConnectWallet from 'src/views/pages/home/ConnectWallet'
import { useState } from 'react'
import { useRouter } from 'next/router'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(10),
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

  const activeMenuClass = (name) => {
    return router.pathname.startsWith(name) ? 'active' : ''
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
      <LinkStyled href='/'>
        <img className='logo' src="/images/logo.png" />
        <Typography color="primary" variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
          {themeConfig.appName}
        </Typography>
      </LinkStyled>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            background: '#11111122',
            borderRadius: '30px',
            backdropFilter: 'blur(8px)',
            mr: 26,
            px: 10,
            py: 3,
            border: '2px solid #00CFE8'
          }}>
          <Typography
            variant='h5'
            sx={{mr: 6}}
            component={LinkStyled}
            className={router.pathname == '/'? 'active' : ''}
            href='/'
          >
            Home
          </Typography>
          <Typography
            variant='h5'
            sx={{mr: 6}}
            component={LinkStyled}
            className={activeMenuClass('/markets')}
            href='/markets'
          >
            Markets
          </Typography>
          <Typography
            variant='h5'
            sx={{mr: 6}}
            className={activeMenuClass('/governance')}
            component={LinkStyled}
            href='/governance'
          >
            Governance
          </Typography>
          <Typography
            variant='h5'
            target='_blank'
            sx={{mr: 6}}
            component={LinkStyled}
            href='/docs/marketing-doc.pdf'
          >
            Marketing
          </Typography>
          <Typography
            variant='h5'
            target='_blank'
            sx={{mr: 6}}
            component={LinkStyled}
            href='https://dilending.gitbook.io/di-lending'
          >
            Documentation
          </Typography>
          <Typography
            variant='h5'
            className={activeMenuClass('/app')}
            component={LinkStyled}
            href='/app'>
            App
          </Typography>
        </Box>
        <ConnectWallet account={account} setAccount={setAccount}/>
      </Box>

    </Box>
  )
}

export default AppBarContent
