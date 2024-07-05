import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store/index.ts'
import { BrowserRouter } from 'react-router-dom'
import CommentInputProvider from './contexts/CommentInputContext.tsx'
import { SocketProvider } from './contexts/SocketContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <BrowserRouter>
    <SocketProvider>
      <CommentInputProvider>
       
          <App />
       
      </CommentInputProvider>
      </SocketProvider>

    </BrowserRouter>
  </Provider>

)
