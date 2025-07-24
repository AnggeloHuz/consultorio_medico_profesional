import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import consultorio from "../assets/consultorioMedico.jpg";
import { useEffect, useState } from "react";
import PiesChart from "../components/charts/PiesChart";
import { getFetch } from "../js/fetch";
import { petitions } from "../js/petitions";
import { alertError, alertInfo, alertSuccess } from "../js/alerts";

function Stats() {
  const [SP, setSP] = useState([]);
  const [VSP, setVSP] = useState([]);
  const [MP, setMP] = useState([]);
  const [VMP, setVMP] = useState([]);
  const [total, setTotal] = useState(0);
  const [opcion, setOpcion] = useState(1);
  const [titulo, setTitulo] = useState("Consultas del día de hoy");

  const [today, setToday] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  let contenido = <></>

  useEffect(() => {
    async function load() {
      const hoy = new Date();
      const dia = hoy.getDate();
      const mes = hoy.getMonth() + 1; // Los meses empiezan desde 0
      const año = hoy.getFullYear();
      const date = `${año}-${mes < 10 ? "0" + mes : mes}-${
        dia < 10 ? "0" + dia : dia
      }`;
      setToday(date);
      loadStats(petitions.consultasHoy);
    }
    load();
  }, []);

  const loadStats = async (path) => {
    const response = await getFetch(path);
    if (response.status >= 400) {
      alertError(response.message);
      return false
    }
    if (response.status >= 200) {
      let estados = [];
      let agregarA = true;
      let valores_estados = [];
      let metodos = [];
      let agregarB = true;
      let valores_metodos = [];
      for (let i = 0; i < response.data.length; i++) {
        for (let e = 0; e < estados.length; e++) {
          if (response.data[i].estado_con === estados[e]) {
            agregarA = false;
          }
        }
        for (let o = 0; o < metodos.length; o++) {
          if (response.data[i].metodo_con === metodos[o]) {
            agregarB = false;
          }
        }

        if (agregarA) {
          estados.push(response.data[i].estado_con);
        }
        if (agregarB) {
          metodos.push(response.data[i].metodo_con);
        }
      }

      for (let i = 0; i < estados.length; i++) {
        valores_estados.push(0);
        for (let e = 0; e < response.data.length; e++) {
          if (estados[i] === response.data[e].estado_con) {
            valores_estados[i] = valores_estados[i] + 1;
          }
        }
      }

      for (let i = 0; i < metodos.length; i++) {
        valores_metodos.push(0);
        for (let e = 0; e < response.data.length; e++) {
          if (metodos[i] === response.data[e].metodo_con) {
            valores_metodos[i] = valores_metodos[i] + 1;
          }
        }
      }

      setSP(estados);
      setVSP(valores_estados);
      setMP(metodos);
      setVMP(valores_metodos);
      setTotal(response.data.length);
      alertSuccess(response.message);
      return true
    }
  };

  switch (opcion) {
    case 1:
      contenido = (
        <div className="flex items-center justify-center gap-2">
          <label className="font-Montserrat font-semibold text-[10px] xl:text-xs">
            Hoy:
          </label>
          <input
            name="hoy"
            type="date"
            value={today}
            disabled
            className="hover:cursor-not-allowed font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-1 py-1 text-[10px] xl:text-xs text-gray-900  outline-Azul-claro"
          />
          <button
            onClick={(e) => {
              let response = loadStats(petitions.consultasHoy);
              if (response) {
                setTitulo("Consultas del día de hoy")
              }
            }}
            className={`px-1 py-1 border w-[100px] font-medium font-Montserrat justify-center rounded-md text-[10px] xl:text-xs flex items-center gap-2 border-Azul-claro bg-Azul-claro hover:border-green-600 hover:text-Blanco hover:bg-green-600 transition-all duration-500`}
          >
            Buscar
          </button>
        </div>
      );
    break;

    case 2:
      contenido = (
        <div className="flex items-center justify-center gap-2">
          <label className="font-Montserrat font-semibold text-[10px] xl:text-xs">
            Dia:
          </label>
          <input
            name="dia"
            type="date"
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
            }}
            className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-1 py-1 text-[10px] xl:text-xs text-gray-900  outline-Azul-claro"
          />
          <button
            onClick={(e) => {
              if (day!="") {
                let response = loadStats(petitions.consultasDia+day);
                if (response) {
                  setTitulo("Consultas del día de " + day);
                }
              } else {
                alertInfo("No has seleccionado ningun dia")
              }
            }}
            className={`px-1 py-1 border w-[100px] font-medium font-Montserrat justify-center rounded-md text-[10px] xl:text-xs flex items-center gap-2 border-Azul-claro bg-Azul-claro hover:border-green-600 hover:text-Blanco hover:bg-green-600 transition-all duration-500`}
          >
            Buscar
          </button>
        </div>
      );
    break;

    case 3:
      contenido = (
        <div className="flex items-center justify-center gap-2">
          <label className="font-Montserrat font-semibold text-[10px] xl:text-xs">
            Mes:
          </label>
          <select
            name="otrosMeses"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
            className="rounded-lg font-Montserrat border-2 text-[10px] xl:text-xs p-1 border-Azul-claro"
          >
            <option value="">Selecciona</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
          <button
            onClick={(e) => {
              if (month != "") {
                let response = loadStats(petitions.consultasMes + month);
                if (response) {
                  let mes = ""
                  if (month == "1") mes = "Enero"
                  if (month == "2") mes = "Febrero"
                  if (month == "3") mes = "Marzo"
                  if (month == "4") mes = "Abril"
                  if (month == "5") mes = "Mayo"
                  if (month == "6") mes = "Junio"
                  if (month == "7") mes = "Julio"
                  if (month == "8") mes = "Agosto"
                  if (month == "9") mes = "Septiembre"
                  if (month == "10") mes = "Octubre"
                  if (month == "11") mes = "Noviembre"
                  if (month == "12") mes = "Diciembre"
                  setTitulo("Consultas del mes de "+mes);
                }
              } else {
                alertInfo("No has seleccionado ningun mes");
              }
            }}
            className={`px-1 py-1 border w-[100px] font-medium font-Montserrat justify-center rounded-md text-[10px] xl:text-xs flex items-center gap-2 border-Azul-claro bg-Azul-claro hover:border-green-600 hover:text-Blanco hover:bg-green-600 transition-all duration-500`}
          >
            Buscar
          </button>
        </div>
      );
    break;

    case 4:
      contenido = (
        <div className="flex gap-4">
          <div className="flex items-center justify-center gap-2">
            <label className="font-Montserrat font-semibold text-[10px] xl:text-xs">
              Desde:
            </label>
            <input
              name="desde"
              type="date"
              value={desde}
              onChange={(e) => {setDesde(e.target.value)}}
              className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-1 py-1 text-[10px] xl:text-xs text-gray-900  outline-Azul-claro"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <label className="font-Montserrat font-semibold text-[10px] xl:text-xs">
              Hasta:
            </label>
            <input
              name="hasta"
              type="date"
              value={hasta}
              onChange={(e) => {setHasta(e.target.value)}}
              className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-1 py-1 text-[10px] xl:text-xs text-gray-900  outline-Azul-claro"
            />
          </div>
          <button
            onClick={(e) => {
              if (desde === '' || hasta === '') {
                return alertInfo("Debes llenar ambas fechas para crear el rango de fecha a consultar")
              }
              if (desde < hasta) {
                let response = loadStats(petitions.consultasPersonalizada+desde+"/"+hasta);
                if (response) {
                  setTitulo("Consultas del día " + desde + " hasta el dia "+ hasta);
                }
              } else {
                alertInfo("El rango de fecha debe ser correcta donde el inicio sea menor a la fecha final")
              }
            }}
            className={`px-1 py-1 border w-[100px] font-medium font-Montserrat justify-center rounded-md text-[10px] xl:text-xs flex items-center gap-2 border-Azul-claro bg-Azul-claro hover:border-green-600 hover:text-Blanco hover:bg-green-600 transition-all duration-500`}
          >
            Buscar
          </button>
        </div>
      );
    break;
  
    default:
      contenido = <></>
    break;
  }

  return (
    <>
      <Header />
      <Nav />

      <main className="h-[87vh] flex w-full justify-center items-center bg-Consultorio bg-cover bg-center relative">
        <img src={consultorio} alt="" className="w-full h-full absolute" />
        <section className="w-[95%] h-[95%] border border-Negro rounded-lg bg-Gris-claro z-10">
          <h2 className="text-Negro font-semibold font-Montserrat text-base xl:text-lg p-4 h-[8%] flex items-center border-b border-Negro">
            Panel de Estadísticas Avanzadas del Consultorio
          </h2>

          <div className="h-[84%] w-full flex bg-white overflow-y-auto">
            <div className="flex flex-col w-full">
              <div className="py-4 flex flex-col">
                <h3 className="text-base text-Azul-Oscuro font-extrabold font-Montserrat text-center">
                  {titulo}{" "}
                  <span className="text-green-600">({total} totales)</span>
                </h3>
              </div>
              <div className="w-full h-full flex flex-row justify-center items-center p-2">
                {total === 0 ? (
                  <div></div>
                ) : (
                  <>
                    <div className="w-1/2 h-full p-5">
                      <PiesChart
                        keys={SP}
                        data={VSP}
                        label={"Estadísticas según el estado del paciente"}
                      />
                    </div>
                    <div className="w-1/2 h-full p-5">
                      <PiesChart
                        keys={MP}
                        data={VMP}
                        label={"Estadísticas según el método de pago"}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="h-[8%] border-t border-Negro flex items-center justify-between px-12">
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  setOpcion(1);
                }}
                className={`${
                  opcion === 1
                    ? "bg-Azul-Oscuro text-white border-Azul-Oscuro"
                    : "bg-white border-Azul-claro"
                } px-1 py-1 border-2 w-[100px] font-medium font-Montserrat justify-center rounded-md text-[10px] xl:text-xs flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500`}
              >
                Hoy
              </button>
              <button
                onClick={(e) => {
                  setOpcion(2);
                }}
                className={`${
                  opcion === 2
                    ? "bg-Azul-Oscuro text-white border-Azul-Oscuro"
                    : "bg-white border-Azul-claro"
                } px-1 py-1 border-2 w-[100px] font-medium font-Montserrat justify-center rounded-md text-[10px] xl:text-xs flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500`}
              >
                Día
              </button>
              <button
                onClick={(e) => {
                  setOpcion(3);
                }}
                className={`${
                  opcion === 3
                    ? "bg-Azul-Oscuro text-white border-Azul-Oscuro"
                    : "bg-white border-Azul-claro"
                } px-1 py-1 border-2 w-[100px] font-medium font-Montserrat justify-center rounded-md text-[10px] xl:text-xs flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500`}
              >
                Mes
              </button>
              <button
                onClick={(e) => {
                  setOpcion(4);
                }}
                className={`${
                  opcion === 4
                    ? "bg-Azul-Oscuro text-white border-Azul-Oscuro"
                    : "bg-white border-Azul-claro"
                } px-1 py-1 border-2 w-[100px] font-medium font-Montserrat justify-center rounded-md text-[10px] xl:text-xs flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500`}
              >
                Personalizado
              </button>
            </div>

            {contenido}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Stats;
