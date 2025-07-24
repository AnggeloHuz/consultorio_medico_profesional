import { useContext, useState } from "react";
import { Context } from "../../context/Context";

function Autocomplete(props) {
  const { addListAttended } = useContext(Context);

  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const inputHandler = (text) => {
    setText(text);
    let tempArray = [];
    if (text.length > 0) {
        tempArray.push(...props.data.filter((item) => {
            return item.ci_patient.toLowerCase().includes(text.toLowerCase())
        }))
    }
    setSuggestions(tempArray);
  };

  const selectedItemHandler = (data) => {
    setText(data)
    setSuggestions([]);
  }

  return (
    <>
      <input
        name="ci"
        value={text}
        onChange={(e) => {
          inputHandler(e.target.value);
        }}
        className="font-Montserrat w-full rounded-md bg-Blanco border border-Azul-claro px-2 py-2 xl:py-1 text-xs xl:text-sm text-gray-900  outline-Azul-claro "
      />
      {
        <div className={`${suggestions.length === 0 ? "hidden" : "visible"} absolute bg-white border-Azul-claro border text-sm max-h-40 overflow-y-auto overflow-x-auto top-12`}>
            {
                suggestions && suggestions.map((item, i) => {
                    return (
                      <div
                        className="hover:bg-slate-200 p-2 hover:cursor-pointer"
                        key={i}
                        onClick={(e) => {
                          selectedItemHandler(item.ci_patient);
                          if (item.fn_patient != null) {
                            let newFn = item.fn_patient.split("T")
                            item.fn_patient = newFn[0]

                            let fn = item.fn_patient.split("-");
                            const hoy = new Date();
                            const año = hoy.getFullYear();
                            item.age_patient = Number(año) - Number(fn[0])
                          }
                          props.setPacientes(item)
                        }}
                      >
                        {item.ci_patient} - {item.name_patient}
                      </div>
                    );
                })
            }
        </div>
      }
    </>
  );
}

export default Autocomplete;
