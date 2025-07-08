import {
    createBrowserRouter,
} from "react-router";
import HomeLayOut from "../layout/HomeLayOut";
import Home from "../page/Home";
import Membership from "../page/Membership";


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
            }
        ]
    },
]);