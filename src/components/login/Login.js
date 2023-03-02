import { useEffect, useRef, useContext } from "react";
import validator from "validator";
import { useHistory } from "react-router-dom";
import withModal from "../common/Modal";
import SignUp from "../register/SignUp";
import Context from "../../context";
import { auth, realTimeDb } from "../../firebase";

const Login = (props) => {
  const { toggleModal } = props;

  const { setUser, setIsLoading, cometChat } = useContext(Context);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const history = useHistory();

  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("auth"));
    if (authenticatedUser) {
      history.push("/");
    } else {
      setUser(null);
    }
  }, [history, setUser]);

  const getInputs = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    return { email, password };
  };

  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password;
  };

  const loginCometChat = (user) => {
    const authKey = `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`;
    cometChat.login(user.id, authKey).then(
      (User) => {
        setUser(user);
        setIsLoading(false);
        localStorage.setItem("auth", JSON.stringify(user));
        history.push("/");
      },
      (error) => {}
    );
  };

  const login = () => {
    setIsLoading(true);
    const { email, password } = getInputs();
    if (isUserCredentialsValid(email, password)) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          realTimeDb
            .ref()
            .child("users")
            .orderByChild("email")
            .equalTo(email)
            .on("value", function (snapshot) {
              const val = snapshot.val();
              if (val) {
                const keys = Object.keys(val);
                const user = val[keys[0]];
                loginCometChat(user);
              }
            });
        })
        .catch((error) => {
          setIsLoading(false);
          alert(`Your user's name or password is not correct`);
        });
    } else {
      setIsLoading(false);
      alert(`Your user's name or password is not correct`);
    }
  };

  return (
    <div className="login__container">
      <div className="login__form-container">
        <div className="login__form">
          <div>
            <p
              style={{
                textAlign: "center",
                fontSize: "2.25rem",
                paddingBottom: ".75rem",
              }}
            >
              Welcome back!
            </p>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.15rem",
                paddingBottom: "1.5rem",
              }}
            >
              Log in to join the conversation
            </p>
          </div>
          <input
            type="text"
            placeholder="Email or phone number"
            ref={emailRef}
          />
          <input
            type="password"
            className="login_password"
            placeholder="Password"
            ref={passwordRef}
          />
          <span className="login__forgot-password">Forgot password?</span>
          <button className="login__submit-btn" onClick={login}>
            Login
          </button>
          <p style={{ paddingTop: "1rem" }}>
            Don't have an account?
            <span className="login__signup" onClick={() => toggleModal(true)}>
              {" "}
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withModal(SignUp)(Login);
