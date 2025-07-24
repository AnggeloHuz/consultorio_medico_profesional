import { useContext, useState } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import formValidation from "../../../RaceManager-Proyecto/RaceManager/Client/src/validations/formValidation";
import { alertError, alertSuccess } from "../js/alerts";
import { postFetch } from "../js/fetch";
import { petitions } from "../js/petitions";
import { Context } from "../context/Context";

function Login() {
  const { setToken, setUser } = useContext(Context);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

    
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validation = () => {
    for (let key in values) {
      let error = formValidation.validateText(values[key].toString());
      if (!error) return "No puede haber ningun campo vacio y tampoco con solo espacios en blanco";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verification = validation();
    if (verification) return alertError(verification);

    const response = await postFetch(values, petitions.login);
    if (response.status >= 400) {
      return alertError(response.message);
    } else {
      alertSuccess(response.message);
      setToken(response.token);
      setUser(response.data);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userConsultorio", JSON.stringify(response.data));
      setValues({
        username: "",
        password: ""
      });
      return navigate("/home")
    }
  };

  return (
    <>
      <main className="h-screen w-full flex">
        <div className="h-full w-1/2 bg-Consultorio bg-cover bg-center"></div>
        <div className="h-full w-1/2 p-12">
          <Link
            to={"/"}
            className="text-Negro text-xs xl:text-sm flex gap-2 items-center hover:text-Azul-Oscuro transition-all duration-300"
          >
            <IoReturnDownBack className="text-lg xl:text-xl" /> Regresar
          </Link>
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col justify-center items-center gap-6"
          >
            <h2 className="font-Montserrat font-semibold text-xl xl:text-2xl mb-4">
              Iniciar Sesión
            </h2>
            <div className="w-4/6 font-Montserrat">
              <div className="mb-5">
                <label
                  htmlFor="user"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Usuario
                </label>
                <input
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                  placeholder="Doctor"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={values.password}
                  onChange={handleInputChange}
                  className="w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                  required
                />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Recordar
                </label>
              </div>
              <div className="gap-3 flex">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Iniciar Sesion
                </button>
                <Link
                  to={"/register"}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Registro
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
