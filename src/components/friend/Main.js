import { useState, useContext } from "react";
import { CometChatMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import Pendings from "./Pendings";
import Add from "./Add";
import Context from "../../context";
import Header from "../common/Header";

const Main = () => {
  const [selectedOption, setSelectedOption] = useState(1);

  const { selectedFriend, setSelectedFriend } = useContext(Context);

  const onItemSelected = (index) => {
    setSelectedOption(() => index);
    setSelectedFriend(null);
  };

  const renderMain = () => {
    if (selectedFriend) {
      return <CometChatMessages chatWithUser={selectedFriend.uid} />;
    }
    if (selectedOption === 1) {
      return <Pendings />;
    }
    if (selectedOption === 3) {
      return <Add />;
    }
  };

  return (
    <div className="friends__main">
      <Header onItemSelected={onItemSelected} selectedOption={selectedOption} />
      <div className="friends__container">
        <div className="friends__container-body">{renderMain()}</div>
      </div>
    </div>
  );
};
export default Main;
