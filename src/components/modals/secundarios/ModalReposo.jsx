import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import formValidation from "../../../js/validations";
import { Context } from "../../../context/Context";
import { PdfModal } from "../../../pdf/PdfModal";
import { alertError, alertInfo, alertSuccess } from "../../../js/alerts";
import { getFetchParams, postFetchParams } from "../../../js/fetch";
import { petitions } from "../../../js/petitions";

export function ModalReposo({ openModal, setOpenModal, paciente }) {
  const { setContentPDF } = useContext(Context);

  const [openPdf, setOpenPdf] = useState(false);
  const [values, setValues] = useState({
    desde: "",
    hasta: "",
    reintegro: "",
    diagnostico: ""
  });

  useEffect(() => {
    async function load() {
      const hoy = new Date();
      const dia = hoy.getDate();
      const mes = hoy.getMonth() + 1; // Los meses empiezan desde 0
      const año = hoy.getFullYear();
      const date = `${año}-${mes < 10 ? "0" + mes : mes}-${
        dia < 10 ? "0" + dia : dia
      }`;
      const response = await getFetchParams(
        petitions.guardadosReposo,
        paciente.id_patient
      );
      if (response.status >= 400) {
        setValues({
          desde: date,
          hasta: "",
          reintegro: "",
          diagnostico: "",
        });
        return;
      }
      if (response.status >= 200) {
        let fechaA = response.data.desde_reposo.split("T");
        let fechaB = response.data.hasta_reposo.split("T");
        let fechaC = response.data.reintegro_reposo.split("T");
        setValues({
          desde: fechaA[0],
          hasta: fechaB[0],
          reintegro: fechaC[0],
          diagnostico: response.data.diagnostico_reposo,
        });
      }
    }
    load();
  }, [openModal === true]);

  const saveReposo = async (e) => {
    if (!formValidation.validateText(values.desde)) {
      return alertInfo("Esta vacio la fecha de incio del reposo");
    }
    if (!formValidation.validateText(values.hasta)) {
      return alertInfo("Esta vacio la fecha de finalizacion del reposo");
    }
    if (!formValidation.validateText(values.reintegro)) {
      return alertInfo("Esta vacio la fecha de reintegro despues del reposo");
    }
    if (!formValidation.validateText(values.diagnostico)) {
      return alertInfo("Esta vacio el campo de diagnostico");
    }
    const response = await postFetchParams(
      values,
      petitions.guardadosReposo,
      paciente.id_patient
    );
    if (response.status >= 400) {
      return alertError(response.message);
    }
    if (response.status >= 200) {
      return alertSuccess(response.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const crearReposo = (e) => {
    let comprobarA = formValidation.validateText(values.desde);
    let comprobarB = formValidation.validateText(values.hasta);
    let comprobarC = formValidation.validateText(values.reintegro);
    let comprobarD = formValidation.validateText(values.diagnostico);

    if (!comprobarA || !comprobarB || !comprobarC || !comprobarD) {
      return alertError(
        "No puedes crear reposo si tienes en blanco los campos solicitados"
      );
    }
    if (values.desde >= values.hasta) {
      return alertError("La fecha de finalizacion del reposo debe ser mayor a la de inicio")
    }
    let reposo = []
    reposo.push(`El paciente: ${paciente.name_patient}, portador de la C.I: ${paciente.ci_patient}. Amerita Tratamiento Médico y Reposo.`);
    reposo.push(`Desde: ${values.desde}`);
    reposo.push(`Hasta: ${values.hasta}`);
    reposo.push(`Reintegro: ${values.reintegro}`);
    reposo.push(`Por el siguiente diagnóstico: ${values.diagnostico}`);
    setContentPDF({
      tipo: "texto",
      datos: reposo,
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
            Reposo
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full bg-Gris-claro p-4 rounded-md border border-Azul-Oscuro">
            <form className="h-full w-full">
              <p className="text-sm font-Montserrat font-medium text-gray-900 mb-3">
                El paciente:{" "}
                <b>
                  {paciente.name_patient}, C.I: {paciente.ci_patient}
                </b>
              </p>

              <p className="text-sm font-Montserrat font-medium text-gray-900 mb-3">
                Amerita Tratamiento Médico y Reposo.
              </p>

              <div className="flex flex-col w-full gap-1 mb-2">
                <label
                  htmlFor="desde"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Desde:
                </label>
                <input
                  type="date"
                  name="desde"
                  value={values.desde}
                  onChange={handleInputChange}
                  className="font-Montserrat rounded-md resize-none bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                />
              </div>
              <div className="flex flex-col w-full gap-1 mb-2">
                <label
                  htmlFor="hasta"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Hasta:
                </label>
                <input
                  name="hasta"
                  value={values.hasta}
                  onChange={handleInputChange}
                  type="date"
                  className="font-Montserrat rounded-md resize-none bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                />
              </div>
              <div className="flex flex-col w-full gap-1 mb-2">
                <label
                  htmlFor="reintegro"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Reintegro:
                </label>
                <input
                  name="reintegro"
                  value={values.reintegro}
                  onChange={handleInputChange}
                  type="date"
                  className="font-Montserrat rounded-md resize-none bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                />
              </div>

              <div className="flex flex-col w-full gap-1 mb-4">
                <label
                  htmlFor="diagnostico"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Diagnóstico:
                </label>
                <textarea
                  name="diagnostico"
                  value={values.diagnostico}
                  onChange={handleInputChange}
                  rows={3}
                  className="font-Montserrat rounded-md resize-none bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                ></textarea>
              </div>

              <div className="flex gap-3 flex-wrap justify-center items-center">
                <button
                  type="button"
                  onClick={saveReposo}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={crearReposo}
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
          <PdfModal size={"A5"} openModal={openPdf} setOpenModal={setOpenPdf} />
        </Modal.Body>
      </Modal>
    </>
  );
}
