export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {

    const date = new Date();

    const response = await fetch('https://reactnativ-shop.firebaseio.com/orders/u1.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      })
    })

    const resData = await response.json();

    if (!response.ok) {
        throw Error('Sth went wrong')
      }

    dispatch({
        type: ADD_ORDER,
        orderData: {
            id: resData.name,
            items: cartItems,
            amount: totalAmount,
            date: date
        }
    })
    }
}