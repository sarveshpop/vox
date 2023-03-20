import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../context";

const Header = (props) => {
  const { user, setUser, cometChat } = useContext(Context);
  const { onItemSelected, selectedOption } = props;

  const history = useHistory();
  const selectItem = (index) => () => {
    onItemSelected(index);
  };

  const logout = async () => {
    const isLogout = window.confirm("Do you want to log out ?");
    if (isLogout) {
      await cometChat.logout();
      setUser(null);
      localStorage.removeItem("auth");
      history.push("/login");
    }
  };

  return (
    <div className="friends__main-header">
      <div className="friends__header-left">
        <span
          onClick={selectItem(1)}
          style={{
            borderRadius: "100%",
            height: "fit-content",
            padding: "12px 0",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="34"
            viewBox="0 96 960 960"
            width="34"
            fill="white"
            className={`${selectedOption === 1 ? "button-active" : ""}`}
          >
            <path d="M160 856v-60h84V490q0-84 49.5-149.5T424 258v-29q0-23 16.5-38t39.5-15q23 0 39.5 15t16.5 38v29q81 17 131 82.5T717 490v306h83v60H160Zm320-295Zm0 415q-32 0-56-23.5T400 896h160q0 33-23.5 56.5T480 976ZM304 796h353V490q0-74-51-126t-125-52q-74 0-125.5 52T304 490v306Z" />
          </svg>
        </span>
        <span
          onClick={selectItem(3)}
          style={{
            borderRadius: "900px",
            height: "fit-content",
            padding: "8px 0",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            viewBox="0 96 960 960"
            width="40"
            fill="white"
            className={`${selectedOption === 3 ? "button-active" : ""}`}
          >
            <path d="M730 656V526H600v-60h130V336h60v130h130v60H790v130h-60Zm-370-81q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40 896v-94q0-35 17.5-63.5T108 696q75-33 133.338-46.5 58.339-13.5 118.5-13.5Q420 636 478 649.5 536 663 611 696q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587 750q-71-33-120-43.5T360 696q-58 0-107.5 10.5T132 750q-15 7-23.5 21.5T100 802v34Zm260-321q39 0 64.5-25.5T450 425q0-39-25.5-64.5T360 335q-39 0-64.5 25.5T270 425q0 39 25.5 64.5T360 515Zm0-90Zm0 411Z" />
          </svg>
        </span>
      </div>
      <div className="dropdown">
        <div className="friends__header-right dropbtn">
          {user && (
            <div className="header__right">
              <img src={user.avatar} alt={user.email} />
              <span>{user.username}</span>
            </div>
          )}
        </div>
        <div className="dropdown-content">
          <span
            className="header__logout"
            onClick={logout}
            style={{
              display: "inline-flex",
              justifyContent: "center",
            }}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
