import { useRef, useContext } from "react";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import Context from "../../context";
import { auth, realTimeDb } from "../../firebase";

const SignUp = (props) => {
  const { toggleModal } = props;

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { cometChat, setIsLoading } = useContext(Context);

  const getInputs = () => {
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    return { username, email, password, confirmPassword };
  };

  const isSignupValid = ({ username, email, password, confirmPassword }) => {
    if (validator.isEmpty(username)) {
      alert("Please input your username");
      return false;
    }
    if (!validator.isEmail(email)) {
      alert("Please input your email");
      return false;
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 6 })
    ) {
      alert(
        "Please input your password. You password must have at least 6 characters"
      );
      return false;
    }
    if (validator.isEmpty(confirmPassword)) {
      alert("Please input your confirm password");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Confirm password and password must be the same");
      return false;
    }
    return true;
  };

  const generateAvatar = () => {
    const avatar = `https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=${usernameRef.current.value}`;

    return avatar;
  };

  const createAccount = ({ userUuid, username, email, userAvatar }) => {
    return { id: userUuid, username, email, avatar: userAvatar };
  };

  const createCometChatAccount = ({ userUuid, username, userAvatar }) => {
    const authKey = `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`;
    const user = new cometChat.User(userUuid);
    user.setName(username);
    user.setAvatar(userAvatar);
    cometChat.createUser(user, authKey).then(
      (user) => {
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
      }
    );
  };

  const signup = () => {
    const { username, email, password, confirmPassword } = getInputs();
    if (isSignupValid({ username, email, password, confirmPassword })) {
      setIsLoading(true);
      const userUuid = uuidv4();
      const userAvatar = generateAvatar();
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCrendentials) => {
          if (userCrendentials) {
            const createdAccount = createAccount({
              userUuid,
              username,
              email,
              userAvatar,
            });
            realTimeDb
              .ref(`users/${userUuid}`)
              .set(createdAccount)
              .then(() => {
                alert(
                  `${email} was created successfully! Please sign in with your created account`
                );
                createCometChatAccount({ userUuid, username, userAvatar });
                toggleModal(false);
              });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert(
            `Cannot create your account, ${email} might be existed, please try again!`
          );
        });
    }
  };

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__container">
          <div className="signup__title" style={{ textAlign: "center" }}>
            Create an account
          </div>
          <div className="signup__close" onClick={() => toggleModal(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              viewBox="0 96 960 960"
              width="32"
              fill="white"
            >
              <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
            </svg>
          </div>
        </div>

        <div className="signup__form">
          <input
            type="text"
            placeholder="Username"
            ref={usernameRef}
            pattern="/^\S*$/"
            title="No white space between words"
          />
          <input type="text" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <div>
              <input
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                }}
                className="checkbox"
                type="checkbox"
                id="tnc"
                name="tnc"
              ></input>
            </div>
            <div
              style={{
                width: "100%",
                fontSize: "14px",
                paddingLeft: "12px",
                color: "grey",
              }}
            >
              <span>
                I have read the Vox's{" "}
                <a
                  href="https://www.termsfeed.com/live/6a553b76-190f-4f10-95c1-60112f99de78"
                  style={{ color: "#8555ff" }}
                >
                  Terms of Service
                </a>{" "}
                and agree to sell my data and my soul to Vox.
              </span>
            </div>
          </div>
          <button className="signup__btn" onClick={signup}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
