import { useState } from "react";

function TableAtendidos({ data, select, setSelect, setSelectPatient }) {
  return (
    <>
      <div className="bg-Blanco border border-Negro w-full h-[76%] flex flex-col gap-2 rounded-md overflow-y-auto">
        <ul className="flex h-[15%] text-xs xl:text-sm bg-Azul-claro rounded-t-md">
          <li className="w-[8%] font-Montserrat flex items-center border-r border-b rounded-tl-md border-Negro bg-Azul-claro px-2 py-1">
            Nº
          </li>
          <li className="w-[15%] font-Montserrat flex items-center border-r border-b border-Negro bg-Azul-claro px-2 py-1">
            Hora
          </li>
          <li className="w-[77%] font-Montserrat flex items-center border-b rounded-tr-md border-Negro bg-Azul-claro px-2 py-1">
            Nombres y Apellidos
          </li>
        </ul>

        <ul>
          {data.map((item, key) => (
            <li
              onClick={(e) => {
                setSelect(item.id_attended);
                setSelectPatient(item.id_patient);
              }}
              key={item.id_attended}
              className={`flex text-[11px] xl:text-xs hover:cursor-pointer hover:bg-slate-200 ${
                select === item.id_attended ? "bg-slate-200" : ""
              }`}
            >
              <p className="w-[8%] text-start px-2">{key + 1}</p>
              <p className="w-[15%] text-start px-2">{item.hour_attended}</p>
              <p className="w-[77%] text-start px-2">{item.name_patient}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TableAtendidos;
