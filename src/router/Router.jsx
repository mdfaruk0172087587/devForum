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
import PostDetails from "../page/homePage/PostDetails";
import Comment from "../page/homePage/comment/Comment";
import AdminProfile from "../page/adminDashboard/AdminProfile";
import ManageUsers from "../page/adminDashboard/manageUsers/ManageUsers";
import MakeAnnouncement from "../page/adminDashboard/makeAnnouncement/MakeAnnouncement";
import ReportedActivities from "../page/adminDashboard/reportedActivities/ReportedActivities";


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
                path : '/postDetails/:id',
                element : <PrivateRoute>
                    <PostDetails></PostDetails>
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
            },
            {
                path : 'comments/:postId',
                element: <Comment></Comment>
            },
            {
                path: 'adminProfile',
                element : <AdminProfile></AdminProfile>
            },
            {
                path : 'manageUsers',
                element : <ManageUsers></ManageUsers>
            },
            {
                path : 'makeAnnouncement',
                element: <MakeAnnouncement></MakeAnnouncement>
            },
            {
                path : 'reportedActivities',
                element : <ReportedActivities></ReportedActivities>
            }
            
        ]
    }
]);