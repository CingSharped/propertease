import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const logout = () => {
    //Remove user fron storage
    localStorage.removeItem('user')
    
    //dispatch logout action
    dispatch({type:'LOGOUT'})
    
    try {
      localStorage.getItem("user")
    } catch (error) {
      navigate("/login")
    }
    
  }

  return {logout}
}
