import HorizontalLayout from 'src/@core/layouts/HorizontalLayout'
import { useSettings } from 'src/@core/hooks/useSettings'

const UserLayout = ({ children, contentHeightFixed }) => {

  const { settings, saveSettings } = useSettings()

  return (
    <HorizontalLayout
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
    >
      {children}

    </HorizontalLayout>
  )
}

export default UserLayout
