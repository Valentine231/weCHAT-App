import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './Components/Login.jsx'
import ChatHistory from './Components/ChatHistory.jsx'
import Signup from './Components/Signup.jsx'
import Chat from './Components/Chat.jsx'
import 'react-native-get-random-values';
import Homepage from './Components/Homepage.jsx'
import Login from './Components/Login.jsx'
import Errorpage from './Components/Errorpage.jsx'



if (typeof global === 'undefined') {
  window.global = window;
}



const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/chatHistory',
    element: <ChatHistory />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <Errorpage/>,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
