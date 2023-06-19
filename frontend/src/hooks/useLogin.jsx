import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [loginError, setLoginError] = useState(null)
  const [loginIsLoading, setLoginIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  
  const login = async (username, password) => {
    setLoginIsLoading(true)
    setLoginError(null)
    
    const response = await fetch('#', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setLoginIsLoading(false)
      setLoginError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setLoginIsLoading(false)
    }

  }

  return { login, loginError, loginIsLoading }
}
