import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import formValidation from "../../../js/validations";
import { alertConfirm, alertError, alertInfo, alertSuccess } from "../../../js/alerts";
import { PdfModal } from "../../../pdf/PdfModal";
import { getFetchParams, postFetchParams } from "../../../js/fetch";
import { petitions } from "../../../js/petitions";

export function ModalResumen({ openModal, setOpenModal, paciente }) {
  const { setContentPDF } = useContext(Context);

  const [resumen, setResumen] = useState("");
  const [openPdf, setOpenPdf] = useState(false);
  const [size, setSize] = useState("A4");

  useEffect(() => {
    async function load() {
      if (openModal === true) {
        const response = await getFetchParams(
          petitions.guardadosResumen,
          paciente.id_patient
        );
        if (response.status >= 400) {
          setResumen("");
          return;
        }
        if (response.status >= 200) {
          setResumen(response.data.contenido_resumen)
        }
      }
    }
    load();
  }, [openModal === true]);

  const saveResumen = async (e) => {
    if (!formValidation.validateText(resumen)) {
      return alertInfo("Esta vacio el resumen del caso")
    }
    let data = {
      contenido: resumen
    }
    const response = await postFetchParams(data, petitions.guardadosResumen, paciente.id_patient)
    if (response.status >= 400) {
      return alertError(response.message)
    }
    if (response.status >= 200) {
      return alertSuccess(response.message)
    }
  };

  const crearResumen = () => {
    const comprobar = formValidation.validateText(resumen)
    if (!comprobar) {
      return alertError("No puedes crear el resumen del caso vacio")
    }
    let resumenCaso = [];
    resumenCaso.push(`El paciente ${paciente.name_patient} que asistió a consulta, presenta el caso que acontinuación se describe:`)
    resumenCaso.push(resumen)
    setContentPDF({
      tipo: "texto",
      datos: resumenCaso,
      titulo: "",
    });
    setOpenPdf(true);
  }

  const onClose = async (e) => {
    let response = await alertConfirm(
      "Deseas cerrar la ventana de resumen del caso",
      "Debes tener más precaución para cerrar esta ventana si no has guardado los cambios"
    );
    if (response) {
      setOpenModal(false);
    }
  };

  return (
    <>
      <Modal
        dismissible
        size="xl"
        show={openModal}
        onClose={onClose}
      >
        <Modal.Header>
          <h4 className="font-Montserrat font-semibold text-lg h-full leading-2 flex gap-2 items-center">
            Resumen del Caso
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full bg-Gris-claro p-4 rounded-md border border-Azul-Oscuro">
            <form className="h-full w-full">
              <div className="flex flex-col w-full gap-1 mb-4">
                <textarea
                  name="resumen"
                  value={resumen}
                  onChange={(e) => setResumen(e.target.value)}
                  rows={12}
                  className="font-Montserrat rounded-md resize-none bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                ></textarea>
              </div>
              <div className="flex gap-3 flex-wrap justify-center items-center">
                <button
                  type="button"
                  onClick={saveResumen}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    setSize("A4");
                    crearResumen()
                  }}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Imprimir G
                </button>
                <button
                  onClick={(e) => {
                    setSize("A5");
                    crearResumen()
                  }}
                  type="button"
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Imprimir P
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-red-700 hover:border-red-700 hover:text-white transition-all duration-300"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
          <PdfModal size={size} openModal={openPdf} setOpenModal={setOpenPdf} />
        </Modal.Body>
      </Modal>
    </>
  );
}
