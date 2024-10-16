import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { reqQuotation } from '../../utils/https';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartsPage = () => {
    const { cart, updateItemQuantity, removeItemFromCart, clearCart, calculateTotal, quotationItemsIds } = useContext(CartContext);

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const confirmClearCart = () => {
        const proceed = window.confirm("Are you sure? It is irreversible!");
        if (proceed) {
            clearCart();
            toast.warn('Cart is cleared')
        }
        return;
    };


    const confirmRequestHandler = async () => {
        const proceed = window.confirm("Click confirm to procedd with the Quotation Request");
        console.log(quotationItemsIds())
        if (proceed) {
            const result = await reqQuotation('quotations', {
                userId: user._id,
                products: quotationItemsIds(),
            })
            if (result.statusText === "Created") {
                clearCart();
                toast.success('Quotation Requested. We will get to you soon.')
                navigate(`/user/${user?.username}/quotations`)
            }
            else {
                toast.warn("Error while Requesting Quotation, Try again.")
            }

            console.log(result)

        }
    }





    return (
        <div>
            <h1>Your Shopping Cart</h1>

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
                cart.length > 0 && <div div className='flex w-full justify-end my-6'>
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
