import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { ShoppingCart } from "lucide-react";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ['All', ...new Set(products.map(p=> p.category))]
  
  const addToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.title}이(가) 장바구니에 담겼습니다!`);
  };
  
  const filteredProducts = products
    .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product=>selectedCategory === "All" || product.category === selectedCategory);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl font-bold">불러오는중 ...</p>
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">상품 목록</h2>
        <div>
        <input type="text" placeholder="상품을 검색하세요..." onChange={(e)=>setSearchTerm(e.target.value)} className=" p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400"/>
        <select  onChange={(e)=>setSelectedCategory(e.target.value)}className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400">
          <option value="All">전체</option>
          <option value="electronics">전자제품</option>
          <option value="men's clothing">남성 의류</option>
          <option value="women's clothing">여성 의류</option>
        </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border rounded-lg shadow hover:shadow-lg transition p-4"
          >
            {/* 이미지 영역 */}
            <div className="h-48 flex items-center justify-center mb-2">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>

            {/* 텍스트 영역: flex-1 적용 */}
            <div className="flex-1 mb-4">
              <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
              <p className="text-gray-700 mt-1">{(product.price * 1500).toLocaleString()}원</p>
            </div>

            {/* 버튼 영역: 항상 맨 아래 */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300 transition"
              >
                상세보기
              </button>
              <button
                onClick={() => addToCart(product)}
                className=" flex justify-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              ><ShoppingCart/> 장바구니 담기
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* 모달 */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="h-64 flex items-center justify-center mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="h-full object-contain"
              />
            </div>

            <h3 className="font-bold text-xl mb-2">{selectedProduct.title}</h3>
            <p className="text-gray-700 mb-2">{(selectedProduct.price * 1500).toLocaleString()}원</p>
            <p className="text-gray-500 mb-4">{selectedProduct.description}</p>

            <button
              className="flex justify-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              onClick={() => addToCart(selectedProduct!)}>
              <ShoppingCart/>
                장바구니 담기
              
              </button>
          </div>
        </div>
      )}
    </div>
  );
}
