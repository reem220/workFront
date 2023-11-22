import { useState } from "react"

import ax from 'axios'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
     
      setIsLoading(true)
   setError(null)
   
   const response = await ax.post('https://backwo.onrender.com/api/user/signup' ,{email,password} )
 
  
 // save the user to local storage
     localStorage.setItem('user', JSON.stringify(response.data))

     // update the auth context
     window.location.reload(false);
     // dispatch({type: 'LOGIN', payload: json})

     // update loading state
     setIsLoading(false)

   } catch (error) {
   
      setIsLoading(false)
     setError('please fill out all fields')
   }
    
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup