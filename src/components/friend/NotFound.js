import notFound from "../../images/404.png";

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={notFound} alt="404" />
      <p>there's nothing here... except for a friendly ghost </p>
    </div>
  );
};
export default NotFound;
