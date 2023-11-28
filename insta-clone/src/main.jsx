import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { Provider } from 'react-redux'
// import { store, persistor } from './store/store.js'
// import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> */}
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        {/* </PersistGate>
      </Provider> */}
    </BrowserRouter>
  </React.StrictMode>,
)
