import { instancePost, instanceGet, instancePut } from "../config";
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
    if (response.data.success === true) {
      dispatch({ type: "getUserDetails", payload: response });
      return response;
    }
  } catch (error) {
    return error.response;
  }
};

//! Search All Users
export const searchUsersAction = (search) => async (dispatch) => {
  try {
    const response = await instanceGet(`/getAllUsers/?search=${search}`);
    console.log(response);
    if (response.data.success === true) {
      dispatch({ type: "searchUsers", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Search Users Failed", error.response.data.message, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};

export const fetchChats = () => async (dispatch) => {
  try {
    const response = await instanceGet(`chat/fetchChat`);
    if (response.data.success === true) {
      dispatch({ type: "fetchChats", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Fetch Chats Failed", error.response.data.message, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};

//! Chat Routes Starts from here
// ? No Reducer
export const accessOrCreateChatAction = (userId) => async (dispatch) => {
  try {
    const response = await instancePost("chat/createOrAccess", {
      userId: userId,
    });
    // console.log(response);
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
      dispatch({ type: "accessChat", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Chat Access Failed", error.response.data.message, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};

// ? No Reducer
export const createChatGroupAction = (chatName, users) => async (dispatch) => {
  try {
    const response = await instancePost("chat/createGroupChat", {
      chatName: chatName,
      users: users,
    });
    console.log(response);
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
      dispatch({ type: "createGroup", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Group Creation Failed", error.response.data.message, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};

// ? No Reducer
export const renameGroupAction = (id, chatName) => async (dispatch) => {
  try {
    const response = await instancePut("chat/renameGroup", {
      id: id,
      chatName: chatName,
    });
    console.log(response);
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
      // dispatch({ type: "createGroup", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Rename group Failed", error.response.data.message, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};

export const addToGroupAction = (id, userId) => async (dispatch) => {
  try {
    const response = await instancePut("chat/addToGroup", {
      id: id,
      userId: userId,
    });
    console.log(response);
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
      // dispatch({ type: "createGroup", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Add To Group Failed", error.response.data.message, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};

export const removeFromGroupAction = (id, userId) => async (dispatch) => {
  try {
    const response = await instancePut("chat/removeFromGroup", {
      id: id,
      userId: userId,
    });
    console.log(response);
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
      // dispatch({ type: "createGroup", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire(
      "Remove from Group Failed",
      error.response.data.message,
      "error",
      {
        buttons: false,
        timer: 2000,
      }
    );
    return error.response;
  }
};

//! Chat Routes ends from here
