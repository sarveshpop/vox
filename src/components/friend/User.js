const User = (props) => {
  const { user, onItemClicked } = props;

  const selectUser = (user) => () => {
    onItemClicked(user);
  };

  return (
    <div className="add-friend__list-item" onClick={selectUser(user)}>
      <div className="add-friend__list-item-left">
        <img src={user.avatar} alt={user.username} />
        <span>{user.username}</span>
      </div>
    </div>
  );
};

export default User;
