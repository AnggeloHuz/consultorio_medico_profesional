import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { PdfModal } from "../../../pdf/PdfModal";

const style = {
  button:
    "rounded-md p-1 text-[9px] leading-2 xl:text-xs w-full border bg-white border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300",
};

export function ModalJustificativoPersonal({ paciente, openModal, setOpenModal }) {
  const { setContentPDF } = useContext(Context);
  const [openPdf, setOpenPdf] = useState(false);
  const [fechaJustificativo, setFechaJustificativo] = useState("");

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
    }
    load();
  }, [openModal === true]);

  const generarJustificativo = (e) => {
    let justificativo = [];
    justificativo.push(
      "Por la presente hago constar que el. Paciente: " +
        paciente.name_patient +
        ", portador de la C.I: " +
        paciente.ci_patient +
        ", asisitió el día hoy " +
        fechaJustificativo +
        " a la consulta Médica."
    );
    setContentPDF({
      tipo: "texto",
      datos: justificativo,
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
            Justificativo Peronal
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-end px-2 mb-2">
            <p className="text-sm">
              <b>Fecha:</b> {fechaJustificativo}.
            </p>
          </div>
          <div className="w-full bg-Gris-claro p-4 rounded-md border border-Azul-Oscuro">
            <form className="h-full w-full">
              <div className="flex flex-col w-full gap-1 mb-3">
                <p className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900">
                  Por la presente hago constar que{" "}
                  {paciente.sex_patient == 0 ? "la" : "el"}. Paciente:{" "}
                  <b>{paciente.name_patient}.</b> portador de la{" "}
                  <b>C.I: {paciente.ci_patient}.</b>
                </p>
              </div>

              <div className="flex flex-col mb-3 gap-0.5">
                <p className="font-Montserrat text-sm">
                  Asistió el día hoy a la consulta Médica.
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

              <div className="flex gap-3 justify-center items-center flex-wrap">
                <button
                  type="button"
                  onClick={generarJustificativo}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Imprimir
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
          <PdfModal openModal={openPdf} setOpenModal={setOpenPdf} />
        </Modal.Body>
      </Modal>
    </>
  );
}
