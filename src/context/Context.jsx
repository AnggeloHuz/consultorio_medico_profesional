import { createContext, useEffect, useState } from "react";
import { deleteFetch, getFetch, postFetch, postFetchPath, putFetchParams } from "../js/fetch";
import { petitions } from "../js/petitions";
import { alertError, alertSuccess } from "../js/alerts";

export const Context = createContext();

export function ContextProvider(props) {
  const [token, setToken] = useState("Invalid");
  const [user, setUser] = useState({});
  const [template, setTemplate] = useState("");
  const [listPatientTrue, setListPatientTrue] = useState([]);
  const [listPatientFalse, setListPatientFalse] = useState([]);
  const [indications, setIndications] = useState([]);
  const [medications, setMedications] = useState([]);
  const [patients, setPatients] = useState([]);
  const [enterprise, setEnterprise] = useState({
    name_enter: "",
    rif_enter: "",
    phone_enter: "",
    address_enter: "",
    name_doc: "",
    lastname_doc: "",
    phone_doc: "",
    speciality_doc: "",
    email_doc: "",
  });
  const [contentPDF, setContentPDF] = useState({
    tipo: "texto",
    datos: [],
    titulo: "",
  });
  const [parameters, setParameters] = useState({
    parametros_individuales: {
      precio_consulta: 0,
      precio_divisa: 0,
      dias_recordatorio: 0,
    },
    estado_paciente: [],
    motivos_consulta: [],
    metodos_pago: [],
  });

  useEffect(() => {
    function load() {
      localStorage.getItem("token") === null
        ? setToken("Invalid")
        : setToken(localStorage.getItem("token"));

      localStorage.getItem("userConsultorio") === null
        ? setUser({})
        : setUser(JSON.parse(localStorage.getItem("userConsultorio")));
    }
    load();
  }, []);
  
  const addListAttended = async (id) => {
    const response = await postFetchPath(petitions.addListAttended + id)
    if (response.status >= 400) {
      return console.error(response.message)
    } else {
      if (response.status === 201) {
        setListPatientFalse([...listPatientFalse, response.data])
        return console.log(response.message)
      }
    }
  }

  const loadReporte = async (id) => {
    const response = await getFetch(petitions.getReporte)
    if (response.status >= 400) {
      return alertError(response.message)
    } else {
      if (response.status >= 200) {
        setContentPDF({
          tipo: "array",
          datos: response.data,
          titulo: "Reporte de todos las consultas que se han realizado"
        })
        return alertSuccess(response.message)
      }
    }
  }

  const loadListPatient = async (saltar) => {
    const response = await getFetch(petitions.getListPatient)
    if (response.status >= 400) {
      return alertError(response.message)
    } else {
      if (response.status === 201) {
        return alertSuccess(response.message)
      } else {
        setListPatientTrue(response.data.atendidos)
        setListPatientFalse(response.data.sin_atender)
        if (saltar === null) {
          return alertSuccess(response.message)
        }
      }
    }
  }

  const changePatients = async (data) => {
    setPatients([...patients, data])
  }

  const loadMedications = async () => {
    const response = await getFetch(petitions.getMedications)
    if (response.status >= 400) {
      return ""
    } else {
      setMedications(response.data)
      return ""
    }
  }

  const loadIndications = async () => {
    const response = await getFetch(petitions.getIndications)
    if (response.status >= 400) {
      return ""
    } else {
      setIndications(response.data)
      return ""
    }
  }

  const loadPatients = async () => {
    const response = await getFetch(petitions.getPatients)
    if (response.status >= 400) {
      return ""
    } else {
      setPatients(response.data)
      return ""
    }
  }

  const loadEnterprise = async () => {
    const response = await getFetch(petitions.getEnterprise)
    if (response.status >= 400) {
      return ""
    } else {
      if (response.data === undefined) {
        return ""
      }
      setEnterprise(response.data)
      return ""
    }
  }

  const loadParametros = async () => {
    const response = await getFetch(petitions.getParametros)
    if (response.status >= 400) {
      return ""
    } else {
      setParameters(response.data)
      return ""
    }
  }

  const deleteAtender = (id) => {
    const newData = listPatientFalse.filter((item) => item.id_attended !== id)
    setListPatientFalse(newData)
  }

  const addMedicamento = async(data) => {
    const response = await postFetch(data, petitions.getMedications)
    if (response.status >= 400) {
      return alertError(response.message)
    } else if (response.status >= 200) {
      setMedications([...medications, response.data[0]])
      return alertSuccess(response.message)
    }
  }

  const deleteMedicamento = async(path, id) => {
    const response = await deleteFetch(path);
    if (response.status >= 400) {
      return alertError(response.message)
    } else if (response.status >= 200) {
      const newData = medications.filter((item) => item.id_medica !== id)
      setMedications(newData)
      return alertSuccess(response.message)
    }
  }

  const addIndicacion = async(data) => {
    const response = await postFetch(data, petitions.getIndications)
    if (response.status >= 400) {
      return alertError(response.message)
    } else if (response.status >= 200) {
      setIndications([...indications, response.data[0]])
      return alertSuccess(response.message)
    }
  }

  const deleteIndicacion = async(path, id) => {
    const response = await deleteFetch(path);
    if (response.status >= 400) {
      return alertError(response.message)
    } else if (response.status >= 200) {
      const newData = indications.filter((item) => item.id_indica !== id)
      setIndications(newData)
      return alertSuccess(response.message)
    }
  }

  const editPatient = async(path, id_patient, data) => {
    const response = await putFetchParams(data, path, id_patient)
    console.log(data)
    console.log(response)
    if (response.status >= 400) {
      return alertError(response.message)
    } else if (response.status >= 200) {
      const newPatients = []
      for (let i = 0; i < patients.length; i++) {
        if (patients[i].id_patient === id_patient) {
          newPatients.push(response.data[0])
        } else {
          newPatients.push(patients[i])
        } 
      }
      setPatients(newPatients)
      return alertSuccess(response.message)
    }
  }

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        template,
        setTemplate,
        loadListPatient,
        listPatientTrue,
        listPatientFalse,
        setListPatientTrue,
        loadMedications,
        medications,
        loadIndications,
        indications,
        loadPatients,
        patients,
        changePatients,
        loadEnterprise,
        enterprise,
        setEnterprise,
        parameters,
        loadParametros,
        setParameters,
        addListAttended,
        deleteAtender,
        contentPDF,
        setContentPDF,
        loadReporte,
        addMedicamento,
        deleteMedicamento,
        addIndicacion,
        deleteIndicacion,
        editPatient
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
