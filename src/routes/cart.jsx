import React, { useEffect, useState } from 'react'
import { useProduct } from '../productContext'
import { useLocation } from 'react-router-dom';

function Cart() {

  const {cartItems, removeFromCart} = useProduct()

  const [quantities, setQuantities] = useState(cartItems.reduce((acc, item) => {
    acc[item._id] = 1;
    return acc;
}, {}));

const handleQuantityChange = (id, quantity) => {
    setQuantities(prevQuantities => ({
        ...prevQuantities,
        [id]: quantity
    }));
};

const calculateTotal = (price, quantity) => {
    return price * quantity;
};

const calculateSubTotal = () => {
    return cartItems.reduce((acc, item) => {
        return acc + calculateTotal(item.price, quantities[item._id]);
    }, 0);
};

  console.log(cartItems);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main className='product-table'>
      <div className='cart-header-top'>
      <h2 className=" text-center"><i className="bi bi-bag"></i> Cart</h2>
      </div>
      <div className="container mt-5">
        

        {
          cartItems.length > 0 ? (
            <section>
            <table className="table table-bordered responsive-table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
             
               
              {
              cartItems.map((item)=>{
                  return(
                      <>
                       <tr key={item._id}>
                      <td className='table-img'>
                      <img src={item.image} alt="" />
                    </td>
                    <td>{item.price} ₹ </td>
                    <td>
                          <input 
                          className='quatity-changer'
                            type="number"
                            value={quantities[item._id]}
                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 0)}
                          />
                    </td>
                    <td>{calculateTotal(item.price, quantities[item._id])} ₹</td>
                    <td>
                        <button className='remove-btn' onClick={() => removeFromCart(item._id)}>
                           <i className="bi bi-x-octagon"></i>
                        </button>
                    </td>
                    </tr>
                    </>
                  )
              })
              }
             
            </tbody>
          </table>

             <div className="payment-wrapper-box">
              <div className="row g-5">
                <div className="col-12 col-lg-6">
                  <div className="left-side">
                    <span className="cart-bottom-head">APPLY COUPON</span>
                    <p>Enter the coupon code for offer</p>
                    <div className="coupon-box">
                      <input type="text" placeholder="Enter the code" />
                      <button className="hero-btn">Apply</button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="right-side">
                    <span className="cart-bottom-head">CARD TOTALS</span>
                    <div className="sub-content">
                      <div>
                        <span>Sub Total</span>
                        <span>₹ {calculateSubTotal()}</span>
                      </div>
                      <div>
                        <span>Shipping</span>
                        <span>₹ 0</span>
                      </div>
                      <div>
                        <span>Total</span>
                        <span className='subTotal'>₹ {calculateSubTotal()}</span>
                      </div>
                    </div>
                    <a className="hero-btn" href="checkout.html">
                      PROCEED TO CHECKOUT
                    </a>
                  </div>
                </div>
              </div>
              </div>
            
          </section>

          ) : (
            <p className='empty-message'><i className="bi bi-bag-x"></i>No items in the cart</p>
          )
        }
       

    
      </div>
    </main>
  )
}

export default Cart