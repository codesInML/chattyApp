import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { currentUserRoute } from '../utils/APIRoutes'

const Chat = () => {
  const navigate = useNavigate()

  useEffect(() => {
    async function checkCurrentUser () {
      try {
        const {data} = await axios.get(currentUserRoute, {withCredentials: true})
        
        if (data.currentUser == null) {
          navigate("/login")
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkCurrentUser()
  }, [])
  return (
    <div>Chat</div>
  )
}

export default Chat