import { Button, Modal } from "flowbite-react";
import { FaUser, FaUserDoctor } from "react-icons/fa6";
import TinyEditor from "../editor/TinyEditor";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import OpcionesHistorias from "./OpcionesHistorias";
import Diskette from "../../../public/diskette.png";
import { getFetchParams, postFetch } from "../../js/fetch";
import { alertError, alertSuccess } from "../../js/alerts";
import { petitions } from "../../js/petitions";
import TinyEditor2 from "../editor/TinyEditor2";

export function ModalNuevo({ openModal, setOpenModal, title }) {
  const { changePatients, addListAttended, template } = useContext(Context);

  const [image, setImage] = useState(false);
  const [nuevaHistoria, setNuevaHistoria] = useState("");
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
        addListAttended(paciente.id_patient);
      }
    }
    load();
  }, [paciente]);

  useEffect(() => {
    function load() {
      loadHistory();
    }
    load();
  }, [template || openModal]);

  const loadHistory = async () => {
    setNuevaHistoria(template);
  };

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

    if (paciente === null) {
      const response = await postFetch(values, petitions.postPatient);
      if (response.status >= 400) {
        return alertError(response.message);
      } else {
        alertSuccess(response.message);
        setValues({
          ...values,
          ["id_patient"]: response.data[0].id_patient,
        });
        setPaciente(response.data[0]);
        changePatients(response.data[0])
      }
    } else {
      return;
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
          });
          setPaciente(null);
          loadHistory();
        }}
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
                    <div className="flex flex-col w-[20%] gap-1">
                      <label
                        htmlFor="ci"
                        className="text-xs xl:text-sm font-Montserrat col-span-1 font-medium h-full text-gray-900"
                      >
                        Cédula:
                      </label>
                      <input
                        name="ci"
                        value={values.ci}
                        onChange={handleInputChange}
                        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
                      />
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
                        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
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
                        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
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
                        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
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
                        onChange={handleInputChange}
                        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
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
                        onChange={handleInputChange}
                        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
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
                <button
                  type="submit"
                  className="px-2 py-1 border-2 w-24 xl:w-28 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-1 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                >
                  <a className="w-5/6">
                    {paciente === null ? "Guardar" : "Editar"}
                  </a>{" "}
                  <img src={Diskette} className="w-1/6" />
                </button>
                <button
                  onClick={(e) => {
                    setOpenModal(false);
                    setPaciente(null);
                    loadHistory();
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
                  }}
                  className="px-2 py-1 border-2 w-24 xl:w-28 justify-center bg-Blanco border-Azul-claro rounded-md text-xs xl:text-sm flex items-center gap-1 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                >
                  <a className="w-5/6">Cerrar</a>{" "}
                </button>
              </div>
            </form>
          </div>

          {paciente === null ? (
            <h6 className="bg-Gris-claro rounded-md py-8 mb-4 border border-Azul-Oscuro text-center font-Montserrat font-semibold text-base xl:text-lg">
              Guarda Primero el Paciente antes de cargar su Historia
            </h6>
          ) : (
            <section className="w-full flex min-h-[800px] gap-4">
              <div className="w-[80%] min-h-[800px] rounded-md flex flex-col bg-Gris-claro p-4 border border-Azul-Oscuro">
                <h4 className="font-Montserrat h-[25px] font-semibold text-lg xl:text-xl mb-2">
                  Historia Médica:
                </h4>
                <div className="w-full h-full bg-Blanco">
                  <TinyEditor2
                    value={nuevaHistoria}
                    setValue={setNuevaHistoria}
                  />
                </div>
              </div>

              <OpcionesHistorias loadHistory={loadHistory} paciente={paciente} historia={nuevaHistoria} setOpenModal={setOpenModal} setPaciente={setPaciente} />
            </section>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
