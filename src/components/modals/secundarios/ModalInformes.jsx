import { Modal } from "flowbite-react";
import { Context } from "../../../context/Context";
import { useContext, useEffect, useState } from "react";
import formValidation from "../../../js/validations";
import { PdfModal } from "../../../pdf/PdfModal";
import { alertError, alertInfo, alertSuccess } from "../../../js/alerts";
import { petitions } from "../../../js/petitions";
import { getFetchParams, postFetchParams } from "../../../js/fetch";
import { split } from "postcss/lib/list";

export function ModalInformes({ openModal, setOpenModal, paciente }) {
  const { setContentPDF } = useContext(Context);

  const [fechaInforme, setFechaInforme] = useState("");
  const [openPdf, setOpenPdf] = useState(false);
  const [values, setValues] = useState({
    caso: "",
    tratamiento: "",
    examenes: ""
  })

  useEffect(() => {
    async function load() {
      if (openModal === true) {
        const hoy = new Date();
        const dia = hoy.getDate();
        const mes = hoy.getMonth() + 1; // Los meses empiezan desde 0
        const año = hoy.getFullYear();
        const date = `${año}-${mes < 10 ? "0" + mes : mes}-${
          dia < 10 ? "0" + dia : dia
        }`;
        const response = await getFetchParams(
          petitions.guardadosInforme,
          paciente.id_patient
        );
        if (response.status >= 400) {
          setValues({
            caso: "",
            tratamiento: "",
            examenes: "",
          });
          setFechaInforme(date);
          return;
        }
        if (response.status >= 200) {
          let fecha = response.data.fecha_informe.split("T")
          setValues({
            caso: response.data.caso_informe,
            tratamiento: response.data.tratamiento_informe,
            examenes: response.data.examenes_informe,
          });
          setFechaInforme(fecha[0])
          return;
        }
      }
    }
    load();
  }, [openModal === true]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const saveInforme = async (e) => {
    if (!formValidation.validateText(values.caso)) {
      return alertInfo("Esta vacio el campo de caso")
    }
    if (!formValidation.validateText(values.examenes)) {
      return alertInfo("Esta vacio el campo de examenes")
    }
    if (!formValidation.validateText(values.tratamiento)) {
      return alertInfo("Esta vacio el campo de tratamiento")
    }
    const response = await postFetchParams({
      caso: values.caso,
      tratamiento: values.tratamiento,
      examenes: values.examenes,
      fecha: fechaInforme
    }, petitions.guardadosInforme, paciente.id_patient)
    if (response.status >= 400) {
      return alertError(response.message)
    }
    if (response.status >= 200) {
      return alertSuccess(response.message)
    }
  };

  const crearInforme = (e) => {
    let comprobarA = formValidation.validateText(values.caso);
    let comprobarB = formValidation.validateText(values.examenes);
    let comprobarC = formValidation.validateText(values.tratamiento);
    if (!comprobarA || !comprobarB || !comprobarC) {
      return alertError(
        "No puedes crear el informe si tienes en blanco los campos del informe"
      );
    }
    let informe = [];
    if (fechaInforme != "") {
      informe.push(`Fecha de la consulta: ${fechaInforme}`)
    }
    informe.push(`El paciente: ${paciente.name_patient}, quien es portador de la C.I: ${paciente.ci_patient}`)
    informe.push(`Acudió a esta consulta por presentar caso de: ${values.caso}`)
    informe.push(`Amerita Tratamiento Continuo a base de: ${values.tratamiento}`)
    informe.push(`Debe realizarse los siguientes exámenes: ${values.examenes}`)
    setContentPDF({
      tipo: "texto",
      datos: informe,
      titulo: "",
    });
    setOpenPdf(true);
  };

  return (
    <>
      <Modal
        dismissible
        size="xl"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <h4 className="font-Montserrat font-semibold text-lg h-full leading-2 flex gap-2 items-center">
            Informe
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-end px-2 mb-2">
            <p className="text-sm">
              <b>Fecha:</b> {fechaInforme}.
            </p>
          </div>
          <div className="w-full bg-Gris-claro p-4 rounded-md border border-Azul-Oscuro">
            <form className="h-full w-full">
              <p className="text-sm font-Montserrat font-medium text-gray-900 mb-3">
                El paciente:{" "}
                <b>
                  {paciente.name_patient} C.I: {paciente.ci_patient}.
                </b>
              </p>
              <div className="flex flex-col w-full gap-1 mb-4">
                <label
                  htmlFor="caso"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Acudió a esta consulta por presentar caso de:
                </label>
                <textarea
                  name="caso"
                  value={values.caso}
                  onChange={handleInputChange}
                  rows={3}
                  className="font-Montserrat rounded-md resize-none bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                ></textarea>
              </div>

              <div className="flex flex-col w-full gap-1 mb-4">
                <label
                  htmlFor="tratamiento"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Amerita Tratamiento Continuo a base de:
                </label>
                <textarea
                  name="tratamiento"
                  value={values.tratamiento}
                  onChange={handleInputChange}
                  rows={3}
                  className="font-Montserrat rounded-md resize-none bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                ></textarea>
              </div>

              <div className="flex flex-col w-full gap-1 mb-4">
                <label
                  htmlFor="about"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Debe realizarse los siguientes exámenes:
                </label>
                <textarea
                  name="examenes"
                  value={values.examenes}
                  onChange={handleInputChange}
                  rows={3}
                  className="font-Montserrat rounded-md resize-none bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                ></textarea>
              </div>

              <div className="flex flex-col w-full gap-1 mb-4">
                <label
                  htmlFor="about"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Cambiar la fecha del informe:
                </label>
                <input
                  type="date"
                  onChange={(e) => setFechaInforme(e.target.value)}
                  value={fechaInforme}
                  className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                />
              </div>

              <div className="flex gap-3 flex-wrap justify-center items-center">
                <button
                  type="button"
                  onClick={saveInforme}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={crearInforme}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Imprimir
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    setFechaInforme("");
                  }}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Sin fecha
                </button>
                <button
                  onClick={(e) => {
                    setOpenModal(false);
                  }}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-red-700 hover:border-red-700 hover:text-white transition-all duration-300"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
          <PdfModal size={"A5"} openModal={openPdf} setOpenModal={setOpenPdf} />
        </Modal.Body>
      </Modal>
    </>
  );
}
