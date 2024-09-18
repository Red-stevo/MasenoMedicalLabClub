import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import {Provider} from "react-redux";
import {persistor, store} from "./ReduxStorage/Store.js";
import {PersistGate} from "redux-persist/integration/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <App />
          </PersistGate>
      </Provider>
  </StrictMode>
)
