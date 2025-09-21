import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList.tsx";
import Cart from "./pages/Cart.tsx";
import Home from "./pages/Home.tsx";


export default function App() {
  return (
    <BrowserRouter>
      {/* 헤더 */}
      <header className="p-4 bg-slate-800 text-white flex justify-between items-center shadow-2xl sm:p-6 border-b border-sky-400">
      <Link to='/'><h1 className="text-2xl font-bold sm:text-3xl">MyShop</h1></Link>
      <nav className="flex items-center space-x-8 md:space-x-12 text-xl gap-3">
        <Link
          to="/"
          className="hover:text-sky-400 transition-colors duration-300"
        >
          홈
        </Link>
        <Link
          to="/products"
          className="hover:text-sky-400 transition-colors duration-300"
        >
          상품
        </Link>
        <Link to='/cart'
          className="hover:text-sky-400 transition-colors duration-300"
        >장바구니</Link>
      </nav>
    </header>

      {/* 메인 */}
      <main className="p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <Home/>
            }
          />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
