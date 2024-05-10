import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.scss'
import './main.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import { GlobalContextProvider } from './GlobalContext/GlobalContextProvider';
import { Cart } from './Pages/Cart/Cart';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/cart",
        element: <Cart />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GlobalContextProvider>
            <RouterProvider router={router} />
        </GlobalContextProvider>
    </React.StrictMode>,
)
