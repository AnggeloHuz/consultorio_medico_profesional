import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { Context } from "../context/Context";
import MyDocument2Pages from "./MyDocument2Pages";

export function PdfModalCustom({ openModal, setOpenModal, contentPDF, contentPDF2 }) {
  const { enterprise } = useContext(Context);

  const [value, setValue] = useState({
    tipo: "texto",
    datos: "Sin contenido",
    titulo: ""
  });
  const [value2, setValue2] = useState({
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

  useEffect(() => {
    function load() {
      setValue2(contentPDF2);
    }
    load();
  }, [contentPDF2]);

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
              <MyDocument2Pages
                titulo={value.titulo}
                datos={value.datos}
                datos2={value2.datos}
                tipo={value.tipo}
                enterprise={enterprise}
              />
            </PDFViewer>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}
