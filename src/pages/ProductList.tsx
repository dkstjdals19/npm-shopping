import { useEffect, useState } from "react";
import type { Product } from "../types/product";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(product);
    localStorage.setItem("cart",JSON.stringify(existingCart));
    alert(`${product.title}이(가) 장바구니에 담겼습니다!`); 
  }

  

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

  if (loading) return <p className="p-4">불러오는중 ...</p>;

  return (
    <div className="p-4 relative">
      <h2 className="text-2xl font-bold mb-4">상품 목록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border rounded-lg shadow hover:shadow-lg transition p-4"
          >
            <div className="h-48 flex items-center justify-center mb-2">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>

            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-gray-700 mt-1">{product.price.toLocaleString()}원</p>

            <div className="mt-auto flex flex-col gap-2">
              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300 transition"
              >
                상세보기
              </button>

              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition " onClick={()=>{addToCart(product)}}>
                장바구니 담기
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)} // 바깥 클릭 시 닫기
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 버블링 방지
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
            <p className="text-gray-700 mb-2">{selectedProduct.price.toLocaleString()}원</p>
            <p className="text-gray-500 mb-4">{selectedProduct.description}</p>

            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" onClick={()=>{addToCart(selectedProduct!)}}>
              장바구니 담기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
