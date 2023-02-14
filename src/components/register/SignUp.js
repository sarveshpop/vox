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
          <div className="signup__title">Sign Up</div>
          <div className="signup__close">
            <img
              alt="close"
              onClick={() => toggleModal(false)}
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
            />
          </div>
        </div>
        <div className="signup__subtitle"></div>
        <div className="signup__form">
          <input
            type="text"
            placeholder="username"
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
          <button className="signup__btn" onClick={signup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
