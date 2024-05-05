import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
