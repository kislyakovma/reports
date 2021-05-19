export function loginUser(dispatch, loginPayload) {
  console.log(loginPayload);
  if (loginPayload.email == "admin" && loginPayload.password == "admin") {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { user: loginPayload.email, role: "admin" },
    });
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ user: loginPayload.email, role: "admin" })
    );
    return { user: loginPayload.email, role: "admin" };
  } else {
    dispatch({ type: "LOGIN_ERROR", error: "error" });
    console.log("error");
    return;
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
