import { useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";

function useGoogleAuth(handleLoginClose) {
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const authenticationHandler = async (email, user) => {
    try {
      const responseData = await sendRequest(
        import.meta.env.VITE_REACT_APP_BASE_URL + "/users",

        "POST",
        JSON.stringify({ email: email }),
        { "Content-Type": "application/json" }
      );
      auth.login(
        user,
        responseData.token,
        responseData.isAdmin,
        responseData.userId
      );
    } catch (err) {
      /* */
    }
  };

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    authenticationHandler(userObject.email, userObject);
    //auth.login(userObject, response.credential);
    handleLoginClose();
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "outline",
      size: "large",
      width: "200",
      logo_alignment: "center",
      text: "continue_with",
    });

    google.accounts.id.renderButton(document.getElementById("signUpDiv2"), {
      theme: "outline",
      size: "large",
      width: "300",
      logo_alignment: "center",
      text: "continue_with",
    });

    //google.accounts.id.prompt();
  }); //dependency array [] removed...
}

export default useGoogleAuth;
