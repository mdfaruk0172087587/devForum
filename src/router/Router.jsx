import {
    createBrowserRouter,
} from "react-router";
import HomeLayOut from "../layout/HomeLayOut";
import Home from "../page/Home";
import Membership from "../page/Membership";
import Login from "../page/Login";
import Register from "../page/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayOut from "../layout/DashboardLayOut";
import AddPost from "../page/dashboard/addPost/AddPost";
import MyProfile from "../page/dashboard/myProfile/MyProfile";
import MyPosts from "../page/dashboard/myPosts/MyPosts";


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
                element : <PrivateRoute>
                    <Membership></Membership>
                </PrivateRoute>
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
    {
        path : '/dashboard',
        element : <PrivateRoute>
            <DashboardLayOut></DashboardLayOut>
        </PrivateRoute>,
        children: [
            {
                path : 'addPost',
                element : <AddPost></AddPost>
            },
            {
                path : 'myProfile',
                element : <MyProfile></MyProfile>
            },
            {
                path : 'myPosts',
                element : <MyPosts></MyPosts>
            }
        ]
    }
]);