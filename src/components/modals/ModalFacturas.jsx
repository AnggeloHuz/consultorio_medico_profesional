import { Button, Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import Autocomplete from "../form/Autocomplete";
import { Context } from "../../context/Context";
import { getFetchParams, postFetch, postFetchParams } from "../../js/fetch";
import { petitions } from "../../js/petitions";
import { alertError, alertSuccess } from "../../js/alerts";
import OpcionesHistorias from "./OpcionesHistorias";
import TinyEditor2 from "../editor/TinyEditor2";
import TinyEditor from "../editor/TinyEditor";

export function ModalFacturas({ openModal, setOpenModal }) {
  const { patients, loadParametros, parameters, addListAttended, changePatients } = useContext(Context);
  const [image, setImage] = useState(false);
  const [paciente, setPaciente] = useState(null);
  const [moneda, setMoneda] = useState("$");
  const [typePaciente, setTypePaciente] = useState(null);
  const [mostrarHistoria, setMostrarHistoria] = useState(false);
  const [historia, setHistoria] = useState("")
  const [values, setValues] = useState({
    id_patient: 0,
    name: "",
    ci: "",
    age: 0,
    fn: "",
    sex: "",
    address: "",
    phone: "",
    email: "",
    date: "",
    bolivares: 0,
    dolares: 0,
    estado: "",
    motivo: "",
    metodo: "",
    fecha: "",
    hora: ""
  });

  useEffect(() => {
    function load() {
      if (paciente === null) {
        return setValues({
          id_patient: 0,
          name: "",
          ci: "",
          age: 0,
          fn: "",
          sex: "",
          address: "",
          phone: "",
          email: "",
          date: "",
          bolivares: 0,
          dolares: 0,
          estado: "",
          motivo: "",
          metodo: "",
          fecha: "",
          hora: "",
        });
      } else {
        setValues({
          id_patient: paciente.id_patient,
          name: paciente.name_patient,
          ci: paciente.ci_patient,
          age: paciente.age_patient,
          fn: paciente.fn_patient,
          sex: paciente.sex_patient,
          address: paciente.address_patient,
          phone: paciente.phone_patient,
          email: paciente.email_patient,
          date: paciente.date_patient,
          bolivares: 0,
          dolares: 0,
          estado: "",
          motivo: "",
          metodo: "",
          fecha: "",
          hour: ""
        })
      }
    }
    load();
  }, [paciente]);

  useEffect(() => {
    function load() {
      setTypePaciente(null)
      loadParametros()
      setPaciente(null)
      setMostrarHistoria(false)
    }
    load()
  }, [openModal === true])

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputChangeMoney = (e) => {
    const { name, value } = e.target;
    let cambio = 0;
    if (moneda === "$") {
      cambio = (
        value * parameters.parametros_individuales.precio_divisa
      ).toFixed(2);
      setValues({
        ...values,
        [name]: value,
        ["bolivares"]: cambio,
      });
    } else {
      cambio = (
        value / parameters.parametros_individuales.precio_divisa
      ).toFixed(2);
      setValues({
        ...values,
        [name]: value,
        ["dolares"]: cambio,
      });
    }
  };

  const loadHistory = async () => {
    const response = await getFetchParams(
      petitions.getHistory,
      paciente.id_patient
    );
    if (response.status >= 400) {
      setHistoria("");
    } else {
      setHistoria(response.data[0].history);
      setMostrarHistoria(true)
    }
  };

  const handleSubmit = async (e) => {
    if (typePaciente === "nuevo") {
      // Si el paciente es nuevo
      const responseAdd = await postFetch(values, petitions.postPatient);
      if (responseAdd.status >= 400) {
        return alertError(responseAdd.message);
      } 
      if (responseAdd.status >= 200) {
        setPaciente(responseAdd.data[0])
        setValues({
          ...values,
          ["id_patient"]: responseAdd.data[0].id_patient,
        });
        changePatients(responseAdd.data[0]);
      }

      // Ahora guardamos la consulta
      const response = await postFetchParams(
        values,
        petitions.addConsulta,
        responseAdd.data[0].id_patient
      );
      if (response.status >= 400) {
        return alertError(response.message);
      }
      if (response.status >= 200) {
        alertSuccess(response.message);

        const responseHistory = await getFetchParams(
          petitions.getHistory,
          responseAdd.data[0].id_patient
        );
        if (responseHistory.status >= 400) {
          setHistoria("");
        } else {
          setHistoria(responseHistory.data[0].history);
          setMostrarHistoria(true);
          addListAttended(responseAdd.data[0].id_patient);
        }
      }
    } else {
      // Si el paciente es regular
      const response2 = await postFetchParams(
        values,
        petitions.addConsulta,
        paciente.id_patient
      );
      if (response2.status >= 400) {
        return alertError(response2.message);
      }
      if (response2.status >= 200) {
        alertSuccess(response2.message);
        await loadHistory();
        addListAttended(paciente.id_patient);
      }
    }
  };

  return (
    <>
      <Modal
        dismissible
        size={"[80%]"}
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setValues({
            id_patient: 0,
            name: "",
            ci: "",
            age: 0,
            fn: "",
            sex: "",
            address: "",
            phone: "",
            email: "",
            date: "",
            bolivares: 0,
            dolares: 0,
            estado: "",
            motivo: "",
            metodo: "",
            fecha: "",
            hour: "",
          });
          setPaciente(null);
          setHistoria("");
          setMostrarHistoria(false);
        }}
      >
        <Modal.Header>
          {" "}
          <div>
            <h4 className="font-Montserrat font-semibold text-lg xl:text-xl flex gap-2 items-center text-Negro">
              Consulta
            </h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          {typePaciente === null ? (
            <div className="bg-Gris-claro rounded-md p-4 border border-Azul-Oscuro">
              <h5 className="font-Montserrat font-semibold text-sm xl:text-base mb-4">
                Seleccionado que tipo de paciente es:
              </h5>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    setTypePaciente("nuevo");
                  }}
                  className={`${
                    typePaciente === "nuevo"
                      ? "bg-Azul-Oscuro border-Azul-Oscuro text-Blanco"
                      : "bg-Blanco border-Azul-claro"
                  } px-2 py-1 border-2 w-32 xl:w-36 justify-center rounded-md text-xs xl:text-sm flex items-center gap-1 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500`}
                >
                  Nuevo Paciente
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    setTypePaciente("regular");
                  }}
                  className={`${
                    typePaciente === "regular"
                      ? "bg-Azul-Oscuro border-Azul-Oscuro text-Blanco"
                      : "bg-Blanco border-Azul-claro"
                  } px-2 py-1 border-2 w-32 xl:w-36 justify-center rounded-md text-xs xl:text-sm flex items-center gap-1 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500`}
                >
                  Paciente Regular
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}

          {typePaciente === null ? (
            <></>
          ) : (
            <>
              <div className="bg-Gris-claro rounded-md p-4 mb-8 border border-Azul-Oscuro">
                <form className="mb-10">
                  <h4 className="font-Montserrat font-semibold text-sm xl:text-base mb-4">
                    Datos Personales:
                  </h4>
                  <div className="flex gap-4 h-full">
                    <div className="w-[82.5%] flex flex-col gap-4">
                      <div className="flex w-full items-center gap-4">
                        <div className="flex flex-col w-[20%] gap-1">
                          <label
                            htmlFor="id_patient"
                            className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                          >
                            Historia N°:
                          </label>
                          <input
                            name="id_patient"
                            value={values.id_patient}
                            onChange={handleInputChange}
                            disabled={true}
                            className="font-Montserrat rounded-md bg-slate-200 border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                          />
                        </div>
                        <div className="flex flex-col w-[20%] gap-1 relative">
                          <label
                            htmlFor="ci"
                            className="text-xs xl:text-sm font-Montserrat col-span-1 font-medium h-full text-gray-900"
                          >
                            Cédula:
                          </label>
                          {paciente === null && typePaciente === "regular" ? (
                            <Autocomplete
                              data={patients}
                              setPacientes={setPaciente}
                            />
                          ) : (
                            <input
                              name="ci"
                              value={values.ci}
                              onChange={handleInputChange}
                              className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
                            />
                          )}
                        </div>
                        <div className="flex flex-col w-[60%] gap-1">
                          <label
                            htmlFor="name"
                            className="text-xs xl:text-sm font-Montserrat col-span-1 font-medium h-full text-gray-900"
                          >
                            Nombres y Apellidos:
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            disabled={
                              typePaciente === "regular"
                                ? paciente === null
                                  ? true
                                  : false
                                : false
                            }
                            className={`${
                              paciente === null && typePaciente === "regular"
                                ? "bg-slate-200"
                                : "bg-Blanco"
                            } font-Montserrat w-full rounded-md border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro`}
                          />
                        </div>
                      </div>

                      <div className="flex w-full items-center gap-4">
                        <div className="flex flex-col w-[78.5%] gap-1">
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
                            disabled={
                              typePaciente === "regular"
                                ? paciente === null
                                  ? true
                                  : false
                                : false
                            }
                            className={`${
                              paciente === null && typePaciente === "regular"
                                ? "bg-slate-200"
                                : "bg-Blanco"
                            } font-Montserrat w-full rounded-md border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro`}
                          />
                        </div>

                        <div className="flex flex-col w-[22.5%] gap-1">
                          <label
                            htmlFor="phone"
                            className="text-xs xl:text-sm font-Montserrat font-medium h-full text-gray-900"
                          >
                            Teléfono:
                          </label>
                          <input
                            name="phone"
                            value={values.phone}
                            onChange={handleInputChange}
                            disabled={
                              typePaciente === "regular"
                                ? paciente === null
                                  ? true
                                  : false
                                : false
                            }
                            className={`${
                              paciente === null && typePaciente === "regular"
                                ? "bg-slate-200"
                                : "bg-Blanco"
                            } font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro`}
                          />
                        </div>
                      </div>

                      <div className="flex w-full items-center gap-4">
                        <div className="flex flex-col w-[20%] gap-1">
                          <label
                            htmlFor="fn"
                            className="text-xs xl:text-sm font-Montserrat font-medium h-full text-gray-900"
                          >
                            Fecha de Nacimiento:
                          </label>
                          <input
                            name="fn"
                            disabled={
                              typePaciente === "regular"
                                ? paciente === null
                                  ? true
                                  : false
                                : false
                            }
                            onChange={(e) => {
                              const { name, value } = e.target;
                              let fn = value.split("-");
                              const hoy = new Date();
                              const año = hoy.getFullYear();
                              setValues({
                                ...values,
                                ["age"]: Number(año) - Number(fn[0]),
                                [name]: value,
                              });
                            }}
                            type="date"
                            className={`${
                              paciente === null && typePaciente === "regular"
                                ? "bg-slate-200"
                                : "bg-Blanco"
                            } font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro`}
                          />
                        </div>

                        <div className="flex flex-col w-[7.5%] gap-1">
                          <label
                            htmlFor="age"
                            className="text-xs xl:text-sm font-Montserrat col-span-1 font-medium h-full text-gray-900"
                          >
                            Edad:
                          </label>
                          <input
                            name="age"
                            type="number"
                            min={0}
                            value={values.age}
                            disabled={
                              typePaciente === "regular"
                                ? paciente === null
                                  ? true
                                  : false
                                : false
                            }
                            onChange={handleInputChange}
                            className={`${
                              paciente === null && typePaciente === "regular"
                                ? "bg-slate-200"
                                : "bg-Blanco"
                            } font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro`}
                          />
                        </div>

                        <div className="flex flex-col w-[40%] gap-1">
                          <label
                            htmlFor="about"
                            className="text-xs xl:text-sm font-Montserrat font-medium h-full text-gray-900"
                          >
                            Correo Electrónico:
                          </label>
                          <input
                            name="email"
                            value={values.email}
                            disabled={
                              typePaciente === "regular"
                                ? paciente === null
                                  ? true
                                  : false
                                : false
                            }
                            onChange={handleInputChange}
                            className={`${
                              paciente === null && typePaciente === "regular"
                                ? "bg-slate-200"
                                : "bg-Blanco"
                            } font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro`}
                          />
                        </div>
                        <div className="flex flex-col w-[20%] gap-2">
                          <label
                            htmlFor="option1"
                            className="text-xs xl:text-sm font-Montserrat font-medium h-full text-gray-900"
                          >
                            Género:
                          </label>
                          <div className=" col-span-2 flex items-center gap-4">
                            <div className="h-full flex items-center gap-1">
                              <input
                                type="radio"
                                id="option1"
                                name="sex"
                                value={"M"}
                                onChange={handleInputChange}
                                disabled={
                                  typePaciente === "regular"
                                    ? paciente === null
                                      ? true
                                      : false
                                    : false
                                }
                                defaultChecked={
                                  paciente === null
                                    ? false
                                    : paciente.sex_patient == "M"
                                }
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:border-Azul-Oscuro checked:bg-Azul-Oscuro"
                              />
                              <label
                                htmlFor=""
                                className="font-Montserrat text-xs xl:text-sm"
                              >
                                Masculino
                              </label>
                            </div>

                            <div className="h-full flex items-center gap-1">
                              <input
                                type="radio"
                                id="option2"
                                name="sex"
                                value={"F"}
                                onChange={handleInputChange}
                                disabled={
                                  typePaciente === "regular"
                                    ? paciente === null
                                      ? true
                                      : false
                                    : false
                                }
                                defaultChecked={
                                  paciente === null
                                    ? false
                                    : paciente.sex_patient == "F"
                                }
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:border-Azul-Oscuro checked:bg-Azul-Oscuro"
                              />
                              <label
                                htmlFor="option2"
                                className="font-Montserrat text-xs xl:text-sm"
                              >
                                Femenino
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[15%] h-full flex flex-col gap-1">
                      <label
                        htmlFor="about"
                        className="text-xs xl:text-sm font-Montserrat font-medium h-full text-gray-900"
                      >
                        Fotografía:
                      </label>
                      <div className="flex flex-col justify-between h-[175px]">
                        <div className="h-full w-full flex justify-center items-center rounded-md bg-gray-400 relative">
                          {image ? (
                            <img
                              src={`${image}`}
                              className="w-full h-full rounded-md"
                              alt=""
                            />
                          ) : (
                            <FaUser className="w-[80px] h-[80px] text-white" />
                          )}
                          <input
                            type="file"
                            onChange={onImageChange}
                            className="w-full absolute h-full opacity-0 hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-Gris-claro rounded-md p-4 mb-8 border border-Azul-Oscuro">
                <form>
                  <h4 className="font-Montserrat font-semibold text-sm xl:text-base mb-4">
                    Datos de la Consulta:
                  </h4>

                  <div className="w-full gap-6 flex mb-4">
                    <div className="flex flex-col w-[25%] gap-1">
                      <label
                        htmlFor="about"
                        className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                      >
                        Estatus:
                      </label>
                      <select
                        name="estado"
                        value={values.estado}
                        onChange={handleInputChange}
                        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                      >
                        {parameters.estado_paciente.length === 0 ? (
                          <option value="">No hay opciones</option>
                        ) : (
                          <>
                            <option value="">Selecciona</option>
                            {parameters.estado_paciente.map((item) => (
                              <option key={item.id_ep} value={item.name_ep}>
                                {item.name_ep}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                    <div className="flex flex-col w-[25%] gap-1">
                      <label
                        htmlFor="about"
                        className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                      >
                        Motivos:
                      </label>
                      <select
                        name="motivo"
                        value={values.motivo}
                        onChange={handleInputChange}
                        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                      >
                        {parameters.motivos_consulta.length === 0 ? (
                          <option value="">No hay opciones</option>
                        ) : (
                          <>
                            <option value="">Selecciona</option>
                            {parameters.motivos_consulta.map((item) => (
                              <option key={item.id_mc} value={item.name_mc}>
                                {item.name_mc}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                    <div className="flex flex-col w-[25%] gap-1">
                      <label
                        htmlFor="about"
                        className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                      >
                        Fecha:
                      </label>
                      <input
                        name="fecha"
                        value={values.fecha}
                        onChange={handleInputChange}
                        type="date"
                        className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                      />
                    </div>
                    <div className="flex flex-col w-[25%] gap-1">
                      <label
                        htmlFor="about"
                        className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                      >
                        Hora:
                      </label>
                      <input
                        name="hora"
                        value={values.hora}
                        onChange={handleInputChange}
                        type="time"
                        className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                      />
                    </div>
                  </div>
                  <div className="w-full gap-6 flex">
                    <div className="flex flex-col w-[25%] gap-1">
                      <label
                        htmlFor="about"
                        className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                      >
                        Método de pago:
                      </label>
                      <select
                        name="metodo"
                        value={values.metodo}
                        onChange={handleInputChange}
                        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                      >
                        {parameters.metodos_pago.length === 0 ? (
                          <option value="">No hay opciones</option>
                        ) : (
                          <>
                            <option value="">Selecciona</option>
                            {parameters.metodos_pago.map((item) => (
                              <option key={item.id_mp} value={item.name_mp}>
                                {item.name_mp}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                    <div className="flex flex-col w-[50%] gap-1">
                      <label
                        htmlFor="about"
                        className="text-xs xl:text-sm font-Montserrat w-auto font-medium h-full text-gray-900"
                      >
                        Monto:
                      </label>
                      <div className="flex gap-6">
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            id="opt1"
                            name="moneda"
                            value={"$"}
                            onChange={(e) => {
                              setMoneda(e.target.value);
                            }}
                            defaultChecked
                          />
                          <input
                            id="about"
                            name="dolares"
                            type="number"
                            value={values.dolares}
                            onChange={handleInputChangeMoney}
                            min={0.0}
                            step={0.01}
                            className={`${
                              moneda === "bs" ? "bg-slate-200" : "bg-Blanco"
                            } font-Montserrat rounded-md border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro`}
                            disabled={moneda === "bs" ? true : false}
                          />
                          <span>$.</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            id="opt2"
                            name="moneda"
                            value={"bs"}
                            onChange={(e) => {
                              setMoneda(e.target.value);
                            }}
                          />
                          <input
                            id="about"
                            name="bolivares"
                            type="number"
                            min={0.0}
                            step={0.01}
                            value={values.bolivares}
                            onChange={handleInputChangeMoney}
                            className={`${
                              moneda === "$" ? "bg-slate-200" : "bg-Blanco"
                            } font-Montserrat rounded-md border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro`}
                            disabled={moneda === "$" ? true : false}
                          />
                          <span>Bs.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {mostrarHistoria ? (
                <section className="w-full flex min-h-[800px] gap-4">
                  <div className="w-[80%] min-h-[800px] rounded-md flex flex-col bg-Gris-claro p-4 border border-Azul-Oscuro">
                    <h4 className="font-Montserrat h-[25px] font-semibold text-lg xl:text-xl mb-2">
                      Historia Médica:
                    </h4>
                    <div className="w-full h-full bg-Blanco">
                      <TinyEditor2 value={historia} setValue={setHistoria} />
                    </div>
                  </div>

                  <OpcionesHistorias
                    loadHistory={() => {}}
                    paciente={paciente}
                    historia={historia}
                    setOpenModal={setOpenModal}
                    setPaciente={setPaciente}
                  />
                </section>
              ) : (
                <></>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {typePaciente === null ? (
            <></>
          ) : (
            <>
              <button
                className="px-3 py-2 border-2 w-[100px] justify-center border-Azul-claro bg-Gris-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                color="gray"
                onClick={handleSubmit}
              >
                Procesar
              </button>
              <button
                className="px-3 py-2 border-2 w-[100px] justify-center border-Azul-claro bg-Gris-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-red-700 hover:text-Blanco hover:bg-red-700 transition-all duration-500"
                color="gray"
                onClick={() => {
                  setPaciente(null);
                  setTypePaciente(null);
                  setHistoria("");
                  setMostrarHistoria(false);
                }}
              >
                Cancelar
              </button>
            </>
          )}
          <button
            className="px-3 py-2 border-2 w-[100px] justify-center border-Azul-claro bg-Gris-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-red-700 hover:text-Blanco hover:bg-red-700 transition-all duration-500"
            color="gray"
            onClick={() => {
              setPaciente(null);
              setTypePaciente(null);
              setHistoria("");
              setMostrarHistoria(false);
              setOpenModal(false);
            }}
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}