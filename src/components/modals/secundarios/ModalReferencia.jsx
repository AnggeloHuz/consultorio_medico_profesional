import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import formValidation from "../../../js/validations";
import { alertConfirm, alertError, alertInfo, alertSuccess } from "../../../js/alerts";
import { PdfModal } from "../../../pdf/PdfModal";
import { petitions } from "../../../js/petitions";
import { getFetchParams, postFetchParams } from "../../../js/fetch";

const style = {
    button: "rounded-md p-1 text-[9px] leading-2 xl:text-xs w-full border bg-white border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300",
}

export function ModalReferencia({ openModal, setOpenModal, paciente }) {
  const { setContentPDF } = useContext(Context);

  const [values, setValues] = useState({
    para: "",
    cuadro: "",
  });
  const [openPdf, setOpenPdf] = useState(false);

  useEffect(() => {
    async function load() {
      if (openModal === true) {
        const response = await getFetchParams(
          petitions.guardadosReferencia,
          paciente.id_patient
        );
        if (response.status >= 400) {
          setValues({
            para: "",
            cuadro: "",
          });
          return;
        }
        if (response.status >= 200) {
          setValues({
            para: response.data.para_referencia,
            cuadro: response.data.cuadro_referencia,
          });
        }
      }
    }
    load();
  }, [openModal === true])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const saveReferencia = async (e) => {
    if (!formValidation.validateText(values.para)) {
      return alertInfo("Esta vacio el campo de para quien es el informe")
    }
    if (!formValidation.validateText(values.cuadro)) {
      return alertInfo("Esta vacio el campo de cuadro del caso")
    }
    const response = await postFetchParams(values, petitions.guardadosReferencia, paciente.id_patient)
    if (response.status >= 400) {
      return alertError(response.message)
    }
    if (response.status >= 200) {
      return alertSuccess(response.message)
    }
  };

  const crearReferencia = (e) => {
    let comprobarA = formValidation.validateText(values.cuadro);
    let comprobarB = formValidation.validateText(values.para);
    if (!comprobarA || !comprobarB) {
      return alertError(
        "No puedes crear la referencia si tienes algun campo vacio"
      );
    }
    let referencia = [];
    referencia.push(`Para: ${values.para}.`);
    referencia.push(`De: ENDOCRINOLOGÍA-MEDICINA INTERNA.`);
    referencia.push(`Motivo: Favor evaluar al paciente:`);
    referencia.push(`${paciente.name_patient} portador de la C.I: ${paciente.ci_patient}`);
    referencia.push(`Por cuadro de: ${values.cuadro}`);
    setContentPDF({
      tipo: "texto",
      datos: referencia,
      titulo: "",
    });
    setOpenPdf(true);
  };

  const onClose = async (e) => {
    let response = await alertConfirm(
      "Deseas cerrar la ventana de referencias",
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
            Referencia
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full bg-Gris-claro p-4 rounded-md border border-Azul-Oscuro">
            <form className="h-full w-full">
              <div className="flex flex-col w-full gap-1 mb-8">
                <label
                  htmlFor="para"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Para:
                </label>
                <input
                  name="para"
                  value={values.para}
                  onChange={handleInputChange}
                  className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                />
              </div>

              <div className="flex flex-col mb-8 gap-0.5">
                <p className="font-Montserrat text-sm">
                  De: ENDOCRINOLOGÍA-MEDICINA INTERNA
                </p>
                <p className="font-Montserrat text-sm">
                  Motivo: Favor evaluar al paciente:
                </p>
                <p className="font-bold font-Montserrat text-sm">
                  Angel López. C.I. 13.896.260
                </p>
              </div>

              <div className="flex flex-col w-full gap-1 mb-6">
                <label
                  htmlFor="cuadro"
                  className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                >
                  Por cuadro de:
                </label>
                <textarea
                  name="cuadro"
                  value={values.cuadro}
                  onChange={handleInputChange}
                  className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                />
              </div>

              <div className="flex gap-3 justify-center items-center">
                <button
                  type="button"
                  onClick={saveReferencia}
                  className="text-xs p-1 bg-white w-24 rounded-md border border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={crearReferencia}
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
          <PdfModal openModal={openPdf} setOpenModal={setOpenPdf} />
        </Modal.Body>
      </Modal>
    </>
  );
}
