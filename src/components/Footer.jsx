import { useContext } from "react";
import { Context } from "../context/Context";

function Footer() {
  const { user, enterprise } = useContext(Context);

  return (
    <>
      <footer className="h-[3vh] w-full bg-Azul-Oscuro text-Blanco">
        <ul className="py-1 flex text-xs/3 h-full items-center">
          <li className="border-r-2 border-Blanco px-6">
            <h6>PROPIEDAD DE: Dr. {enterprise.name_doc} {enterprise.lastname_doc}</h6>
          </li>
          <li className="border-r-2 border-Blanco px-6">
            <h6>USUARIO: {user.username}</h6>
          </li>
          <li className="border-r-2 border-Blanco px-6">
            <h6>ROL: {user.role}</h6>
          </li>
          <li className="border-r-2 border-Blanco px-6">
            <h6>Programador: Angel Lopez</h6>
          </li>
          <li className="px-6">
            <h6>Version: 4.0</h6>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default Footer;