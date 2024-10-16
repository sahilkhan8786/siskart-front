import React, { useContext, useEffect } from 'react';

import { toast } from 'react-toastify';
import { reqQuotation } from '../../utils/https';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CartContext } from '../context/CartContext';

const CartsPage = () => {
    const { cart, calculateTotal, quotationItemsIds, clearCart } = useContext(CartContext)
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const confirmClearCart = () => { }



    console.log(cart)
    const confirmRequestHandler = async () => {
        const proceed = window.confirm("Click confirm to proceed with the Quotation Request");
        if (proceed) {
            try {
                const result = await reqQuotation('quotations', {
                    userId: user._id,
                    products: quotationItemsIds(),
                });


                if (result?.data?.status === "success") {
                    clearCart();  // Clear cart on success
                    toast.success('Quotation Requested. We will get to you soon.');
                    navigate(`/user/${user?.username}/quotations`);
                } else {
                    toast.warn("Error while Requesting Quotation, Try again.");
                }

            } catch (error) {
                console.error("Error requesting quotation:", error);  // Catch any errors
                toast.error("There was a problem with the request.");
            }
        }
    };





    return (

        <div className=' '>
            <h1 className='mb-2 text-2xl font-semibold'>  Your Shopping Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item, i) => (
                        <div key={i} style={styles.cartItem}>
                            <div style={styles.itemDetails}>
                                <h3>{item.ALIAS}</h3>
                                <p> Rs:{item.MRP}</p>
                            </div>
                            <div style={styles.itemControls}>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => updateItemQuantity(item._id, item.quantity - 1)} disabled={item.quantity === 1}>
                                    -
                                </button>
                                <button onClick={() => updateItemQuantity(item._id, item.quantity + 1)}>+</button>
                                <button onClick={() => removeItemFromCart(item._id)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    <div style={styles.totalSection}>
                        <h3>Total: Rs:{calculateTotal()}</h3>
                        <button onClick={confirmClearCart} style={styles.clearButton}>
                            Clear Cart
                        </button>
                    </div>

                </div>
            )}
            {
                cart.length > 0 && user?.username && <div className='flex w-full justify-end my-6'>
                    <button className='header-button' onClick={confirmRequestHandler}>
                        Request Quotation
                    </button>
                </div>
            }
        </div >

    );
};

// Some basic styling for the cart page
const styles = {
    cartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px',
        marginBottom: '10px',
    },
    itemDetails: {
        flex: '2',
    },
    itemControls: {
        display: 'flex',
        gap: '10px',
        flex: '1',
        alignItems: 'center',
    },
    totalSection: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clearButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
    },
};

export default CartsPage;
