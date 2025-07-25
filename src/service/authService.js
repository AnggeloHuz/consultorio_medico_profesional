import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../config";
import { alertError, alertSuccess } from "../js/alerts";

export const login = createAsyncThunk(
  "authSlice/login", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/auth/logout`,
        {
          mode: "cors",
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.data)
        }
      );

      let datas = await response.json();
      console.log(datas);
      if (datas.status >= 400) {
        alertError(datas.message);
        throw `${datas.message}`;
      } else {
        alertSuccess(datas.message);

        localStorage.setItem("token", datas.token);
        localStorage.setItem("userConsultorio", JSON.stringify(datas.data));
        return {
          message: datas.message,
          token: datas.token,
          user: datas.data
        };
      }

    } catch (error) {
      // Gestionar errores
      alertError(error)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);