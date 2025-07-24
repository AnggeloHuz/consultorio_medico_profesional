import {
  MdEditDocument,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Header from "../components/Header";
import Nav from "../components/Nav";
import {
  FcMoneyTransfer,
  FcOvertime,
  FcSearch,
  FcSurvey
} from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import TableAtendidos from "../components/TableAtendidos";
import Footer from "../components/Footer";
import { ModalCitas } from "../components/modals/ModalCItas";
import { ModalFacturas } from "../components/modals/ModalFacturas";
import Swal from 'sweetalert2'
import { ModalParams } from "../components/modals/ModalParams";
import { FaHouseMedicalCircleCheck } from "react-icons/fa6";
import { ModalConsultorio } from "../components/modals/ModalConsultorio";
import { GrDocumentConfig } from "react-icons/gr";
import { ModalPlantilla } from "../components/modals/ModalPlantilla";
import { Context } from "../context/Context";
import { alertConfirm, alertError, alertInfo, alertSuccess } from "../js/alerts";
import { deleteFetch } from "../js/fetch";
import { petitions } from "../js/petitions";
import { PdfModal } from "../pdf/PdfModal";
import { ModalBuscar } from "../components/modals/ModalBuscar";
import { ModalAtender } from "../components/modals/ModalAntender";

function Home() {
  const {
    loadListPatient,
    listPatientTrue,
    listPatientFalse,
    setListPatientTrue,
    loadPatients,
    deleteAtender,
    patients,
    loadReporte
  } = useContext(Context);

  const [list, setList] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [openModal6, setOpenModal6] = useState(false);
  const [openModal7, setOpenModal7] = useState(false);
  const [openModal8, setOpenModal8] = useState(false);
  const [openModal9, setOpenModal9] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [select, setSelect] = useState(0);
  const [selectPatient, setSelectPatient] = useState(0);
  const [pacienteAtender, SetPacienteAtender] = useState(null)

  useEffect(() => {
    async function load() {
      await loadListPatient(null)
      await loadPatients()
    }
    load();
  }, []);

  return (
    <>
      <Header />
      <Nav />

      <div className="h-[7vh] bg-Blanco">
        <ul className="flex h-full font-Montserrat font-medium text-Negro text-xs/3 xl:text-sm">
          <li
            onClick={(e) => setOpenModal(true)}
            className="flex flex-col items-center justify-center px-6 gap-1 h-full hover:bg-Azul-claro hover:cursor-pointer transition-all duration-300 w-20 xl:w-24"
          >
            <FcMoneyTransfer className="text-xl xl:text-2xl" /> Consulta
          </li>
          <li
            onClick={(e) => setOpenModal3(true)}
            className="flex flex-col items-center justify-center px-6 gap-1 h-full hover:bg-Azul-claro hover:cursor-pointer transition-all duration-300 w-20 xl:w-24"
          >
            <FcSearch className="text-xl xl:text-2xl" /> Buscar
          </li>
          <li
            onClick={(e) => setOpenModal4(true)}
            className="flex flex-col items-center justify-center px-6 gap-1 h-full hover:bg-Azul-claro hover:cursor-pointer transition-all duration-300 w-20 xl:w-24"
          >
            <FcOvertime className="text-xl xl:text-2xl" /> Citas
          </li>
          <li
            onClick={(e) => {
              loadReporte();
              setOpenPdf(true);
            }}
            className="flex flex-col items-center justify-center px-6 gap-1 h-full hover:bg-Azul-claro hover:cursor-pointer transition-all duration-300 w-20 xl:w-24"
          >
            <FcSurvey className="text-xl xl:text-2xl" /> Reportes
          </li>
          <li
            onClick={(e) => setOpenModal7(true)}
            className="flex flex-col items-center justify-center px-6 gap-1 h-full hover:bg-Azul-claro hover:cursor-pointer transition-all duration-300 w-20 xl:w-24"
          >
            <FaHouseMedicalCircleCheck className="text-xl xl:text-2xl text-red-700" />{" "}
            Consultorio
          </li>
          <li
            onClick={(e) => setOpenModal9(true)}
            className="flex flex-col items-center justify-center px-6 gap-1 h-full hover:bg-Azul-claro hover:cursor-pointer transition-all duration-300 w-20 xl:w-24"
          >
            <MdEditDocument className="text-xl xl:text-2xl text-blue-800" />{" "}
            Plantilla
          </li>
          <li
            onClick={(e) => setOpenModal8(true)}
            className="flex flex-col items-center justify-center px-6 gap-1 h-full hover:bg-Azul-claro hover:cursor-pointer transition-all duration-300 w-20 xl:w-24"
          >
            <GrDocumentConfig className="text-xl xl:text-2xl text-black" />{" "}
            Parámetros
          </li>
        </ul>
      </div>

      <main className="w-full h-[80vh] flex relative">
        <section
          className={`${
            list ? "w-1/2 h-full" : "w-[98%] h-full"
          } transition-all duration-500`}
        >
          <div className="bg-Consultorio bg-cover bg-center h-full w-full"></div>
        </section>

        <div
          className={`${
            list ? "w-[47%] h-full" : "w-[2%] h-full"
          } border border-l-Blanco flex relative transition-all duration-500`}
        >
          <div
            className={`${
              list ? "h-full w-full" : "h-full w-[0%]"
            } transition-all duration-500`}
          >
            <article
              className={`h-1/2 w-full ${
                list ? "scale-100 " : "absolute scale-0"
              }  transition-all delay-100 p-3`}
            >
              <div className="bg-gray-300 border border-Azul-Oscuro p-3 h-full w-full rounded-md flex flex-col gap-2">
                <h3 className="text-base xl:text-lg flex items-center text-Negro font-Montserrat font-semibold h-[12%]">
                  Pacientes por Atender
                </h3>
                <TableAtendidos
                  data={listPatientFalse}
                  select={select}
                  setSelect={setSelect}
                  setSelectPatient={setSelectPatient}
                />
                <div className="flex justify-end gap-2 font-Montserrat font-medium h-[12%]">
                  <button
                    onClick={(e) => {
                      loadListPatient(null);
                    }}
                    className="p-1.5 bg-Azul-claro rounded-md text-xs font-medium flex items-center justify-center w-20 hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={(e) => {
                      if (selectPatient === 0) {
                        return alertInfo("Debes seleccionar primero el paciente para atenderlo")
                      } else {
                        for (let i = 0; i < patients.length; i++) {
                        if (patients[i].id_patient === selectPatient) {
                          SetPacienteAtender(patients[i]);
                        }
                      }
                      setOpenModal6(true);
                      }
                    }}
                    className="p-1.5 bg-Verde-claro rounded-md text-xs font-medium flex items-center justify-center w-20 hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                  >
                    Atender
                  </button>
                  <button
                    onClick={async (e) => {
                      const response = await deleteFetch(
                        petitions.addListAttended + select
                      );
                      if (response.status >= 400) {
                        alertError(response.message);
                      }
                      if (response.status >= 200) {
                        alertSuccess(response.message);
                        deleteAtender(select);
                      }
                    }}
                    className="p-1.5 bg-Rojo-claro rounded-md text-xs font-medium flex items-center justify-center w-20 hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
            <article
              className={`h-1/2 w-full ${
                list ? "scale-100" : "absolute scale-0"
              } transition-all delay-100 p-3`}
            >
              <div className="bg-gray-300 border border-Azul-Oscuro p-3 h-full w-full rounded-md flex flex-col gap-2">
                <h3 className="text-base xl:text-lg flex items-center text-Negro font-Montserrat font-semibold h-[12%]">
                  Pasientes Atendidos
                </h3>
                <TableAtendidos data={listPatientTrue} />
                <div className="flex justify-end gap-2 font-Montserrat font-medium h-[12%]">
                  <button
                    onClick={(e) => {
                      setListPatientTrue([]);
                      alertSuccess("Limpiaste la lista de atendidos");
                    }}
                    className="p-1.5 bg-Azul-claro rounded-md text-xs font-medium flex items-center w-20 justify-center hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                  >
                    Limpiar
                  </button>
                  <button className="p-1.5 bg-Verde-claro rounded-md text-xs font-medium flex items-center w-20 justify-center hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500">
                    Buscar
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <button
          className={`z-10 h-full w-[3%] absolute right-0 bg-Azul-claro flex items-center justify-center`}
          onClick={(e) => setList(!list)}
        >
          {list ? (
            <MdKeyboardDoubleArrowRight className="text-2xl" />
          ) : (
            <MdKeyboardDoubleArrowLeft className="text-2xl" />
          )}
        </button>

        <ModalBuscar
          openModal={openModal3}
          setOpenModal={setOpenModal3}
          title={"Buscar Historia Clínica"}
        />
        <ModalCitas openModal={openModal4} setOpenModal={setOpenModal4} />
        <ModalFacturas
          pacienteAtender={pacienteAtender}
          SetPacienteAtender={SetPacienteAtender}
          openModal={openModal}
          setOpenModal={setOpenModal}
          title={"Facturación"}
        />
        <ModalAtender
          pacienteAtender={pacienteAtender}
          openModal={openModal6}
          setOpenModal={setOpenModal6}
          title={"Atender"}
        />
        <ModalParams openModal={openModal8} setOpenModal={setOpenModal8} />
        <ModalConsultorio openModal={openModal7} setOpenModal={setOpenModal7} />
        <ModalPlantilla openModal={openModal9} setOpenModal={setOpenModal9} />
        <PdfModal openModal={openPdf} setOpenModal={setOpenPdf} />
      </main>

      <Footer />
    </>
  );
}

export default Home;
