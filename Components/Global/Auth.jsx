import React, { useState } from "react";
import { LoginLogo, IoLogInOutline } from "../SVG";
import { Input, Loader } from "../index";
import { REGISTER_USER, LOGIN_USER } from "../../Utils/index";

const Auth = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(true);
  const [error, setError] = useState();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  

  const Calling_Register_User = async (register) => {
    try {
      const response = await REGISTER_USER(register);
      if (response) {
        setLoading(false);
        setError(response);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      console.log(error);
    }
  };

  const Calling_Login_User = async (login) => {
    try {
      const response = await LOGIN_USER(login);
      if (response) {
        setLoading(false);
        setError(response);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-zink-900 bg-opacity-40 z-50"
        style={{
          pointerEvents: "auto",
        }}
      />
        <div
          className="bg-zinc-800 items-center fixed shadow-xl 
   rounded-lg rounded-2xl z-50 px-8 py-8 text-sm border border-zinc-700"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            maxWidth: "330px",
            width: "100%",
            maxHeight: "85vh",
          }}
        >
          <div>
            <div className="flex flex-col  text-zinc-200 text-center items-center">
              <LoginLogo />
              {auth ? (
                <div
                  className="flex flex-col items-center"
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  <Input
                    type="email"
                    placeholder="email adress"
                    onChange={(e) =>
                      setLogin({ ...login, email: e.target.value })
                    }
                    stylecss="1rem"
                  />
                  <Input
                    type="text"
                    placeholder="password"
                    onChange={(e) =>
                      setLogin({ ...login, password: e.target.value })
                    }
                    stylecss="1rem"
                  />
                  <button
                    onClick={() => Calling_Login_User(login)}
                    className="hover:brightness-110 bg-gradient-to-t from-indigo-800 via-indigo-800 to-indigo-900
                    border-indigo-800 px-4 py-1.5 rounded-lg  shadow h-9 w-64 drop-shaddow flex items-center justify-center m-3"
                  >
                    Login{loading && <Loader />}
                  </button>
                  {error && (
                    <p
                      style={{
                        color: "red",
                        padding: ".5rem",
                      }}
                    >
                      NOTIC:{error}
                    </p>
                  )}
                  <p
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: ".5rem",
                      cursor: "pointer",
                    }}
                    onClick={() => setAuth(false)}
                  >
                    SignUp <IoLogInOutline />
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  <Input
                    type="text"
                    placeholder="Name"
                    onChange={(e) =>
                      setRegister({ ...register, name: e.target.value })
                    }
                    stylecss="1rem"
                  />
                   <Input
                    type="email"
                    placeholder="email Adress"
                    onChange={(e) =>
                      setRegister({ ...register, email: e.target.value })
                    }
                    stylecss="1rem"
                  />
                  <Input
                    type="password"
                    placeholder="password"
                    onChange={(e) =>
                      setRegister({ ...register, password: e.target.value })
                    }
                    stylecss="1rem"
                  />
                   <Input
                    type="password"
                    placeholder="Confirm password"
                    onChange={(e) =>
                      setRegister({ ...register, confirmPassword: e.target.value })
                    }
                    stylecss="1rem"
                  />
                  <button
                    onClick={() => Calling_Register_User(register)}
                    className="hover:brightness-110 bg-gradient-to-t from-indigo-800 via-indigo-800 to-indigo-900
                    border-indigo-800 px-4 py-1.5 rounded-lg  shadow h-9 w-64 drop-shaddow flex items-center justify-center m-3"
                  >
                    SignUp{loading && <Loader />}
                  </button>
                  {error && (
                    <p
                      style={{
                        color: "red",
                        padding: ".5rem",
                      }}
                    >
                      NOTIC:{error}
                    </p>
                  )}
                  <p
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: ".5rem",
                      cursor: "pointer",
                    }}
                    onClick={() => setAuth(true)}
                  >
                    LogIn <IoLogInOutline />
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Auth;
