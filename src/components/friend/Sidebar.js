const Sidebar = (props) => {
  const { friend, onItemClicked } = props;

  if (!friend) {
    return <></>;
  }

  const selectFriend = () => {
    onItemClicked(friend);
  };

  return (
    <>
      <div></div>
      <div className="friends__list-item" onClick={selectFriend}>
        <div className="friends__list-item-avatar">
          <div
            className={`friends__list-item-status ${
              friend.status === "available"
                ? "friends__list-item-status--online"
                : ""
            }`}
          ></div>
          <img src={friend.avatar} alt="friend-avatar" />
        </div>
        <span style={{ paddingLeft: "5px" }}>{friend.name}</span>
      </div>
    </>
  );
};
export default Sidebar;
