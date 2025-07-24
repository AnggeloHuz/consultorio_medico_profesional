import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { Context } from "../context/Context";

export function PdfModal({ openModal, setOpenModal }) {
  const { contentPDF, enterprise } = useContext(Context);

  const [value, setValue] = useState({
    tipo: "texto",
    datos: "Sin contenido",
    titulo: ""
  });
  useEffect(() => {
    function load() {}
    load();
  }, [openModal === true]);

  useEffect(() => {
    function load() {
      setValue(contentPDF);
    }
    load();
  }, [contentPDF]);

  return (
    <>
      <Modal
        dismissible
        size={"6xl"}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <div>
            <h4 className="font-Montserrat font-semibold text-lg xl:text-xl flex gap-2 items-center text-Negro">
              PDF CREADO
            </h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <section className="w-full h-[75vh]">
            <PDFViewer className="w-full h-[75vh]">
              <MyDocument titulo={value.titulo} datos={value.datos} tipo={value.tipo} enterprise={enterprise} />
            </PDFViewer>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}
