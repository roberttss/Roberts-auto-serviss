import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.scss'
import './main.scss'
import { GlobalContextProvider } from './GlobalContext/GlobalContextProvider';
import { RouterFile } from './RouterFile';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GlobalContextProvider>
            <RouterFile />
        </GlobalContextProvider>
    </React.StrictMode>,
)
