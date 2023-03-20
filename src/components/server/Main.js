import { useEffect, useContext, useState } from "react";

import { CometChatMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import Header from "../common/Header";
import Context from "../../context";

const Main = () => {
  const [selectedOption, setSelectedOption] = useState(1);

  const onItemSelected = (index) => {
    setSelectedOption(() => index);
  };

  const {
    cometChat,
    selectedChannel,
    selectedChannelType,
    setSelectedChannelType,
  } = useContext(Context);

  let startDirectCall = null;

  useEffect(() => {
    if (cometChat && selectedChannel && selectedChannelType === 2) {
      startDirectCall();
    }
  }, [cometChat, selectedChannel, selectedChannelType, startDirectCall]);

  startDirectCall = () => {
    if (cometChat && selectedChannel && selectedChannelType === 2) {
      const sessionID = selectedChannel.guid;
      const audioOnly = false;
      const defaultLayout = true;
      const callSettings = new cometChat.CallSettingsBuilder()
        .enableDefaultLayout(defaultLayout)
        .setSessionID(sessionID)
        .setIsAudioOnlyCall(audioOnly)
        .build();
      const callScreen = document.getElementById("call__screen");
      callScreen.classList.add("call__screen--active");
      cometChat.startCall(
        callSettings,
        document.getElementById("call__screen"),
        new cometChat.OngoingCallListener({
          onUserListUpdated: (userList) => {},
          onCallEnded: (call) => {
            callScreen.classList.remove("call__screen--active");
            setSelectedChannelType(null);
          },
          onError: (error) => {
            callScreen.classList.remove("call__screen--active");
            setSelectedChannelType(null);
          },
          onMediaDeviceListUpdated: (deviceList) => {},
          onUserMuted: (userMuted, userMutedBy) => {},
          onScreenShareStarted: () => {},
          onScreenShareStopped: () => {},
        })
      );
    }
  };

  return (
    <>
      <div className="server__main">
        <Header
          onItemSelected={onItemSelected}
          selectedOption={selectedOption}
        />
        <div className="server__container">
          <div className="server__container-body">
            {selectedChannel && selectedChannelType === 1 && (
              <CometChatMessages chatWithGroup={selectedChannel.guid} />
            )}
          </div>
        </div>
      </div>
      <div id="call__screen"></div>
    </>
  );
};
export default Main;
