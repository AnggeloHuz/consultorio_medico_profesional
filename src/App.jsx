import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import Stats from "./views/Stats";
import Landing from "./views/Landing";
import Login from "./views/Login";
import Registro from "./views/Registro";
import ProtectedRoute from "./auth/ProtectedRoute";

/*Enrutador de la web*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute defaultComponent={Landing} accessComponent={Landing} />,
  },
  {
    path: "/home",
    element: <ProtectedRoute defaultComponent={Login} accessComponent={Home} />,
  },
  {
    path: "/stats",
    element: <ProtectedRoute defaultComponent={Login} accessComponent={Stats} />,
  },
  {
    path: "/login",
    element: <ProtectedRoute defaultComponent={Login} accessComponent={Login} />,
  },
  {
    path: "/register",
    element: <ProtectedRoute defaultComponent={Registro} accessComponent={Registro} />,
  },
  {
    path: "*",
    element: (
      <h2 className="text-3xl font-bold underline font-barlow-condensed">
        {" "}
        Pagina de Error
      </h2>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
