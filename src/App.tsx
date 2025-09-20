import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList.tsx";
import Cart from "./pages/Cart.tsx";

export default function App() {
  return (
    <BrowserRouter>
      {/* 헤더 */}
      <header className="p-4 bg-black text-white flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">MyShop</h1>
        <nav className="space-x-6 text-lg flex gap-20">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-colors duration-200 text-2xl"
          >
            홈
          </Link>
          <Link
            to="/products"
            className="hover:text-yellow-300 transition-colors duration-200 text-2xl"
          >
            상품
          </Link>
          <Link to='/cart'
           className="hover:text-yellow-300 transition-colors duration-200 text-2xl"
           >장바구니</Link>
        </nav>
      </header>

      {/* 메인 */}
      <main className="p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <h2 className="text-3xl font-semibold text-gray-700">
                홈페이지
              </h2>
            }
          />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
