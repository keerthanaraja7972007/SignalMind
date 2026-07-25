import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 flex-1">

        <Navbar />

        {children}

      </div>

    </div>
  );
}

export default Layout;