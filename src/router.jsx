import { createBrowserRouter } from "react-router-dom";
import MainLogin from "./page/Login/MainLogin";
import MainLayout from "./page/MainLayout/MainLayout";

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout />
    },

    {
        path: '/login',
        element: <MainLogin />
    },

])
export default router;