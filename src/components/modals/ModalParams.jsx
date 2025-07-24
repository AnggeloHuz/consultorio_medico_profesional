import { Button, Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { deleteFetch, postFetch } from "../../js/fetch";
import { petitions } from "../../js/petitions";
import { alertError, alertSuccess } from "../../js/alerts";

export function ModalParams({ openModal, setOpenModal }) {
  const { loadParametros, parameters, setParameters } = useContext(Context);

  const [values, setValues] = useState({
    precio_consulta: 0,
    precio_divisa: 0,
    dias_recordatorio: 0,
    estado_paciente: [],
    motivos_consulta: [],
    metodos_pago: []
  })
  const [valuesInd, setValuesInd] = useState({
    ep: "",
    mc: "",
    mp: ""
  })
  const [valuesIndDel, setValuesIndDel] = useState({
    ep_del: "",
    mc_del: "",
    mp_del: ""
  })

  useEffect(() => {
    async function load() {
      await loadParametros()
    }
    load()
  }, [openModal === true])

  useEffect(() => {
    function load() {
      setValues({
        precio_consulta: parameters.parametros_individuales.precio_consulta,
        precio_divisa: parameters.parametros_individuales.precio_divisa,
        dias_recordatorio: parameters.parametros_individuales.dias_recordatorio,
        estado_paciente: parameters.estado_paciente,
        motivos_consulta: parameters.motivos_consulta,
        metodos_pago: parameters.metodos_pago
      })
    }
    load()
  }, [parameters])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputChangeInd = (e) => {
    const { name, value } = e.target;
    setValuesInd({
      ...valuesInd,
      [name]: value,
    });
  };

  const handleInputChangeIndDel = (e) => {
    const { name, value } = e.target;
    setValuesIndDel({
      ...valuesIndDel,
      [name]: value,
    });
  };

  const handleSubmit = async (data, path) => {
    const response = await postFetch(data, path);
    if (response.status >= 400) {
      return alertError(response.message);
    } else {
      alertSuccess(response.message);
      setParameters(response.data);
    }
  };

  const handleSubmit2 = async (path, id) => {
    if (id === "") {
      return alertError("No seleccionaste ninguna opción")
    }

    const response = await deleteFetch(path);
    if (response.status >= 400) {
      return alertError(response.message);
    } else {
      alertSuccess(response.message);
      setParameters(response.data);
    }
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
          {" "}
          <div>
            <h4 className="font-Montserrat font-semibold text-lg xl:text-xl flex gap-2 items-center text-Negro">
              Parámetros
            </h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-Gris-claro rounded-md p-4 mb-8 border border-Azul-Oscuro">
            <form>
              <h4 className="font-Montserrat font-semibold text-base xl:text-lg mb-4">
                Parámetros del sistema:
              </h4>
              <div className="flex flex-col w-full gap-1">
                <label
                  htmlFor="precio_consulta"
                  className="text-xs xl:text-sm font-Montserrat font-semibold h-full text-gray-900"
                >
                  Precio Consulta "$":
                </label>
                <div className="flex gap-3 mb-4">
                  <input
                    name="precio_consulta"
                    value={values.precio_consulta}
                    onChange={handleInputChange}
                    type="number"
                    min={0}
                    className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(
                        { precio_consulta: values.precio_consulta },
                        petitions.getParametros + "/pc"
                      );
                    }}
                    className="px-3 py-2 border-2 bg-Azul-Oscuro rounded-md text-xs xl:text-sm flex items-center gap-2 text-white hover:bg-Azul-claro hover:text-black transition-all duration-500"
                  >
                    Guardar
                  </button>
                </div>
              </div>

              <div className="flex flex-col w-full gap-1">
                <label
                  htmlFor="precio_divisa"
                  className="text-xs xl:text-sm font-Montserrat font-semibold h-full text-gray-900"
                >
                  Precio de la Divisa "Bs":
                </label>
                <div className="flex gap-3 mb-4">
                  <input
                    value={values.precio_divisa}
                    onChange={handleInputChange}
                    name="precio_divisa"
                    type="number"
                    min={0}
                    className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(
                        { precio_divisa: values.precio_divisa },
                        petitions.getParametros + "/pd"
                      );
                    }}
                    className="px-3 py-2 border-2 bg-Azul-Oscuro rounded-md text-xs xl:text-sm flex items-center gap-2 text-white hover:bg-Azul-claro hover:text-black transition-all duration-500"
                  >
                    Guardar
                  </button>
                </div>
              </div>

              <div className="flex flex-col w-full gap-1">
                <label
                  htmlFor="dias_recordatorio"
                  className="text-xs xl:text-sm font-Montserrat font-semibold h-full text-gray-900"
                >
                  Días de Recordatorios:
                </label>
                <div className="flex gap-3 mb-4">
                  <input
                    value={values.dias_recordatorio}
                    onChange={handleInputChange}
                    name="dias_recordatorio"
                    type="number"
                    min={0}
                    className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(
                        { dias_recordatorio: values.dias_recordatorio },
                        petitions.getParametros + "/dr"
                      );
                    }}
                    className="px-3 py-2 border-2 bg-Azul-Oscuro rounded-md text-xs xl:text-sm flex items-center gap-2 text-white hover:bg-Azul-claro hover:text-black transition-all duration-500"
                  >
                    Guardar
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-col w-full gap-1">
                  <label
                    htmlFor="ep"
                    className="text-xs xl:text-sm font-Montserrat font-semibold h-full text-gray-900"
                  >
                    Estatus Paciente:
                  </label>
                  <div className="flex gap-3 mb-2">
                    <input
                      type="text"
                      name="ep"
                      value={valuesInd.ep}
                      onChange={handleInputChangeInd}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(
                          { statusp: valuesInd.ep },
                          petitions.getParametros + "/ep"
                        );
                        setValuesInd({
                          ep: "",
                          mc: valuesInd.mc,
                          mp: valuesInd.mp,
                        });
                      }}
                      className="px-3 py-2 border-2 bg-Azul-Oscuro rounded-md text-xs xl:text-sm flex items-center gap-2 text-white hover:bg-Azul-claro hover:text-black transition-all duration-500"
                    >
                      Guardar
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <select
                      name="ep_del"
                      value={valuesIndDel.ep_del}
                      onChange={handleInputChangeIndDel}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                    >
                      {values.estado_paciente.length === 0 ? (
                        <option value="">No hay opciones</option>
                      ) : (
                        <>
                          <option value="">Selecciona</option>
                          {values.estado_paciente.map((item) => (
                            <option key={item.id_ep} value={item.id_ep}>
                              {item.name_ep}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit2(
                          petitions.deleteParametros +
                            "ep/" +
                            valuesIndDel.ep_del,
                            valuesIndDel.ep_del
                        );
                        setValuesIndDel({
                          ep_del: "",
                          mc_del: valuesIndDel.mc_del,
                          mp_del: valuesIndDel.mp_del,
                        });
                      }}
                      className="px-3 py-2 border-2 bg-Azul-Oscuro rounded-md text-xs xl:text-sm flex items-center gap-2 text-white hover:bg-red-700 transition-all duration-500"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex flex-col w-full gap-1">
                  <label
                    htmlFor="mp"
                    className="text-xs xl:text-sm font-Montserrat font-semibold h-full text-gray-900"
                  >
                    Métodos de Pago:
                  </label>
                  <div className="flex gap-3 mb-2">
                    <input
                      type="text"
                      name="mp"
                      value={valuesInd.mp}
                      onChange={handleInputChangeInd}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(
                          { metodosp: valuesInd.mp },
                          petitions.getParametros + "/mp"
                        );
                        setValuesInd({
                          ep: valuesInd.ep,
                          mc: valuesInd.mc,
                          mp: "",
                        });
                      }}
                      className="px-3 py-2 border-2 bg-Azul-Oscuro rounded-md text-xs xl:text-sm flex items-center gap-2 text-white hover:bg-Azul-claro hover:text-black transition-all duration-500"
                    >
                      Guardar
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <select
                      name="mp_del"
                      value={valuesIndDel.mp_del}
                      onChange={handleInputChangeIndDel}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                    >
                      {values.metodos_pago.length === 0 ? (
                        <option value="">No hay opciones</option>
                      ) : (
                        <>
                          <option value="">Selecciona</option>
                          {values.metodos_pago.map((item) => (
                            <option key={item.id_mp} value={item.id_mp}>
                              {item.name_mp}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit2(
                          petitions.deleteParametros +
                            "mp/" +
                            valuesIndDel.mp_del,
                            valuesIndDel.mp_del
                        );
                        setValuesIndDel({
                          ep_del: valuesIndDel.ep_del,
                          mc_del: valuesIndDel.mc_del,
                          mp_del: "",
                        });
                      }}
                      className="px-3 py-2 border-2 bg-Azul-Oscuro rounded-md text-xs xl:text-sm flex items-center gap-2 text-white hover:bg-red-700 transition-all duration-500"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-col w-full gap-1">
                  <label
                    htmlFor="mc"
                    className="text-xs xl:text-sm font-Montserrat font-semibold h-full text-gray-900"
                  >
                    Motivos de Consulta:
                  </label>
                  <div className="flex gap-3 mb-2">
                    <input
                      type="text"
                      name="mc"
                      value={valuesInd.mc}
                      onChange={handleInputChangeInd}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(
                          { motivosc: valuesInd.mc },
                          petitions.getParametros + "/mc"
                        );
                        setValuesInd({
                          ep: valuesInd.ep,
                          mc: "",
                          mp: valuesInd.mp,
                        });
                      }}
                      className="px-3 py-2 border-2 bg-Azul-Oscuro rounded-md text-xs xl:text-sm flex items-center gap-2 text-white hover:bg-Azul-claro hover:text-black transition-all duration-500"
                    >
                      Guardar
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <select
                      name="mc_del"
                      value={valuesIndDel.mc_del}
                      onChange={handleInputChangeIndDel}
                      className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                    >
                      {values.motivos_consulta.length === 0 ? (
                        <option value="">No hay opciones</option>
                      ) : (
                        <>
                          <option value="">Selecciona</option>
                          {values.motivos_consulta.map((item) => (
                            <option key={item.id_mc} value={item.id_mc}>
                              {item.name_mc}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit2(
                          petitions.deleteParametros +
                            "mc/" +
                            valuesIndDel.mc_del,
                          valuesIndDel.mc_del
                        );
                        setValuesIndDel({
                          ep_del: valuesIndDel.ep_del,
                          mc_del: "",
                          mp_del: valuesIndDel.mp_del,
                        });
                      }}
                      className="px-3 py-2 border-2 bg-Azul-Oscuro rounded-md text-xs xl:text-sm flex items-center gap-2 text-white hover:bg-red-700 transition-all duration-500"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-3 py-2 border-2 border-Azul-claro bg-Gris-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-red-700 hover:text-Blanco hover:bg-red-700 transition-all duration-500"
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