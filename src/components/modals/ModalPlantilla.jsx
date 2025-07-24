import { Modal } from "flowbite-react";
import TinyEditor2 from "../editor/TinyEditor2";
import { useContext, useEffect, useState } from "react";
import { getFetch, postFetch } from "../../js/fetch";
import { petitions } from "../../js/petitions";
import { alertError, alertSuccess } from "../../js/alerts";
import formValidation from "../../../../RaceManager-Proyecto/RaceManager/Client/src/validations/formValidation";
import { Context } from "../../context/Context";

export function ModalPlantilla({ openModal, setOpenModal }) {
  const { template, setTemplate } = useContext(Context);

  const [value, setValue] = useState("")

  useEffect(() => {
    async function load() {
      const response = await getFetch(petitions.getTemplate);
      if (response.status >= 400) {
        return alertError(response.message);
      } else {
        console.log(response.message);
        return setTemplate(response.data.content_template);
      }
    }
    load();
  }, [openModal == true]);

  useEffect(() => {
    async function load() {
      setValue(template)
    }
    load();
  }, [template]);

  useEffect(() => {
    async function load() {
      setValue(template)
    }
    load();
  }, [openModal == false]);

  const validation = () => {
    let error = formValidation.validateText(template.toString());
    if (!error)
      return "No puede actualizar la plantilla sin nada escrito dentro del editor de texto";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verification = validation();
    if (verification) return alertError(verification);

    const response = await postFetch(
      {
        content: value,
      },
      petitions.addTemplate
    );
    if (response.status >= 400) {
      return alertError(response.message);
    } else {
      alertSuccess(response.message);
      console.log(response);
      setTemplate(response.data[0].content_template)
      return setValue(response.data[0].content_template);
    }
  };

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
              Plantilla de Historias
            </h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <section className="w-full flex h-auto gap-4">
            <div className="w-full h-full rounded-md flex flex-col bg-Gris-claro p-4 border border-Azul-Oscuro">
              <div className="w-full h-full bg-Blanco">
                <TinyEditor2 template={template} openModal={openModal} value={value} setValue={setValue} />
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-3 py-2 min-w-[80px] justify-center border-2 border-Azul-claro bg-Gris-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
            onClick={handleSubmit}
          >
            Guardar
          </button>
          <button
            className="px-3 py-2 min-w-[80px] justify-center border-2 border-Azul-claro bg-Gris-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-red-700 hover:text-Blanco hover:bg-red-700 transition-all duration-500"
            color="gray"
            onClick={() => setOpenModal(false)}
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
