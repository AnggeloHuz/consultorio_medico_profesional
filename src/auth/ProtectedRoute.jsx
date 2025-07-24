import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

export default function ProtectedRoute({
  defaultComponent: DefaultComponent,
  accessComponent: AccessComponent
}) {
  const navigate = useNavigate();
  const { token } = useContext(Context);
  const location = useLocation(); // Obtener la información de la ubicación actual
  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    const load = async () => {
      if (token === "Invalid") {
        if (currentPath === "/") {
            return navigate(currentPath);
        }
        if (currentPath === "/register") {
            return navigate(currentPath);
        }
        if (currentPath === "/login") {
          return navigate(currentPath);
        }
        return navigate("/");
      } else {
        return navigate(currentPath)
      }
    };
    load();
  }, [currentPath, navigate]);

  useEffect(() => {
    const load = async () => {
      if (token === "Invalid") {
        if (currentPath === "/") {
            return navigate(currentPath);
        }
        if (currentPath === "/registro") {
            return navigate(currentPath);
        }
        if (currentPath === "/recuperacion") {
          return navigate(currentPath);
        }
        return navigate("/");
      } else {
        return navigate("/home");
      }
    };
    load();
  }, [token]);

  return (
    <>
      {token === "Invalid" ? <DefaultComponent /> : <AccessComponent /> }
    </>
  );
}