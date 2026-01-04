import { useEffect } from 'react'
import AppRoute from './routes/AppRoute'
import useAuthStore from './store/authStore'

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
     <AppRoute/>
    </>
  )
}

export default App
