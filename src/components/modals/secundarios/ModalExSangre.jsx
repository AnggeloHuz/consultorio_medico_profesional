import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import formValidation from "../../../js/validations";
import { Context } from "../../../context/Context";
import { PdfModal } from "../../../pdf/PdfModal";
import { alertError } from "../../../js/alerts";

const hematologicos = [
    {value: "Hematología Completa", name: "HematologiaCompleta"},
    {value: "Frotis de Sangre Periferica", name: "FrotisSangrePeriferica"},
    {value: "Hemoglobina Glicosilada", name: "HemoglobinaGlicosilada"},
    {value: "Grupo Sanguineo y Factor RH", name: "SanguíneoRH"},
    {value: "Recuento Eosinófilos", name: "RecuentoEosinofilos"},
    {value: "Reticulositos", name: "Reticulositos"},
    {value: "Sedimentación Globular", name: "SedimentacionGlobular"}
]

const coagulacion = [
    {value: "Tiempo de Sangría", name: ""},
    {value: "Tiempo de Coagulación", name: ""},
    {value: "Tiempo de Protombina", name: ""},
    {value: "Tiempo Parcial de Tromboplastina Activa", name: ""},
    {value: "Fibrinógeno", name: ""},
    {value: "Retracción Coágulo", name: ""},
    {value: "Antitrombina III", name: ""},
    {value: "Plasminógeno", name: ""},
]

const drogas = [
    {value: "Ácido Valporico", name: ""},
    {value: "Amikacina", name: ""},
    {value: "Carbamazepina", name: ""},
    {value: "Ciclosporina", name: ""},
    {value: "Digoxina", name: ""},
    {value: "Ferilhidantonía", name: ""},
    {value: "Fenobarbital", name: ""},
    {value: "Gentamicina", name: ""},
    {value: "Litio", name: ""},
    {value: "Lidocaína", name: ""},
    {value: "Teofilina", name: ""},
    {value: "Tobramicina", name: ""},
]

const orina = [
    {value: "Exámen General", name: ""},
    {value: "Análisis Cálculos", name: ""},
    {value: "Proteínas Bence Jones", name: ""},
    {value: "Recuento Minutado", name: ""},
]

const quimica = [
    {value: "Ácido Láctico", name: ""},
    {value: "Ácido Único", name: ""},
    {value: "Amilasa", name: ""},
    {value: "Bilirubina Total", name: ""},
    {value: "Bilirubina Fraccionada", name: ""},
    {value: "Calcio", name: ""},
    {value: "Cloro", name: ""},
    {value: "Colesterol Total", name: ""},
    {value: "Colesterol HDL", name: ""},
    {value: "Colesterol LDL", name: ""},
    {value: "Colesterol VLDL", name: ""},
    {value: "Creatinina", name: ""},
    {value: "C.P.K.", name: ""},
    {value: "C.K.M.B.", name: ""},
    {value: "Electroforesis de Proteínas", name: ""},
    {value: "Electroforesis de Lipoproteínas", name: ""},
    {value: "Electroforesis de Hemoglobina", name: ""},
    {value: "Electrolitos Séricos", name: ""},
    {value: "Fosfatasa Ácida", name: ""},
    {value: "Fosfatasa Alcalina", name: ""},
    {value: "Fósforo", name: ""},
    {value: "Gaces Arteriales", name: ""},
    {value: "Gamma Glutamil Transpeptidasa", name: ""},
    {value: "Glucosa", name: ""},
    {value: "Hierro Sérico", name: ""},
    {value: "Lipasa", name: ""},
    {value: "Lípidos Totales", name: ""},
    {value: "L.D.H.", name: ""},
    {value: "Magnesio", name: ""},
    {value: "Nitrógeno Úreico", name: ""},
    {value: "Potasio", name: ""},
    {value: "Proteínas Totales", name: ""},
    {value: "Proteínas Fraccionadas", name: ""},
    {value: "Sodio", name: ""},
    {value: "Triglicéridos", name: ""},
    {value: "Troponina", name: ""},
    {value: "T.G.O", name: ""},
    {value: "T.G.P", name: ""}
]

const hormonales = [
    {value: "Androstenediona", name: ""},
    {value: "Cortisol", name: ""},
    {value: "D.H.E.A.S", name: ""},
    {value: "Estirol", name: ""},
    {value: "F.S.H", name: ""},
    {value: "Gonadotrofina C", name: ""},
    {value: "Hormona de Crecimiento", name: ""},
    {value: "Insulina", name: ""},
    {value: "L.H.", name: ""},
    {value: "Parathormona", name: ""},
    {value: "Progresterona", name: ""},
    {value: "Prolactina", name: ""},
    {value: "PSA Total", name: ""},
    {value: "PSA Libre", name: ""},
    {value: "Renina", name: ""},
    {value: "T.S.H.", name: ""},
    {value: "Testosterona Total", name: ""},
    {value: "Testosterona Libre", name: ""},
    {value: "T3 Total", name: ""},
    {value: "T4 Libre", name: ""},
    {value: "T3 Total", name: ""},
    {value: "T4 Libre", name: ""},
]

const funcionales = [
    {value: "Prueba de Embarazo", name: ""},
    {value: "Tolerancia Glucosa", name: ""},
    {value: "Espermograma", name: ""},
]

const heces = [
    {value: "Exámen General", name: ""},
    {value: "Sangre Oculta", name: ""},
    {value: "Leucocitograma", name: ""},
]

const serologicos = [
    {value: "Alfafetoproteinas", name: ""},
    {value: "Alfa I Antitripsina", name: ""},
    {value: "A.S.T.O", name: ""},
    {value: "Anticuerpos Nucleares", name: ""},
    {value: "Anticuerpos Antitiroideos", name: ""},
    {value: "Antigeno Australia", name: ""},
    {value: "C.E.A.", name: ""},
    {value: "Comp. C3, C4, Ch50", name: ""},
    {value: "Inmunoglobulina AGM", name: ""},
    {value: "Inmunoglobulina E", name: ""},
    {value: "L.E. Test", name: ""},
    {value: "Monotest", name: ""},
    {value: "P.C.R. - US", name: ""},
    {value: "R.A. Test", name: ""},
    {value: "Toxoplasmosis", name: ""},
    {value: "Widal", name: ""},
    {value: "F.T.A.", name: ""},
    {value: "V.D.R.L.", name: ""},
    {value: "Eosinofilos Moco Nasal", name: ""},
    {value: "H.I.V.", name: ""},
]

export function ModalExSangre({ openModal, setOpenModal, paciente }) {
  const { setContentPDF } = useContext(Context);

  const [openPdf, setOpenPdf] = useState(false);
  const [values, setValues] = useState({
    hematologicos: [],
    coagulacion: [],
    drogas: [],
    orina: [],
    quimica: [],
    hormonales: [],
    funcionales: [],
    heces: [],
    serologicos: [],
    otros: ""
  })

  useEffect(() => {
    setValues({
      hematologicos: [],
      coagulacion: [],
      drogas: [],
      orina: [],
      quimica: [],
      hormonales: [],
      funcionales: [],
      heces: [],
      serologicos: [],
      otros: "",
    });
  }, [openModal === true]);
  
  const crearExSangre = (e) => {
    e.preventDefault();
    let claves = Object.keys(values);
    let exSangre = [];
    exSangre.push(`El paciente ${paciente.name_patient}, portador de la C.I: ${paciente.ci_patient}. Debe realizarce los siguientes tipos de exámenes:`)
    for (let i = 0; i < claves.length; i++) {
      let clave = claves[i];
      if (clave != "otros" && values[clave].length > 0) {
        let texto =
          "(" +
          clave.toUpperCase() +
          "), son los siguientes: ";
        values[clave].forEach((text, key) => {
          key === 0 ? (texto = texto + text) : (texto = texto + ", " + text);
        });
        exSangre.push(texto);
      } else if (
        clave === "otros" &&
        formValidation.validateText(values[clave]) === true
      ) {
        let texto =
          "(OTROS) son los siguietes: " +
          values[clave];
        exSangre.push(texto);
      }
    }

    if (exSangre.length === 1) {
      return alertError(
        "No se puede crear el recipe para exámenes de sangre por no seleccionaste ningun tipo de examen"
      );
    }

    setContentPDF({
      tipo: "texto",
      datos: exSangre,
      titulo: "",
    });
    setOpenPdf(true);
  };

  return (
    <>
      <Modal
        dismissible
        size="7xl"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <h4 className="font-Montserrat font-semibold text-lg h-full leading-2 flex gap-2 items-center">
            Exámenes de Laboratorio
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="p-2">
            <form
              onSubmit={crearExSangre}
              className="h-full w-full grid grid-cols-4 gap-3"
            >
              <div className="flex flex-col gap-3 h-full">
                <div className="p-3 bg-Gris-claro rounded-md border border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    HEMATOLÓGICOS
                  </h5>
                  <ul className="flex flex-col gap-1">
                    {hematologicos.map(({ value, name }, key) => (
                      <li className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          name={name}
                          value={value}
                          onChangeCapture={(e) => {
                            if (e.target.checked) {
                              setValues({
                                ...values,
                                ["hematologicos"]: [
                                  ...values.hematologicos,
                                  e.target.value,
                                ],
                              });
                            } else {
                              setValues({
                                ...values,
                                ["hematologicos"]: values.hematologicos.filter(
                                  (item) => item !== e.target.value
                                ),
                              });
                            }
                          }}
                          id="option2"
                          className="appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:bg-Azul-Oscuro"
                        />
                        <label
                          htmlFor=""
                          className="font-Montserrat text-xs font-medium h-full text-gray-900 "
                        >
                          {value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-Gris-claro rounded-md border border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    COAGULACIÓN
                  </h5>
                  <ul className="flex flex-col gap-1">
                    {coagulacion.map(({ value, name }, key) => (
                      <li className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          name={name}
                          value={value}
                          onChangeCapture={(e) => {
                            if (e.target.checked) {
                              setValues({
                                ...values,
                                ["coagulacion"]: [
                                  ...values.coagulacion,
                                  e.target.value,
                                ],
                              });
                            } else {
                              setValues({
                                ...values,
                                ["coagulacion"]: values.coagulacion.filter(
                                  (item) => item !== e.target.value
                                ),
                              });
                            }
                          }}
                          id="option2"
                          className="appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:bg-Azul-Oscuro"
                        />
                        <label
                          htmlFor=""
                          className="font-Montserrat text-xs font-medium h-full text-gray-900 "
                        >
                          {value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 h-full bg-Gris-claro rounded-md border border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    DROGAS
                  </h5>
                  <ul className="flex flex-col gap-1">
                    {drogas.map(({ value, name }, key) => (
                      <li className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          name={name}
                          value={value}
                          onChangeCapture={(e) => {
                            if (e.target.checked) {
                              setValues({
                                ...values,
                                ["drogas"]: [...values.drogas, e.target.value],
                              });
                            } else {
                              setValues({
                                ...values,
                                ["drogas"]: values.drogas.filter(
                                  (item) => item !== e.target.value
                                ),
                              });
                            }
                          }}
                          id="option2"
                          className="appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:bg-Azul-Oscuro"
                        />
                        <label
                          htmlFor=""
                          className="font-Montserrat text-xs font-medium h-full text-gray-900 "
                        >
                          {value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="h-full">
                <div className="p-3 h-full bg-Gris-claro rounded-md border border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    QUÍMICA
                  </h5>
                  <ul className="flex flex-col gap-1">
                    {quimica.map(({ value, name }, key) => (
                      <li className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          name={name}
                          value={value}
                          onChangeCapture={(e) => {
                            if (e.target.checked) {
                              setValues({
                                ...values,
                                ["quimica"]: [
                                  ...values.quimica,
                                  e.target.value,
                                ],
                              });
                            } else {
                              setValues({
                                ...values,
                                ["quimica"]: values.quimica.filter(
                                  (item) => item !== e.target.value
                                ),
                              });
                            }
                          }}
                          id="option2"
                          className="appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:bg-Azul-Oscuro"
                        />
                        <label
                          htmlFor=""
                          className="font-Montserrat text-xs font-medium h-full text-gray-900 "
                        >
                          {value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 h-full">
                <div className="p-3 bg-Gris-claro rounded-md border h-full border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    HORMONALES
                  </h5>
                  <ul className="flex flex-col gap-1">
                    {hormonales.map(({ value, name }, key) => (
                      <li className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          name={name}
                          value={value}
                          onChangeCapture={(e) => {
                            if (e.target.checked) {
                              setValues({
                                ...values,
                                ["hormonales"]: [
                                  ...values.hormonales,
                                  e.target.value,
                                ],
                              });
                            } else {
                              setValues({
                                ...values,
                                ["hormonales"]: values.hormonales.filter(
                                  (item) => item !== e.target.value
                                ),
                              });
                            }
                          }}
                          id="option2"
                          className="appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:bg-Azul-Oscuro"
                        />
                        <label
                          htmlFor=""
                          className="font-Montserrat text-xs font-medium h-full text-gray-900 "
                        >
                          {value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 h-full bg-Gris-claro rounded-md border border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    FUNCIONALES
                  </h5>
                  <ul className="flex flex-col gap-1">
                    {funcionales.map(({ value, name }, key) => (
                      <li className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          name={name}
                          value={value}
                          onChangeCapture={(e) => {
                            if (e.target.checked) {
                              setValues({
                                ...values,
                                ["funcionales"]: [
                                  ...values.funcionales,
                                  e.target.value,
                                ],
                              });
                            } else {
                              setValues({
                                ...values,
                                ["funcionales"]: values.funcionales.filter(
                                  (item) => item !== e.target.value
                                ),
                              });
                            }
                          }}
                          id="option2"
                          className="appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:bg-Azul-Oscuro"
                        />
                        <label
                          htmlFor=""
                          className="font-Montserrat text-xs font-medium h-full text-gray-900 "
                        >
                          {value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 h-full bg-Gris-claro rounded-md border border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    HECES
                  </h5>
                  <ul className="flex flex-col gap-1">
                    {heces.map(({ value, name }, key) => (
                      <li className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          name={name}
                          value={value}
                          onChangeCapture={(e) => {
                            if (e.target.checked) {
                              setValues({
                                ...values,
                                ["heces"]: [...values.heces, e.target.value],
                              });
                            } else {
                              setValues({
                                ...values,
                                ["heces"]: values.heces.filter(
                                  (item) => item !== e.target.value
                                ),
                              });
                            }
                          }}
                          id="option2"
                          className="appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:bg-Azul-Oscuro"
                        />
                        <label
                          htmlFor=""
                          className="font-Montserrat text-xs font-medium h-full text-gray-900 "
                        >
                          {value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="p-3 bg-Gris-claro rounded-md border border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    SEROLÓGICOS E INMUNL.
                  </h5>
                  <ul className="flex flex-col gap-1">
                    {serologicos.map(({ value, name }, key) => (
                      <li className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          name={name}
                          value={value}
                          onChangeCapture={(e) => {
                            if (e.target.checked) {
                              setValues({
                                ...values,
                                ["serologicos"]: [
                                  ...values.serologicos,
                                  e.target.value,
                                ],
                              });
                            } else {
                              setValues({
                                ...values,
                                ["serologicos"]: values.serologicos.filter(
                                  (item) => item !== e.target.value
                                ),
                              });
                            }
                          }}
                          id="option2"
                          className="appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:bg-Azul-Oscuro"
                        />
                        <label
                          htmlFor=""
                          className="font-Montserrat text-xs font-medium h-full text-gray-900 "
                        >
                          {value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-Gris-claro rounded-md border border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    ORINA
                  </h5>
                  <ul className="flex flex-col gap-1">
                    {orina.map(({ value, name }, key) => (
                      <li className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          name={name}
                          value={value}
                          onChangeCapture={(e) => {
                            if (e.target.checked) {
                              setValues({
                                ...values,
                                ["orina"]: [
                                  ...values.orina,
                                  e.target.value,
                                ],
                              });
                            } else {
                              setValues({
                                ...values,
                                ["orina"]: values.orina.filter(
                                  (item) => item !== e.target.value
                                ),
                              });
                            }
                          }}
                          id="option2"
                          className="appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:bg-Azul-Oscuro"
                        />
                        <label
                          htmlFor=""
                          className="font-Montserrat text-xs font-medium h-full text-gray-900 "
                        >
                          {value}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-Gris-claro rounded-md border border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    OTROS
                  </h5>
                  <input
                    id="otros"
                    name="otros"
                    value={values.otros}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        ["otros"]: e.target.value,
                      });
                    }}
                    className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 text-xs xl:text-sm text-gray-900  outline-Azul-claro"
                  />
                </div>

                <div className="p-3 bg-Gris-claro rounded-md border border-Azul-Oscuro">
                  <h5 className="text-gray-900 text-sm font-Montserrat font-medium mb-4">
                    OPCIONES
                  </h5>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <button
                      type="submit"
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
                </div>
              </div>
            </form>
          </div>
          <PdfModal openModal={openPdf} setOpenModal={setOpenPdf} />
        </Modal.Body>
      </Modal>
    </>
  );
}
