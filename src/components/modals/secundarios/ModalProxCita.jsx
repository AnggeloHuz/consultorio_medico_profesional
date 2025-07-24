import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { getFetchParams, postFetchParams } from "../../../js/fetch";
import { petitions } from "../../../js/petitions";
import { alertError, alertInfo, alertSuccess } from "../../../js/alerts";
import formValidation from "../../../js/validations";
import { Context } from "../../../context/Context";
import { PdfModal } from "../../../pdf/PdfModal";

export function ModalProxCita({ openModal, setOpenModal, paciente }) {
  const { setContentPDF } = useContext(Context);
  const [openPdf, setOpenPdf] = useState(false);
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await postFetchParams(
      { date: date },
      petitions.addProxCita,
      paciente.id_patient
    );

    if (response.status >= 400) {
      return alertError(response.message);
    } else {
      return alertSuccess(response.message);
    }
  };

  useEffect(() => {
    async function load() {
      if (openModal === true) {
        const response = await getFetchParams(
          petitions.guardadosCita,
          paciente.id_patient
        );
        if (response.status >= 400) {
          setDate("");
          return;
        }
        if (response.status >= 200) {
          let fecha = response.data.date_cita.split("T")
          setDate(fecha[0]);
        }
      }
    }
    load();
  }, [openModal === true]);

  const saveCita = async (e) => {
    if (!formValidation.validateText(date)) {
      return alertInfo("Esta vacio la fecha de la cita")
    }
    let data = {
      date: date
    }
    const response = await postFetchParams(data, petitions.guardadosCita, paciente.id_patient)
    if (response.status >= 400) {
      return alertError(response.message)
    }
    if (response.status >= 200) {
      return alertSuccess(response.message)
    }
  };

  const crearProxCita = (e) => {
    let comprobarA = formValidation.validateText(date);
    if (!comprobarA) {
      return alertError(
        "No puedes crear la próxima cita si falta la fecha de la misma"
      );
    };
    let porxCita = [];
    porxCita.push(`El paciente: ${paciente.name_patient}, portador de la C.I: ${paciente.ci_patient}. Se citará para el día: ${date}`)
    setContentPDF({
      tipo: "texto",
      datos: porxCita,
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
        onClose={() => {
          setOpenModal(false);
          setDate("");
        }}
      >
        <Modal.Header>
          <h4 className="font-Montserrat font-semibold text-lg h-full leading-2 flex gap-2 items-center">
            Agendar Próxima Cita
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full bg-Gris-claro p-4 rounded-md border border-Azul-Oscuro">
            <form onSubmit={handleSubmit} className="h-full w-full">
              <div className="flex flex-col w-full gap-1 mb-8">
                <label
                  htmlFor="about"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Seleciona la fecha que será citado el paciente:
                </label>
                <input
                  name="date"
                  type="date"
                  className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col mb-8 gap-0.5">
                <p className="font-Montserrat text-sm">
                  Se citará al paciente para el día: {date}
                </p>
              </div>

              <div className="flex gap-3 justify-center items-center flex-wrap">
                <button
                  type="button"
                  onClick={saveCita}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Guardar
                </button>
                <button
                  type="submit"
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Agendar
                </button>
                <button
                  type="button"
                  onClick={crearProxCita}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Imprimir
                </button>
                <button
                  onClick={(e) => {
                    setOpenModal(false);
                    setDate("");
                  }}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-red-700 hover:border-red-700 hover:text-white transition-all duration-300"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
          <PdfModal openModal={openPdf} setOpenModal={setOpenPdf} />
        </Modal.Body>
      </Modal>
    </>
  );
}
