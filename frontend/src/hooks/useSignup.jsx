import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [signupError, setSignupError] = useState(null)
  const [signupIsLoading, setSignupIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (username, password, email, userType) => {
    setSignupIsLoading(true)
    setSignupError(null)

    const response = await fetch('#', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password,email, userType })
    })
    const json = await response.json()

    if (!response.ok) {
      setSignupIsLoading(false)
      setSignupError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setSignupIsLoading(false)
    }
  }

  return { signup, signupIsLoading, signupError }
}
