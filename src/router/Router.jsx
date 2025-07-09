import {
    createBrowserRouter,
} from "react-router";
import HomeLayOut from "../layout/HomeLayOut";
import Home from "../page/Home";
import Membership from "../page/Membership";
import Login from "../page/Login";
import Register from "../page/Register";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayOut></HomeLayOut>,
        children: [
            {
                index: true,
                path: '/',
                element: <Home></Home>
            },
            {
                path : '/membership',
                element : <Membership></Membership>
            },
            {
                path : '/login',
                element : <Login></Login>,
            },
            {
                path : '/register',
                element : <Register></Register>
            }
        ]
    },
]);