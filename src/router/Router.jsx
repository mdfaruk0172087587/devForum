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
import Forbidden from "../page/Forbidden";
import AdminRoute from "./AdminRoute";
import Error from "../page/Error";
import AboutUs from "../components/AboutUs";
import DashboardHome from "../page/DashboardHome";
import Blog from "../page/homePage/comment/Blog";
import Privacy from "../components/Privacy";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayOut></HomeLayOut>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/membership',
                element: <PrivateRoute>
                    <Membership></Membership>
                </PrivateRoute>
            },
            {
                path: '/postDetails/:id',
                element: <PostDetails></PostDetails>
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: 'privacy',
                element: <Privacy></Privacy>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/forbidden',
                element: <Forbidden></Forbidden>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayOut></DashboardLayOut>
        </PrivateRoute>,
        children: [
            {
                path: '',
                element : <DashboardHome></DashboardHome>
            },
            {
                path: 'addPost',
                element: <AddPost></AddPost>
            },
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'myPosts',
                element: <MyPosts></MyPosts>
            },
            {
                path: 'comments/:postId',
                element: <Comment></Comment>
            },
            {
                path: 'adminProfile',
                element: <AdminRoute>
                    <AdminProfile></AdminProfile>
                </AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute>
                    <ManageUsers></ManageUsers>
                </AdminRoute>
            },
            {
                path: 'makeAnnouncement',
                element: <AdminRoute>
                    <MakeAnnouncement></MakeAnnouncement>
                </AdminRoute>
            },
            {
                path: 'reportedActivities',
                element: <AdminRoute>
                    <ReportedActivities></ReportedActivities>
                </AdminRoute>
            }
        ]
    }
]);