import { useEffect, useState } from "react"
import type { Product } from "../types/product"


export default function Cart(){

  const [cart, setCart] = useState<Product[]>([]);

  const totalPrice =  cart
  .filter((product): product is Product => product != null) // null 제거
  .reduce((sum, product) => sum + product.price, 0);

  useEffect(()=>{
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  },[])

  return(
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">장바구니</h2>
      <div className="grid grid-cols-1 gap-4">
        {cart.length === 0 && <p>장바구니가 비어있습니다.</p>}
        {cart.filter((product): product is Product => product != null).map((product) => (
          <div key={product.id} className="flex items-center border p-4 rounded">
            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-24 object-contain mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-gray-700">{product.price.toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-right font-bold mt-4">
        총 합계 : {totalPrice.toLocaleString()}원
      </p>
    </div>
  )
}