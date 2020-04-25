import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';


export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch('https://reactnativ-shop.firebaseio.com/products.json')
      
      if (!response.ok) {
        throw new Error('Something goes wrong');
      }
      
      const resData = await response.json();  
      const loadedProducts: Product[] = [];
  
      for (const key in resData) {
        loadedProducts.push(new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        ))

        dispatch({
          type: SET_PRODUCT,
          products: loadedProducts,
          userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
        })
      }
    } catch (err) {
      // send to custom analitycs serwer
      throw err;
    }
  }
}

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`https://reactnativ-shop.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw Error('Sth went wrong')
    }
  
    dispatch(
      { type: DELETE_PRODUCT, pid: productId }
    )
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // any async code thanks to Redukst thunk and dispatch

    const response = await fetch(`https://reactnativ-shop.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      })
    })

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      }
    })
  }
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://reactnativ-shop.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl
          })
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        throw Error('Sth went wrong')
      }

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
          title,
          description,
          imageUrl,
        }
      });
    } finally { }
  } 
}
