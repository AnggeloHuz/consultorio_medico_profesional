import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../config";
import logger from "../../utils/logger";
import notify from "../../utils/notifications";

export const logoutSesion = createAsyncThunk(
  "authSlice/logoutSesion", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/auth/logout`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let datas = await response.json();
      logger.log(datas)
      if (datas.success) {
        notify.success(datas.message, true)
        return (datas.message)
      } else {
        throw `${datas.message}`;
      }

    } catch (error) {
      // Gestionar errores
      notify.error(error, true)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const resendEmailFetch = createAsyncThunk(
  "authSlice/resendEmailFetch", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/auth/resend-verification`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let datas = await response.json();
      if (datas.success) {
        notify.success(datas.message, false)
        return (datas.message);
      } else {
        throw `${datas.message}`;
      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, false)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);

export const loginUserFetch = createAsyncThunk(
  "authSlice/loginUserFetch", // Nombre de la acción
  async (data, thunkAPI) => {
    try {
      // Realizar la solicitud POST
      const response = await fetch(
        `${URL_API}/api/auth/login`,
        {
          mode: "cors",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let datas = await response.json();
      if (datas.success) {
        notify.success(datas.message, true)
        return {
          message: datas.message,
          id: datas.user.id,
          role: datas.user.role,
          username: datas.user.username,
        };
      }
      if (datas.metadata.context === "security") {
        throw `${datas.message}`;
      }
      if (datas.metadata.context === "input_validation") {
        throw `${datas.metadata.errors[0].message}`;
      }
    } catch (error) {
      // Gestionar errores
      notify.error(error, false)
      return thunkAPI.rejectWithValue({ continue: false });
    }
  }
);