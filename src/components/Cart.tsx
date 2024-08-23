import { useNavigate} from "react-router-dom";
import useCart from "../hooks/useCart"

const Cart = () => {
   const {cart, clearCart,decreaseItemQuantity,increaseItemQuantity,removeItemFromCart,totalPrice, totalItems} = useCart();
   const navigate = useNavigate();
  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
        {cart && cart.length > 0 ? 
        (
        <>
            <div>
              <p className="mb-4 text-xl">Total Items: <span className="text-white text-xl font-semibold">{totalItems}</span></p>
              <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-slate-800 shadow-md rounded-lg"
                    >
                      <div className="flex items-center">
                          {item.images && item.images.length > 0 && (
                            <img src={item.category?.image} alt={item.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                          )}
                          <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-gray-500">${item.price.toFixed(2)}</p>
                          </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button onClick={() => decreaseItemQuantity(item.id)} className="btn btn-sm btn-primary">
                          -
                        </button>
                        <span className="text-lg font-medium">{item.quantity}</span>
                        <button onClick={() => increaseItemQuantity(item.id)} className="btn btn-sm btn-primary">
                          +
                        </button>
                      </div>
                      
                      <button onClick={() => removeItemFromCart(item.id)} className="btn btn-sm btn-error">
                        Remove
                      </button>
                    </div>
                  ))}
              </div>

              <div className="mt-8 flex justify-between items-center">
                  <button onClick={clearCart}>
                    Clear Cart
                  </button>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-3xl text-white">Total: ${totalPrice.toFixed(2)}</span> 
                    <button className="btn btn-lg btn-success text-white" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
                  </div>
              </div>
            </div>
        </>
      ) :(
        <>
          <p className="text-4xl font-medium text-center text-gray-600">your cart is Empty</p>
        </>
      )}


      </div>
    </>
  )
}

export default Cart