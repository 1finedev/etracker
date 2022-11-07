import Alerts from "../Alerts";

const Layout = ({ children }) => {
  return (
    <>
      <Alerts />
      {children}
    </>
  );
};

export default Layout;
