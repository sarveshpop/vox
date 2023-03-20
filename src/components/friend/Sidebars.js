import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import Context from "../../context";
import MenusFriends from "../common/MenusFriends";

const Sidebars = () => {
  const [friends, setFriends] = useState([]);

  const { cometChat, user, hasNewFriend, setHasNewFriend, setSelectedFriend } =
    useContext(Context);

  const userPresenseListenerId = useRef(uuidv4());

  let loadFriends = null;
  let listenCustomMessages = null;
  let listenUserPresense = null;
  let updateFriends = null;

  useEffect(() => {
    if (hasNewFriend) {
      loadFriends();
    }
  }, [hasNewFriend, loadFriends]);

  useEffect(() => {
    if (user) {
      loadFriends();
    }
    if (cometChat && user) {
      listenCustomMessages();
      listenUserPresense();
    }
    return () => {
      setFriends([]);
      setSelectedFriend(null);
      if (cometChat && user && user.id) {
        cometChat.removeMessageListener(user.id);
        cometChat.removeUserListener(userPresenseListenerId);
      }
    };
  }, [
    user,
    cometChat,
    loadFriends,
    listenCustomMessages,
    listenUserPresense,
    setSelectedFriend,
    userPresenseListenerId,
  ]);

  loadFriends = useCallback(() => {
    const cometChatAppId = `${process.env.REACT_APP_COMETCHAT_APP_ID}`;
    const cometChatAppRegion = `${process.env.REACT_APP_COMETCHAT_REGION}`;
    const cometChatApiKey = `${process.env.REACT_APP_COMETCHAT_API_KEY}`;
    const url = `https://${cometChatAppId}.api-${cometChatAppRegion}.cometchat.io/v3/users/${user.id}/friends`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        apiKey: cometChatApiKey,
      },
    };
    fetch(url, options)
      .then((res) => {
        res.json().then((resBody) => setFriends(resBody.data));
        setHasNewFriend(false);
      })
      .catch((err) => {});
  }, [setHasNewFriend, user]);

  listenCustomMessages = useCallback(() => {
    cometChat.addMessageListener(
      user.id,
      new cometChat.MessageListener({
        onCustomMessageReceived: (customMessage) => {
          if (
            customMessage &&
            customMessage.sender &&
            customMessage.sender.uid &&
            customMessage.sender.uid !== user.id &&
            customMessage.data &&
            customMessage.data.customData &&
            customMessage.data.customData.message
          ) {
            if (
              customMessage &&
              customMessage.type &&
              customMessage.type === "friend"
            ) {
              loadFriends();
            }
          }
        },
      })
    );
  }, [cometChat, loadFriends, user]);

  updateFriends = (user) => {
    if (!user) {
      return;
    }
    if (friends && friends.length) {
      setFriends((previousFriends) =>
        previousFriends.map((friend) => {
          if (friend && friend.uid === user.uid) {
            return {
              ...friend,
              status: user.status === "online" ? "available" : "offline",
            };
          }
          return { ...friend };
        })
      );
    }
  };

  listenUserPresense = useCallback(() => {
    cometChat.addUserListener(
      userPresenseListenerId,
      new cometChat.UserListener({
        onUserOnline: (onlineUser) => {
          updateFriends(onlineUser);
        },
        onUserOffline: (offlineUser) => {
          updateFriends(offlineUser);
        },
      })
    );
  }, [cometChat, userPresenseListenerId, updateFriends]);

  const selectFriend = (friend) => {
    if (!friend) {
      return;
    }
    setSelectedFriend(friend);
  };

  return (
    <div className="friends__sidebar">
      <MenusFriends />
      <div className="friends__list">
        {friends &&
          friends.map((friend) => (
            <Sidebar
              key={friend.uid}
              friend={friend}
              onItemClicked={selectFriend}
            />
          ))}
      </div>
    </div>
  );
};
export default Sidebars;
