import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { ModalExSangre } from "./ModalExSangre";
import { Context } from "../../../context/Context";
import formValidation from "../../../js/validations";
import { alertError, alertInfo, alertSuccess } from "../../../js/alerts";
import { PdfModalCustom } from "../../../pdf/PdfModalCustom";
import { petitions } from "../../../js/petitions";
import { getFetchParams, postFetchParams } from "../../../js/fetch";

const style = {
    button: "rounded-md p-1 text-[9px] leading-2 xl:text-xs w-full border bg-white border-black hover:bg-Azul-Oscuro hover:border-Azul-Oscuro hover:text-white transition-all duration-300",
}

export function ModalRecipe({ openModal, setOpenModal, paciente }) {
  const {
    loadMedications,
    loadIndications,
    indications,
    medications,
    addMedicamento,
    deleteMedicamento,
    addIndicacion,
    deleteIndicacion
  } = useContext(Context);

  const [sangre, setSangre] = useState(false);
  const [type, setType] = useState(true);
  const [indi, setIndi] = useState([]);
  const [medi, setMedi] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [recipeMedica, setRecipeMedica] = useState("");
  const [recipeIndica, setRecipeIndica] = useState("");
  const [fechaRecipe, setFechaRecipe] = useState("");
  const [cambiarFecha, setCambiarFecha] = useState("hoy");

  const [openPdf, setOpenPdf] = useState(false);
  const [contentMedica, setContentMedica] = useState({
    tipo: "texto",
    datos: [],
    titulo: "",
  });
  const [contentIndica, setContentIndica] = useState({
    tipo: "texto",
    datos: [],
    titulo: "",
  });

  useEffect(() => {
    async function load() {
      
      if (openModal === true) {
        await loadMedications();
        await loadIndications();
        const hoy = new Date();
        const dia = hoy.getDate();
        const mes = hoy.getMonth() + 1; // Los meses empiezan desde 0
        const año = hoy.getFullYear();
        const date = `${año}-${mes < 10 ? "0" + mes : mes}-${
          dia < 10 ? "0" + dia : dia
        }`;
        setFechaRecipe(date);
        setCambiarFecha("hoy");
        const response = await getFetchParams(petitions.guardadosRecipe, paciente.id_patient)
        if (response.status >= 400) {
          setRecipeIndica("");
          setRecipeMedica("");
          return
        }
        if (response.status >= 200) {
          setRecipeIndica(response.data.indi_recipe);
          setRecipeMedica(response.data.medi_recipe);
          return
        }
      }
    }
    load();
  }, [openModal === true]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (type) {
      if (!formValidation.validateText(value)) {
        setMedi(medications)
      } else {
        const response = formValidation.searchData(medications, search, "medication", setMedi);
      }
    } else {
      if (!formValidation.validateText(value)) {
        setIndi(indications)
      } else {
        const response = formValidation.searchData(indications, search, "indication", setIndi);
      }
    }
  };

  const saveRecipe = async (e) => {
    if (!formValidation.validateText(recipeIndica)) {
      return alertInfo("Esta vacio el recipe de Indicaciones")
    }
    if (!formValidation.validateText(recipeMedica)) {
      return alertInfo("Esta vacio el recipe de Medicamentos")
    }
    let data = {
      medicamentos: recipeMedica,
      indicaciones: recipeIndica
    }
    const response = await postFetchParams(data, petitions.guardadosRecipe, paciente.id_patient)
    if (response.status >= 400) {
      return alertError(response.message)
    }
    if (response.status >= 200) {
      return alertSuccess(response.message)
    }
  };

  useEffect(() => {
    function load() {
      setIndi(indications)
    }
    load();
  }, [indications]);

  useEffect(() => {
    function load() {
      setMedi(medications)
    }
    load();
  }, [medications]);

  const addRecipeMedica = (e) => {
    if (!formValidation.validateText(search)) {
      return alertError(
        "Para agregar al recipe debe estar lleno el campo de la medicacion"
      );
    }
    setRecipeMedica(`${recipeMedica} - ${search} \n\n`);
  }

  const addRecipeIndica = (e) => {
    if (!formValidation.validateText(search)) {
      return alertError(
        "Para agregar al recipe debe estar lleno el campo de la indicacion"
      );
    }
    setRecipeIndica(`${recipeIndica} - ${search} \n\n`);
  };

  const eliminarMedicamento = (e) => {
    if (selected === "") {
      return alertError(
        "No tienes seleccionado ningun medicamento de la base de datos para eliminarlo"
      );
    }
    deleteMedicamento(`${petitions.getMedications}/${selected}`, selected);
    setSearch("");
    setSelected("");
  }

  const guardarMedicamento = (e) => {
    if (!formValidation.validateText(search)) {
      return alertError(
        "Para guardar en la base de datos este medicamento debes escribir algo en el campo"
      );
    }
    addMedicamento({ medication: search });
    setSearch("");
  }

  const eliminarIndicacion = (e) => {
    if (selected === "") {
      return alertError(
        "No tienes seleccionado ninguna indicación de la base de datos para eliminarlo"
      );
    }
    deleteIndicacion(`${petitions.getIndications}/${selected}`, selected);
    setSearch("");
    setSelected("");
  }

  const guardarIndicacion = (e) => {
    if (!formValidation.validateText(search)) {
      return alertError(
        "Para guardar en la base de datos esta indicación debes escribir algo en el campo"
      );
    }
    addIndicacion({ indication: search });
    setSearch("");
  }

  const crearRecipes = (e) => {
    const comprobarA = formValidation.validateText(recipeMedica);
    const comprobarB = formValidation.validateText(recipeIndica);

    if (!comprobarA || !comprobarB) {
      return alertError(
        "No puedes crear los recipes si no estan con contenido ambos recipes"
      );
    }

    let recipeM = [];
    let recipeI = [];
    recipeM.push(`El paciente ${paciente.name_patient}, portador de la C.I: ${paciente.ci_patient}. Amerita los siguientes medicamentos:`);
    recipeM.push(recipeMedica)
    recipeI.push(`El paciente ${paciente.name_patient}, portador de la C.I: ${paciente.ci_patient}. Amerita las siguientes indicaciones para el tratamiento con los medicamentos:`);
    recipeI.push(recipeIndica)
    setContentMedica({
      tipo: "texto",
      datos: recipeM,
      titulo: "",
    })
    setContentIndica({
      tipo: "texto",
      datos: recipeI,
      titulo: "",
    });
    setOpenPdf(true);
  };

  return (
    <>
      <Modal
        dismissible
        size="full"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <h4 className="font-Montserrat font-semibold text-lg leading-2 flex gap-2 items-center">
            Recipe Médico
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="flex gap-4 h-[600px]">
            <div className="w-8/12 h-[475px]">
              <div className="flex justify-between items-center bg-Gris-claro rounded-md border border-Azul-Oscuro mb-4 py-3 px-4">
                <h4 className="text-sm xl:text-base font-semibold">RÉCIPE</h4>
                {cambiarFecha != "sin fecha" ? (
                  <p className="text-sm xl:text-base font-medium">
                    FECHA: {fechaRecipe}
                  </p>
                ) : (
                  <p className="text-sm xl:text-base font-medium">SIN FECHA</p>
                )}
              </div>
              <article className="w-full h-full bg-Gris-claro rounded-md border border-Azul-Oscuro p-5">
                <div className="flex gap-4 mb-2">
                  <div className="w-full">
                    <h5 className="text-sm xl:text-base font-medium mb-1.5">
                      Medicamentos:
                    </h5>
                    <textarea
                      name="recipeMedica"
                      value={recipeMedica}
                      onChange={(e) => {
                        setRecipeMedica(e.target.value);
                      }}
                      className="w-full h-[300px] text-xs xl:text-sm resize-none"
                    ></textarea>
                  </div>
                  <div className="w-full">
                    <h5 className="text-sm xl:text-base font-medium mb-1.5">
                      Indicaciones:
                    </h5>
                    <textarea
                      name="recipeIndica"
                      value={recipeIndica}
                      onChange={(e) => {
                        setRecipeIndica(e.target.value);
                      }}
                      className="w-full h-[300px] text-xs xl:text-sm resize-none"
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center mb-4">
                  <div onClick={saveRecipe} className="w-1/6 px-1">
                    <button className={style.button}>Guardar</button>
                  </div>
                  <div className="w-1/6 px-1">
                    <button
                      type="button"
                      onClick={crearRecipes}
                      className={style.button}
                    >
                      Imprimir
                    </button>
                  </div>
                  <div className="w-1/6 px-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        setCambiarFecha("sin fecha");
                      }}
                      className={style.button}
                    >
                      Sin Fecha
                    </button>
                  </div>
                  <div className="w-1/6 px-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        setCambiarFecha("si");
                      }}
                      className={style.button}
                    >
                      Cambiar Fecha
                    </button>
                  </div>
                  <div className="w-1/6 px-1">
                    <button
                      onClick={(e) => setSangre(!sangre)}
                      className={style.button}
                    >
                      Exámenes Sangre
                    </button>
                  </div>
                  <div className="w-1/6 px-1">
                    <button
                      type="button"
                      onClick={(e) => setOpenModal(false)}
                      className={style.button}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  {cambiarFecha === "si" ? (
                    <input
                      type="date"
                      onChange={(e) => setFechaRecipe(e.target.value)}
                      value={fechaRecipe}
                      className="font-Montserrat rounded-md bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </article>
            </div>
            <div className="w-4/12 h-[475px]">
              <div className="flex justify-between items-center bg-Gris-claro rounded-md border border-Azul-Oscuro mb-4 py-3 px-4">
                <h4 className="text-sm xl:text-base font-semibold">
                  AYUDA DE ESCRITURA
                </h4>
              </div>
              {type ? (
                <article className="w-full h-full bg-Gris-claro rounded-md border border-Azul-Oscuro p-5">
                  <div className="w-full">
                    <h5 className="text-sm xl:text-base font-medium mb-1.5">
                      Medicamento:
                    </h5>
                    <input
                      type="text"
                      name="search"
                      value={search}
                      onChange={handleInputChange}
                      className="w-full p-2 text-xs xl:text-sm border border-gray-500 rounded-md"
                    />
                    <ul className="h-[250px] mt-3 w-full bg-white border overflow-y-auto border-gray-500 rounded-md py-2">
                      {medi.map((item) => (
                        <li
                          onClick={(e) => {
                            setSelected(item.id_medica);
                            setSearch(item.medication);
                          }}
                          className={`${
                            selected === item.id_medica ? "bg-slate-200" : ""
                          } text-xs px-2 py-1 hover:cursor-pointer hover:bg-slate-200`}
                          key={item.id_medica}
                        >
                          {item.medication}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap items-center justify-center">
                    <div className="w-1/3 px-1 mt-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          addRecipeMedica();
                          guardarMedicamento();
                        }}
                        className={style.button}
                      >
                        Aceptar y Guard
                      </button>
                    </div>
                    <div className="w-1/3 px-1 mt-4">
                      <button
                        type="button"
                        onClick={addRecipeMedica}
                        className={style.button}
                      >
                        Agregar
                      </button>
                    </div>
                    <div className="w-1/3 px-1 mt-4">
                      <button
                        type="button"
                        onClick={guardarMedicamento}
                        className={style.button}
                      >
                        Guardar
                      </button>
                    </div>
                    <div className="w-1/3 px-1 mt-2">
                      <button
                        onClick={(e) => {
                          setType(!type);
                          setSearch("");
                          setSelected("");
                        }}
                        className={style.button}
                      >
                        Indicaciones
                      </button>
                    </div>
                    <div className="w-1/3 px-1 mt-2">
                      <button
                        type="button"
                        onClick={eliminarMedicamento}
                        className={style.button}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ) : (
                <article className="w-full h-full bg-Gris-claro rounded-md border border-Azul-Oscuro p-5">
                  <div className="w-full">
                    <h5 className="text-sm xl:text-base font-medium mb-1.5">
                      Indicación:
                    </h5>
                    <input
                      type="text"
                      name="search"
                      value={search}
                      onChange={handleInputChange}
                      className="w-full p-2 text-xs xl:text-sm border border-gray-500 rounded-md"
                    />
                    <ul className="h-[250px] mt-3 w-full bg-white border overflow-y-auto border-gray-500 rounded-md py-2">
                      {indi.map((item) => (
                        <li
                          onClick={(e) => {
                            setSelected(item.id_indica);
                            setSearch(item.indication);
                          }}
                          className={`${
                            selected === item.id_indica ? "bg-slate-200" : ""
                          } text-xs px-2 py-1 hover:cursor-pointer hover:bg-slate-200`}
                          key={item.id_indica}
                        >
                          {item.indication}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap items-center justify-center">
                    <div className="w-1/3 px-1 mt-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          addRecipeIndica();
                          guardarIndicacion();
                        }}
                        className={style.button}
                      >
                        Aceptar y Guard
                      </button>
                    </div>
                    <div className="w-1/3 px-1 mt-4">
                      <button
                        type="button"
                        onClick={addRecipeIndica}
                        className={style.button}
                      >
                        Agregar
                      </button>
                    </div>
                    <div className="w-1/3 px-1 mt-4">
                      <button
                        type="button"
                        onClick={guardarIndicacion}
                        className={style.button}
                      >
                        Guardar
                      </button>
                    </div>
                    <div className="w-1/3 px-1 mt-2">
                      <button
                        onClick={(e) => {
                          setType(!type);
                          setSearch("");
                          setSelected("");
                        }}
                        className={style.button}
                      >
                        Medicamentos
                      </button>
                    </div>
                    <div className="w-1/3 px-1 mt-2">
                      <button
                        type="button"
                        onClick={eliminarIndicacion}
                        className={style.button}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              )}
            </div>
          </div>

          <ModalExSangre
            paciente={paciente}
            openModal={sangre}
            setOpenModal={setSangre}
          />
          <PdfModalCustom
            contentPDF={contentMedica}
            contentPDF2={contentIndica}
            openModal={openPdf}
            setOpenModal={setOpenPdf}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
