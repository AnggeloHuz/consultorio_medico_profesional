import archive from '../../public/file.png'
import stats from '../../public/analytics.png'
import exit from '../../public/exit.png'
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../context/Context';
import { alertSuccess } from '../js/alerts';

function Nav() {
  const { setToken } = useContext(Context);

  const onLogout = (e) => {
    e.preventDefault();
    setToken("Invalid");
    localStorage.removeItem("token");
    localStorage.removeItem("userConsultorio");
    alertSuccess("Has cerrado sesión con éxito")
  }
  
  return (
    <>
      <nav className="h-[6vh] w-full bg-Azul-claro flex items-center">
        <ul className="flex h-full text-xs xl:text-sm text-Negro font-Montserrat font-semibold">
          <li><Link className="px-5 flex items-center gap-1.5 h-full hover:bg-Azul-Oscuro hover:text-Blanco transition-all duration-300 hover:cursor-pointer" to={`/home`}>Archivo <img src={archive} className='w-5 xl:w-6' alt="" /></Link></li>
          <li><Link className="px-5 flex items-center gap-1.5 h-full hover:bg-Azul-Oscuro hover:text-Blanco transition-all duration-300 hover:cursor-pointer" to={`/stats`}>Estadísticas <img src={stats} className='w-5 xl:w-6' alt="" /></Link></li>
          <li><button onClick={onLogout} className="px-5 flex items-center gap-1.5 h-full hover:bg-Azul-Oscuro hover:text-Blanco transition-all duration-300 hover:cursor-pointer">Salir <img src={exit} className='w-5 xl:w-6' alt="" /></button></li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
