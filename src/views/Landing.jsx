import { Link } from "react-router-dom";
import "../landing.css"
import medicalLogo from "../../public/medical-symbol.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Landing() {
  /*const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(auth)
  }, []);*/

  return (
    <>
      <header class="header">
        <nav class="nav">
          <div className="flex gap-3 items-center">
            <span className="rounded-full p-2 bg-white"><img src={medicalLogo} className="w-8" alt="" /></span>
          <h2 className="font-bold text-3xl">Dr. Francisco Plaza</h2>
          </div>
          <div class="nav-links">
            <a href="#servicios">Servicios</a>
            <a href="#citas">Citas</a>
            <a href="#contacto">Contacto</a>
          </div>
        </nav>
      </header>

      <section class="hero">
        <h1>Dr. Francisco Plaza</h1>
        <p>Médico General - Especialista en Medicina Familiar</p>
        <p>Más de 25 años de experiencia cuidando la salud de las familias</p>
      </section>

      <section class="services" id="servicios">
        <h2>Nuestros Servicios</h2>
        <div class="services-grid">
          <Link  to={`/login`} class="service-card">
            <div class="service-icon">👨‍⚕️</div>
            <h3>
            <p>Consulta Médica</p>
            </h3>
            <p>Atención integral para toda la familia</p>
          </Link>
          <Link to={'/login'} class="service-card">
            <div class="service-icon">🛎️</div>
            <h3>
              <p>Recepción</p>
            </h3>
            <p>Programa completo de atención</p>
          </Link>
          <div class="service-card">
            <div class="service-icon">🏥</div>
            <h3>
              <a href="#contacto">Información</a>
            </h3>
            <p>Comunicación de rutina y prevención</p>
          </div>
        </div>
      </section>

      <section class="appointment" id="citas">
        <h2>Agende su Cita</h2>
        <p>Estamos para servirle. Agende su cita hoy mismo.</p>
        <a href="https://calendly.com" class="btn">
          Reservar Cita
        </a>
      </section>

      <section class="contact" id="contacto">
        <h2>Contacto</h2>
        <p>Dirección: Av. Principal #123, Ciudad</p>
        <p>Teléfono: (058) 456-7890</p>
        <p>Email: dr.@correo.com</p>
        <p>Horario: Lunes a Viernes 8:00 AM - 4:00 PM</p>
      </section>

      <footer class="footer">
        <p>
          &copy; 2025 Consultorio Dr. Francisco Plaza. Todos los derechos
          reservados.
        </p>
      </footer>
    </>
  );
}

export default Landing;
