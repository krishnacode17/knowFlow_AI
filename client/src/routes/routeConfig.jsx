import { Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Chat from "../pages/Chat";

import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import Documents from "../pages/Documents";
import KnowledgeBase from "../pages/KnowledgeBase";
import KnowledgeBaseDetails from "../pages/KnowledgeBaseDetails";
import Settings from "../pages/Settings";

const routeConfig = [
  // Login and Register routes
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
    ],
  },

  // Dashboard and Chat routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
          { path: "documents", element: <Documents /> },
          {
            path: "knowledge-base",
            element: <KnowledgeBase />,
          },
          {
            path: "knowledge-base/:collectionId",
            element: <KnowledgeBaseDetails />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },

  // Unknown URLs
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routeConfig;
