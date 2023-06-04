import { instancePost, instanceGet } from "../config";
import Swal from "sweetalert2";

export const registerAction = (data) => async (dispatch) => {
  console.log(data);
  try {
    const response = await instancePost("registerUser", data);
    if (response.data.success === true) {
      Swal.fire(
        "Success",
        response.data.message,
        "success",

        {
          buttons: false,
          timer: 2000,
        }
      );
      dispatch({ type: "registerUser", payload: response });

      return response;
    }
  } catch (error) {
    Swal.fire("Register Failed", error.response.data.message, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
    return error.response;
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    // const response = await instanceGet("logout");
    localStorage.removeItem("token");
    sessionStorage.removeItem("authToken");
    // if (response.data.success === true) {
    //   Swal.fire(
    //     "Success",
    //     "Logout Successful",
    //     "success",

    //     {
    //       buttons: false,
    //       timer: 2000,
    //     }
    //   );
    //   // dispatch({ type: "registerUser", payload: response });
    //   return response;
    // }
  } catch (error) {
    Swal.fire("Logout Failed", error.response.data.message, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
    return error.response;
  }
};

export const loginAction = (data) => async (dispatch) => {
  console.log("calling2");
  try {
    const response = await instancePost("loginUser", data);
    if (response.data.success === true) {
      Swal.fire(
        "Success",
        response.data.message,
        "success",

        {
          buttons: false,
          timer: 2000,
        }
      );
      dispatch({ type: "loginUser", payload: response });
      localStorage.setItem("token", response.data.token);
      sessionStorage.setItem("authToken", response.data.token);
      return response;
    }
  } catch (error) {
    Swal.fire("Login Failed", error.response.data.message, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};
export const getUserDetailsAction = () => async (dispatch) => {
  try {
    const response = await instanceGet("");
    console.log(response);
    if (response.data.success === true) {
      dispatch({ type: "getUserDetails", payload: response });
      return response;
    }
  } catch (error) {
    return error.response;
  }
};
