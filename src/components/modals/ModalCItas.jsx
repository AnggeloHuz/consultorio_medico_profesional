import { Button, Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { FcOvertime } from "react-icons/fc";
import { getFetch, postFetch } from "../../js/fetch";
import { petitions } from "../../js/petitions";
import { alertError, alertSuccess } from "../../js/alerts";
import { PdfModal } from "../../pdf/PdfModal";
import { Context } from "../../context/Context";

export function ModalCitas({ openModal, setOpenModal }) {
  const { setContentPDF } = useContext(Context);

  const [opcion, setOpcion] = useState("Ninguna")
  const [mes, setMes] = useState("")
  const [dia, setDia] = useState("")
  const [openPdf, setOpenPdf] = useState(false);

  const haddleChange = (e) => {
    const { value } = e.target;
    setOpcion(value);
    const hoy = new Date();
    if (value === "EsteMes") {
      setMes(hoy.getMonth() + 1)
    }
    if (value === "Hoy") {
      const dia = hoy.getDate();
      const mess = hoy.getMonth() + 1; // Los meses empiezan desde 0
      const año = hoy.getFullYear();
      setDia(
        `${año}-${mess < 10 ? "0" + mess : mess}-${dia < 10 ? "0" + dia : dia}`
      );
    }
  }

  const imprimir = async (e) => {
    let response = [];
    if (opcion === "EsteMes" || opcion === "OtroMes") {
      response = await postFetch({ mes: mes }, petitions.citasMes);
    }
    if (opcion === "Hoy") {
      response = await getFetch(petitions.addProxCita + "today/all");
    }
    if (response.status >= 400) {
      console.log(response);
      return alertError(response.message);
    } else if (response.status >= 200) {
      setContentPDF({
        tipo: "citas",
        datos: response.data,
        titulo: "Reporte de la citas pautadas el periodo seleccionado"
      });
      alertSuccess(response.message);
      return setOpenPdf(true);
    }
  };

  return (
    <>
      <Modal
        dismissible
        size="md"
        show={openModal}
        onClose={() => {
          setOpcion("Ninguna");
          setOpenModal(false);
        }}
      >
        <Modal.Header>
          <div>
            <h4 className="font-Montserrat font-semibold text-2xl flex gap-2 items-center">
              Citas <FcOvertime className="text-3xl" />
            </h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-Gris-claro rounded-md p-4 border border-Azul-Oscuro">
            <form>
              <div className="flex flex-col gap-3">
                <h5 className="font-Montserrat font-semibold text-base xl:text-lg">
                  Rango
                </h5>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="options"
                      id="option1"
                      value={"Hoy"}
                      onChange={haddleChange}
                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:border-Azul-Oscuro checked:bg-Azul-Oscuro"
                    />
                    <label
                      htmlFor=""
                      className="font-Montserrat text-sm xl:text-base"
                    >
                      Del dia
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="options"
                      id="option2"
                      value={"EsteMes"}
                      onChange={haddleChange}
                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:border-Azul-Oscuro checked:bg-Azul-Oscuro"
                    />
                    <label
                      htmlFor=""
                      className="font-Montserrat text-sm xl:text-base"
                    >
                      Del mes
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="options"
                      id="option3"
                      value={"OtroMes"}
                      onChange={haddleChange}
                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-Azul-claro checked:border-Azul-Oscuro checked:bg-Azul-Oscuro"
                    />
                    <label
                      htmlFor=""
                      className="font-Montserrat text-sm xl:text-base"
                    >
                      Otros meses
                    </label>
                  </div>
                  <div>
                    <select
                      disabled={opcion === "OtroMes" ? false : true}
                      name="otrosMeses"
                      value={mes}
                      onChange={(e) => {
                        setMes(e.target.value);
                      }}
                      className="rounded-lg font-Montserrat border-2 text-sm xl:text-base border-Azul-claro"
                    >
                      <option value="">Selecciona</option>
                      <option value="1">Enero</option>
                      <option value="2">Febrero</option>
                      <option value="3">Marzo</option>
                      <option value="4">Abril</option>
                      <option value="5">Mayo</option>
                      <option value="6">Junio</option>
                      <option value="7">Julio</option>
                      <option value="8">Agosto</option>
                      <option value="9">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <PdfModal openModal={openPdf} setOpenModal={setOpenPdf} />
        </Modal.Body>
        <Modal.Footer className="justify-center">
          {opcion === "Ninguna" ? (
            <></>
          ) : (
            <>
              <button
                className="px-3 py-2 min-w-[80px] justify-center border-2 border-Azul-claro bg-Gris-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                onClick={imprimir}
              >
                Imprimir
              </button>
              <button
                className="px-3 py-2 min-w-[80px] justify-center border-2 border-Azul-claro bg-Gris-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-Azul-Oscuro hover:text-Blanco hover:bg-Azul-Oscuro transition-all duration-500"
                onClick={() => {
                  setOpcion("Ninguna");
                  setOpenModal(false);
                }}
              >
                Depurar
              </button>
            </>
          )}
          <button
            className="px-3 py-2 min-w-[80px] justify-center border-2 border-Azul-claro bg-Gris-claro rounded-md text-xs xl:text-sm flex items-center gap-2 hover:border-red-700 hover:text-Blanco hover:bg-red-700 transition-all duration-500"
            color="gray"
            onClick={() => {
              setOpcion("Ninguna");
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
