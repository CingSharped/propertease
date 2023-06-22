import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const logout = (e) => {
    e.preventDefault()
    //Remove user fron storage
    localStorage.removeItem('user')
    
    //dispatch logout action
    dispatch({type:'LOGOUT'})
    
    navigate("/login")

    // try {
    //   localStorage.getItem("user")
    // } catch (error) {
      
    // }
    
  }

  return {logout}
}
