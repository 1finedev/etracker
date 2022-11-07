import Alerts from "../Alerts";

const Layout = ({ children }) => {
  return (
    <div className="font-lato">
      <Alerts />
      {children}
    </div>
  );
};

export default Layout;
