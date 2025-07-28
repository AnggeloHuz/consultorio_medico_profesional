import { Button, Modal } from "flowbite-react";
import { FaUser, FaUserDoctor } from "react-icons/fa6";
import TinyEditor from "../editor/TinyEditor";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import OpcionesHistorias from "./OpcionesHistorias";
import Diskette from "../../../public/diskette.png";
import { getFetch, getFetchParams, postFetch } from "../../js/fetch";
import { alertConfirm, alertError, alertSuccess } from "../../js/alerts";
import { petitions } from "../../js/petitions";
import Autocomplete from "../form/Autocomplete";

export function ModalBuscar({ openModal, setOpenModal, icon, title }) {
  const { patients, editPatient } = useContext(Context);

  const [image, setImage] = useState(false);
  const [historia, setHistoria] = useState("");
  const [paciente, setPaciente] = useState(null);
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
        });
      } else {
        let fn = paciente.fn_patient.split("-");
        const hoy = new Date();
        const año = hoy.getFullYear();
        const mes = hoy.getMonth() + 1;
        const dia = hoy.getDate();
        setValues({
          id_patient: paciente.id_patient,
          name: paciente.name_patient,
          ci: paciente.ci_patient,
          age:
            mes > fn[1]
              ? Number(año) - Number(fn[0])
              : mes === fn[1]
              ? dia >= fn[2]
                ? Number(año) - Number(fn[0])
                : Number(año) - Number(fn[0]) - 1
              : Number(año) - Number(fn[0]) - 1,
          fn: paciente.fn_patient,
          sex: paciente.sex_patient,
          address: paciente.address_patient,
          phone: paciente.phone_patient,
          email: paciente.email_patient,
          date: paciente.date_patient,
        });
        loadHistory()
      }
    }
    load();
  }, [paciente]);

  const loadHistory = async () => {
    const response = await getFetchParams(petitions.getHistory, paciente.id_patient)
    if (response.status >= 400) {
      setHistoria("")
      return alertError(response.message)
    } else {
      setHistoria(response.data[0].history)
      return alertSuccess(response.message)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await alertConfirm(
      "Vas a actualizar los datos del paciente con los que se muestra en el formulario",
      "Debes estar más atento para no perder los datos que tenia anteriormente el paciente al actualizar"
    );
    if (response) {
      editPatient(petitions.updatePatient, values.id_patient, values);
    }
  };

  const onClose = async (e) => {
    e.preventDefault()
    let response = await alertConfirm(
      "Vas a cerrar el buscador de historias, eso quiere decir que ya terminaste de hacer los cambios a la historia buscada o cualquier acción",
      "Debes estar más atento para no perder los cambios realizados si no los has guardado"
    );
    if (response) {
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
      });
      setPaciente(null);
    }
  };

  return (
    <>
      <Modal
        dismissible
        size={"[80%]"}
        show={openModal}
        onClose={onClose}
      >
        <Modal.Header>
          <div>
            <h4 className="font-Montserrat font-semibold text-lg xl:text-xl flex gap-2 items-center text-Negro">
              {title}
            </h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-Gris-claro rounded-md p-4 mb-8 border border-Azul-Oscuro">
            <form onSubmit={handleSubmit} className="mb-4">
              <h4 className="font-Montserrat font-semibold text-base xl:text-lg mb-4">
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
                      {paciente === null ? (
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
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
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
                        disabled={paciente === null ? true : false}
                        className={`${
                          paciente === null ? "bg-slate-200" : "bg-Blanco"
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
                        disabled={paciente === null ? true : false}
                        className={`${
                          paciente === null ? "bg-slate-200" : "bg-Blanco"
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
                        value={values.fn}
                        disabled={paciente === null ? true : false}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          let fn = value.split("-");
                          const hoy = new Date();
                          const año = hoy.getFullYear();
                          const mes = hoy.getMonth() + 1;
                          const dia = hoy.getDate()
                          setValues({
                            ...values,
                            ["age"]:
                              mes > fn[1]
                                ? Number(año) - Number(fn[0])
                                : mes === fn[1]
                                ? dia >= fn[2]
                                  ? Number(año) - Number(fn[0])
                                  : Number(año) - Number(fn[0]) - 1
                                : Number(año) - Number(fn[0]) - 1,
                            [name]: value,
                          });
                        }}
                        type="date"
                        className={`${
                          paciente === null ? "bg-slate-200" : "bg-Blanco"
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
                        disabled={true}
                        onChange={handleInputChange}
                        className={`bg-slate-200 font-Montserrat w-full rounded-md border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro`}
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
                        disabled={paciente === null ? true : false}
                        onChange={handleInputChange}
                        className={`${
                          paciente === null ? "bg-slate-200" : "bg-Blanco"
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
                            disabled={paciente === null ? true : false}
                            checked={paciente === null ? false : (values.sex == "M") ? true : false}
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
                            disabled={paciente === null ? true : false}
                            checked={paciente === null ? false : (values.sex == "F") ? true : false}
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

              <div className="flex mt-6 gap-4">
                {paciente === null ? (
                  <></>
                ) : (
                  <button
                    type="submit"
                    className="px-2 py-1 border-2 w-24 xl:w-28 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-1 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                  >
                    <a className="w-5/6">Actualizar</a>{" "}
                    <img src={Diskette} className="w-1/6" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-2 py-1 border-2 w-24 xl:w-28 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-1 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                >
                  <a className="w-5/6">Cerrar</a>{" "}
                </button>
              </div>
            </form>
          </div>

          <h6
            className={`${
              paciente === null ? "visible" : "hidden"
            } bg-Gris-claro rounded-md py-8 mb-4 border border-Azul-Oscuro text-center font-Montserrat font-semibold text-base xl:text-lg`}
          >
            Carga Primero el Paciente antes de cargar su Historia Clínica
          </h6>

          <section
            className={`${
              paciente === null ? "hidden" : "visible"
            } w-full flex min-h-[800px] gap-4`}
          >
            <div className="w-[80%] min-h-[800px] rounded-md flex flex-col bg-Gris-claro p-4 border border-Azul-Oscuro">
              <h4 className="font-Montserrat h-[25px] font-semibold text-lg xl:text-xl mb-2">
                Historia Médica:
              </h4>
              <div className="w-full h-full bg-Blanco">
                <TinyEditor value={historia} setValue={setHistoria} />
              </div>
            </div>

            <OpcionesHistorias loadHistory={() => {}} paciente={paciente} historia={historia} setOpenModal={setOpenModal} setPaciente={setPaciente} />
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}
