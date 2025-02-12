import { Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./SidebarContext"; // Import Context Provider

function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/** Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <Sidebar />{" "}
        {/* Sidebar outside of routes so it's visible on all pages */}
        {/** Full width and height */}
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </SidebarProvider>
  );
}

export default App;
