import Xray from "../../../public/x-ray.png";
import Surgeon from "../../../public/surgeon.png";
import Search from "../../../public/search.png";
import NextWeek from "../../../public/next-week.png";
import MedicalReport from "../../../public/medical-report.png";
import MedicalHistory from "../../../public/medical-history.png";
import Diskette from "../../../public/diskette.png";
import Clock from "../../../public/clock.png";
import Calculator from "../../../public/calculator.png";
import { FaUser, FaUserDoctor } from "react-icons/fa6";
import { useContext, useState } from "react";
import { ModalRecipe } from "./secundarios/ModalRecipe";
import { ModalReferencia } from "./secundarios/ModalReferencia";
import { ModalJustificativoFamiliar } from "./secundarios/ModalJustificativoFamiliar";
import { ModalJustificativoPersonal } from "./secundarios/ModalJustificativoPersonal";
import { ModalProxCita } from "./secundarios/ModalProxCita";
import { ModalInformes } from "./secundarios/ModalInformes";
import { ModalResumen } from "./secundarios/ModalResumen";
import { ModalReposo } from "./secundarios/ModalReposo";
import { alertConfirm, alertSuccess } from "../../js/alerts";
import Swal from "sweetalert2";
import { getFetchParams, putFetchParams } from "../../js/fetch";
import { petitions } from "../../js/petitions";
import { alertError } from "../../../../RaceManager-Proyecto/RaceManager/Client/src/alerts/alerts";
import { Context } from "../../context/Context";

function OpcionesHistorias({paciente, historia, setOpenModal, setPaciente, loadHistory, atender}) {
  const { loadListPatient } = useContext(Context);

  const [recipe, setRecipe] = useState(false);
  const [referencia, setReferencia] = useState(false);
  const [dropLeft, setDropLeft] = useState(false);
  const [dropLeftIMC, setDropLeftIMC] = useState(false);
  const [familiar, setFamiliar] = useState(false);
  const [personal, setPersonal] = useState(false);
  const [prox, setProx] = useState(false);
  const [informe, setInforme] = useState(false);
  const [resumen, setResumen] = useState(false);
  const [reposo, setReposo] = useState(false);
  const [calculoIMC, setCalculoIMC] = useState({
    peso: 0,
    altura: 0,
    imc: 0
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres actualizar la historia médica del paciente",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await putFetchParams({history: historia}, petitions.updateHistory, paciente.id_patient)
        if (response.status >= 400) {
          alertError(response.message)
        } else {
          alertSuccess(response.message)
        }
      } else if (result.isDenied) {
        Swal.fire("¡Ten cuidado!", "No se actualizó la historia", "info");
      }
    });
  };

  return (
    <>
      {paciente === null ? (
        <div></div>
      ) : (
        <div className="w-[20%] h-[800px] rounded-md flex flex-col gap-2 items-center bg-Gris-claro border border-Azul-Oscuro">
          <h5 className="w-full flex justify-center items-center rounded-t-md font-Montserrat font-semibold text-lg xl:text-xl h-[49px] pt-3 pb-3 bg-Azul-claro border-b border-Azul-Oscuro">
            Opciones:
          </h5>
          <div className="flex flex-col justify-center gap-2 h-full">
            <button
              onClick={handleSubmit}
              className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
            >
              <a className="w-5/6">Guardar</a>{" "}
              <img src={Diskette} className="w-1/6" />
            </button>
            <button
              onClick={(e) => {
                setRecipe(!recipe);
              }}
              className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
            >
              <a className="w-5/6">Recipe</a>{" "}
              <img src={MedicalHistory} className="w-1/6" />
            </button>
            <div className="relative flex">
              <button
                onClick={(e) => setDropLeft(!dropLeft)}
                className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
              >
                <a className="w-5/6">Justificativo</a>{" "}
                <img src={Search} className="w-1/6" />
              </button>
              <div
                className={`${
                  dropLeft ? "visible" : "hidden"
                } z-10 divide-y absolute right-[110%] bg-Gris-claro border border-Azul-Oscuro p-2 divide-gray-100 rounded-lg shadow-sm w-44 `}
              >
                <ul className="py-2 text-sm">
                  <li className="mb-2">
                    {" "}
                    <button
                      onClick={(e) => setPersonal(!personal)}
                      className="text-sm p-1.5 bg-white w-full rounded-md border-2 border-Azul-claro hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                    >
                      Personal
                    </button>
                  </li>
                  <li>
                    {" "}
                    <button
                      onClick={(e) => setFamiliar(!familiar)}
                      className="text-sm p-1.5 bg-white w-full rounded-md border-2 border-Azul-claro hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                    >
                      Familiar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={(e) => setInforme(!informe)}
              className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
            >
              <a className="w-5/6">Informes</a>{" "}
              <img src={MedicalReport} className="w-1/6" />
            </button>
            <button
              onClick={(e) => {
                setReferencia(!referencia);
              }}
              className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
            >
              <a className="w-5/6">Referencias</a>{" "}
              <img src={Surgeon} className="w-1/6" />
            </button>
            <button
              onClick={(e) => {
                setResumen(!resumen);
              }}
              className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
            >
              <a className="w-5/6">Res del caso</a>{" "}
              <img src={Xray} className="w-1/6" />
            </button>
            <button
              onClick={(e) => {
                setReposo(!reposo);
              }}
              className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
            >
              <a className="w-5/6">Reposo</a>{" "}
              <img src={Clock} className="w-1/6" />
            </button>
            <button
              onClick={(e) => {
                setProx(!prox);
              }}
              className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
            >
              <a className="w-5/6">Prox. cita</a>{" "}
              <img src={NextWeek} className="w-1/6" />
            </button>
            <div className="flex relative">
              <button
                onClick={(e) => {
                  setDropLeftIMC(!dropLeftIMC);
                }}
                className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
              >
                <a className="w-5/6">Calculo IMC</a>{" "}
                <img src={Calculator} className="w-1/6" />
              </button>
              <div
                className={`${
                  dropLeftIMC ? "visible" : "hidden"
                } z-10 divide-y absolute right-[110%] bg-Gris-claro border border-Azul-Oscuro p-2 divide-gray-100 rounded-lg shadow-sm w-44 `}
              >
                <form>
                  <p className="font-Montserrat text-gray-900 text-sm font-medium mb-2">
                    Cáculo IMC
                  </p>

                  <div className="flex gap-2 w-full items-center mb-2">
                    <label className="font-Montserrat w-28 text-gray-900 text-xs xl:text-sm font-medium">
                      Altura:
                    </label>
                    <input
                      name="altura"
                      type="number"
                      min={0}
                      step={0.01}
                      onChange={(e) => {
                        e.preventDefault();
                        setCalculoIMC({
                          ...calculoIMC,
                          ["altura"]: e.target.value * e.target.value,
                          ["imc"]: (
                            calculoIMC.peso /
                            (e.target.value * e.target.value)
                          ).toFixed(2),
                        });
                      }}
                      className="font-Montserrat rounded-md w-full bg-Blanco border border-Azul-claro px-1 py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
                    />
                    <span className="font-Montserrat w-14 text-gray-900 text-xs xl:text-sm font-medium">
                      m
                    </span>
                  </div>
                  <div className="flex gap-2 w-full items-center mb-2">
                    <label className="font-Montserrat w-28 text-gray-900 text-xs xl:text-sm font-medium">
                      Peso:
                    </label>
                    <input
                      name="peso"
                      type="number"
                      min={0}
                      step={0.01}
                      value={calculoIMC.peso}
                      onChange={(e) => {
                        e.preventDefault();
                        setCalculoIMC({
                          ...calculoIMC,
                          ["peso"]: e.target.value,
                          ["imc"]: (e.target.value / calculoIMC.altura).toFixed(
                            2
                          ),
                        });
                      }}
                      className="font-Montserrat rounded-md w-full bg-Blanco border border-Azul-claro px-1 py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
                      defaultValue={""}
                    />
                    <span className="font-Montserrat w-14 text-gray-900 text-xs xl:text-sm font-medium">
                      Kg
                    </span>
                  </div>
                  <div className="flex gap-2 w-full items-center">
                    <label className="font-Montserrat w-28 text-gray-900 text-xs xl:text-sm font-medium">
                      IMC:
                    </label>
                    <input
                      id="about"
                      type="number"
                      min={0}
                      step={0.01}
                      value={calculoIMC.imc}
                      className="font-Montserrat rounded-md w-full bg-Blanco border border-Azul-claro px-1 py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
                    />
                    <span className="font-Montserrat w-14 text-gray-900 text-xs xl:text-sm font-medium">
                      {" "}
                    </span>
                  </div>
                </form>
              </div>
            </div>
            {atender === undefined ? (
              <button
                onClick={() => {
                  setOpenModal(false);
                  setPaciente(null);
                  loadHistory();
                }}
                className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-red-700 hover:text-Blanco hover:bg-red-700 transition-all duration-500"
              >
                Cerrar
              </button>
            ) : (
              <button
                onClick={async () => {
                  let response = await alertConfirm(
                    "De atender al paciente y cerar la historia",
                    "Ten cuidado de atender al paciente sin completar el proceso"
                  );
                  if (response) {
                    let response2 = await getFetchParams(
                      petitions.updateAttended,
                      paciente.id_patient
                    );
                    if (response2.status >= 400) {
                      return alertError(response2.message);
                    }
                    if (response2.status >= 200) {
                      loadListPatient()
                      setOpenModal(false);
                      console.log("aqui es opciones")
                      return alertSuccess(response2.message);
                    }
                  }
                }}
                className="px-3 py-2 border-2 w-32 xl:w-36 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-green-700 hover:text-Blanco hover:bg-green-700 transition-all duration-500"
              >
                Atender
              </button>
            )}
          </div>

          <ModalRecipe
            paciente={paciente}
            openModal={recipe}
            setOpenModal={setRecipe}
          />
          <ModalJustificativoFamiliar
            openModal={familiar}
            setOpenModal={setFamiliar}
          />
          <ModalProxCita
            paciente={paciente}
            openModal={prox}
            setOpenModal={setProx}
          />
          <ModalJustificativoPersonal
            paciente={paciente}
            openModal={personal}
            setOpenModal={setPersonal}
          />
          <ModalResumen
            paciente={paciente}
            openModal={resumen}
            setOpenModal={setResumen}
          />
          <ModalReposo
            paciente={paciente}
            openModal={reposo}
            setOpenModal={setReposo}
          />
          <ModalInformes
            paciente={paciente}
            openModal={informe}
            setOpenModal={setInforme}
          />
          <ModalReferencia
            paciente={paciente}
            openModal={referencia}
            setOpenModal={setReferencia}
          />
        </div>
      )}
    </>
  );
}

export default OpcionesHistorias;