import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import formValidation from "../../../js/validations";
import { alertConfirm, alertError } from "../../../js/alerts";
import { Context } from "../../../context/Context";
import { PdfModal } from "../../../pdf/PdfModal";

const style = {
    button: "rounded-md p-1 text-[9px] leading-2 xl:text-xs w-full border bg-white border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300",
}

export function ModalJustificativoFamiliar({ openModal, setOpenModal }) {
  const { setContentPDF } = useContext(Context);

  const [fechaJustificativo, setFechaJustificativo] = useState("");
  const [familiar, setFamiliar] = useState("");
  const [openPdf, setOpenPdf] = useState(false);

  useEffect(() => {
    function load() {
      const hoy = new Date();
      const dia = hoy.getDate();
      const mes = hoy.getMonth() + 1; // Los meses empiezan desde 0
      const año = hoy.getFullYear();
      const date = `${año}-${mes < 10 ? "0" + mes : mes}-${
        dia < 10 ? "0" + dia : dia
      }`;
      setFechaJustificativo(date);
      setFamiliar("");
    }
    load();
  }, [openModal === true]);

  const crearJustificativo = (e) => {
    let comprobar = formValidation.validateText(familiar);
    let comprobar2 = formValidation.validateText(fechaJustificativo);
    if (!comprobar) {
      return alertError(
        "No puedes crear el justificativo sin el nombre del familiar"
      );
    }
    if (!comprobar2) {
      return alertError(
        "No puedes crear el justificativo sin la fecha del mismo"
      );
    }
    let justificativo = [];
    justificativo.push(
      `Por la presente hago constar que el Sr. (a): ${familiar}.`
    );
    justificativo.push(
      `Acompaño a su Familiar a la consulta Médica el día de hoy ${fechaJustificativo}.`
    );
    setContentPDF({
      tipo: "texto",
      datos: justificativo,
      titulo: "",
    });
    setOpenPdf(true);
  };

  const onClose = async (e) => {
    let response = await alertConfirm(
      "Deseas cerrar la ventana de justificativo del familiar",
      "Debes tener más precaución para cerrar esta ventana si no has creado el justificativo"
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
            Justificativo Familiar
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-end px-2 mb-2">
            <p className="text-sm">
              <b>Fecha:</b> {fechaJustificativo}
            </p>
          </div>
          <div className="w-full bg-Gris-claro p-4 rounded-md border border-Azul-Oscuro">
            <form className="h-full w-full">
              <div className="flex flex-col w-full gap-1 mb-8">
                <label
                  htmlFor="familiar"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Por la presente hago constar que el Sr. (a):
                </label>
                <input
                  name="familiar"
                  value={familiar}
                  onChange={(e) => setFamiliar(e.target.value)}
                  className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                />
              </div>

              <div className="flex flex-col mb-1 gap-0.5">
                <p className="font-Montserrat text-sm">
                  Acompaño a su Familiar a la consulta Médica el día de hoy
                </p>
              </div>
              <div className="mb-6">
                <input
                  type="date"
                  onChange={(e) => setFechaJustificativo(e.target.value)}
                  value={fechaJustificativo}
                  className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                />
              </div>

              <div className="flex gap-3 justify-center items-center">
                <button
                  type="button"
                  onClick={crearJustificativo}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Imprimir
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
          <PdfModal size={"A5"} openModal={openPdf} setOpenModal={setOpenPdf} />
        </Modal.Body>
      </Modal>
    </>
  );
}
