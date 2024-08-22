import useCart from "../hooks/useCart"

const Cart = () => {

  const {cart} = useCart();
  console.log("Cart  content", cart);
  return (
    <>
      <div>
        <h2>Your Cart</h2>
        {cart && cart.length > 0 ? (
        <p>Total Cart length: {cart.length}</p>
      ) : (
        <p>No Items in the cart</p>
      )}
      </div>
    </>
  )
}

export default Cart