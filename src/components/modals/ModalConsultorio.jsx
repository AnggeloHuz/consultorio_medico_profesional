import { Button, Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { postFetch } from "../../js/fetch";
import { petitions } from "../../js/petitions";
import { alertError, alertSuccess } from "../../js/alerts";

export function ModalConsultorio({ openModal, setOpenModal }) {
  const { loadEnterprise, enterprise, setEnterprise } = useContext(Context);

  const [values, setValues] = useState({
    name: "",
    rif: "",
    phone: "",
    address: "",
    name_doc: "",
    lastname_doc: "",
    phone_doc: "",
    speciality: "",
    email: "",
  });

  useEffect(() => {
    async function load() {
      await loadEnterprise()
    }
    load();
  }, []);

  useEffect(() => {
    function load() {
      setValues({
        name: enterprise.name_enter,
        rif: enterprise.rif_enter,
        phone: enterprise.phone_enter,
        address: enterprise.address_enter,
        name_doc: enterprise.name_doc,
        lastname_doc: enterprise.lastname_doc,
        phone_doc: enterprise.phone_doc,
        speciality: enterprise.speciality_doc,
        email: enterprise.email_doc,
      })
    }
    load();
  }, [enterprise]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await postFetch(values, petitions.postEnterprise);
    if (response.status >= 400) {
      return alertError(response.message);
    } else {
      setEnterprise(response.data)
      return alertSuccess(response.message);
    }
  };

  return (
    <>
      <Modal
        dismissible
        size="4xl"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Datos del Consultorio</Modal.Header>
        <Modal.Body>
          <div className="bg-Gris-claro rounded-md p-4 mb-8 border border-Azul-Oscuro">
            <form className="mb-2">
              <h4 className="font-Montserrat font-semibold text-base xl:text-lg mb-4">
                Datos del Doctor:
              </h4>
              <div className="flex flex-col gap-4">
                <div className="flex w-full items-center gap-4">
                  <div className="flex flex-col w-[33%] gap-1">
                    <label
                      htmlFor="name_doc"
                      className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                    >
                      Nombres:
                    </label>
                    <input
                      name="name_doc"
                      value={values.name_doc}
                      onChange={handleInputChange}
                      className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                      defaultValue={""}
                    />
                  </div>
                  <div className="flex flex-col w-[33%] gap-1">
                    <label
                      htmlFor="lastname_doc"
                      className="text-xs xl:text-sm font-Montserrat col-span-1 font-medium h-full text-gray-900"
                    >
                      Apellidos:
                    </label>
                    <input
                      name="lastname_doc"
                      value={values.lastname_doc}
                      onChange={handleInputChange}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
                      defaultValue={""}
                    />
                  </div>
                  <div className="flex flex-col w-[34%] gap-1">
                    <label
                      htmlFor="phone_doc"
                      className="text-xs xl:text-sm font-Montserrat col-span-1 font-medium h-full text-gray-900"
                    >
                      Teléfono:
                    </label>
                    <input
                      name="phone_doc"
                      value={values.phone_doc}
                      onChange={handleInputChange}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="flex w-full items-center gap-4">
                  <div className="flex flex-col w-[50%] gap-1">
                    <label
                      htmlFor="speciality"
                      className="text-xs xl:text-sm font-Montserrat h-full justify-end font-medium text-gray-900"
                    >
                      Especialidad:
                    </label>
                    <input
                      name="speciality"
                      value={values.speciality}
                      onChange={handleInputChange}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                      defaultValue={""}
                    />
                  </div>
                  <div className="flex flex-col w-[50%] gap-1">
                    <label
                      htmlFor="email"
                      className="text-xs xl:text-sm font-Montserrat h-full justify-end font-medium text-gray-900"
                    >
                      Correo Electrónico:
                    </label>
                    <input
                      name="email"
                      value={values.email}
                      onChange={handleInputChange}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-Gris-claro rounded-md p-4 mb-8 border border-Azul-Oscuro">
            <form action="" className="mb-2">
              <h4 className="font-Montserrat font-semibold text-base xl:text-lg mb-4">
                Datos del Consultorio:
              </h4>
              <div className="flex flex-col gap-4">
                <div className="flex w-full items-center gap-4">
                  <div className="flex flex-col w-[33%] gap-1">
                    <label
                      htmlFor="name"
                      className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                    >
                      Nombre:
                    </label>
                    <input
                      name="name"
                      value={values.name}
                      onChange={handleInputChange}
                      className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                      defaultValue={""}
                    />
                  </div>
                  <div className="flex flex-col w-[33%] gap-1">
                    <label
                      htmlFor="rif"
                      className="text-xs xl:text-sm font-Montserrat col-span-1 font-medium h-full text-gray-900"
                    >
                      Rif-J:
                    </label>
                    <input
                      name="rif"
                      value={values.rif}
                      onChange={handleInputChange}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
                      defaultValue={""}
                    />
                  </div>
                  <div className="flex flex-col w-[34%] gap-1">
                    <label
                      htmlFor="phone"
                      className="text-xs xl:text-sm font-Montserrat col-span-1 font-medium h-full text-gray-900"
                    >
                      Teléfono:
                    </label>
                    <input
                      name="phone"
                      value={values.phone}
                      onChange={handleInputChange}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="flex w-full items-center gap-4">
                  <div className="flex flex-col w-[100%] gap-1">
                    <label
                      htmlFor="address"
                      className="text-xs xl:text-sm font-Montserrat h-full justify-end font-medium text-gray-900"
                    >
                      Dirección:
                    </label>
                    <input
                      name="address"
                      value={values.address}
                      onChange={handleInputChange}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-3 py-2 min-w-[80px] justify-center border-2 border-Azul-claro bg-Gris-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
            onClick={handleSubmit}
          >
            Actualizar
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