import { useEffect, useState } from "react";
import type { Product } from "../types/product";

type CartItem = Product & { quantity: number };

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 장바구니 초기화 (로컬스토리지에서 가져오기 + 중복 합치기)
  useEffect(() => {
    const savedCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // null 제거
    const validCart = savedCart.filter((item): item is Product => item != null);

    const mergedCart: CartItem[] = validCart.reduce<CartItem[]>((acc, product) => {
      const existing = acc.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        acc.push({ ...product, quantity: 1 });
      }
      return acc;
    }, []);

    setCart(mergedCart);
  }, []);

  // 로컬스토리지 업데이트
  const updateLocalStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    // quantity 제거 후 저장 (원래 상품 배열 형태)
    const originalCart: Product[] = [];
    updatedCart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        originalCart.push({ ...item });
      }
    });
    localStorage.setItem("cart", JSON.stringify(originalCart));
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateLocalStorage(updatedCart);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // 0되면 제거
    updateLocalStorage(updatedCart);
  };

  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">장바구니</h2>

      <div className="grid grid-cols-1 gap-4">
        {cart.length === 0 && <p>장바구니가 비어있습니다.</p>}

        {cart.map((product) => (
          <div key={product.id} className="flex items-center border p-4 rounded">
            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-24 object-contain mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-gray-700">
                {(product.price * 1500).toLocaleString()}원 × {product.quantity}개
              </p>
              <div className="flex items-center mt-2 gap-2">
                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-red-400 w-4 h-4 flex items-center justify-center rounded"
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="bg-green-500 w-4 h-4 flex items-center justify-center rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-right font-bold mt-4">
        총 합계 : {(totalPrice * 1500).toLocaleString()}원
      </p>
      <div className="flex justify-end">
        <button className="bg-blue-400 border-2 rounded-2xl px-4 py-2">
          결제하기
        </button>
      </div>
    </div>
  );
}
