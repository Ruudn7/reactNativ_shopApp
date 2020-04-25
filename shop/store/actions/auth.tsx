export const SIGNUP = 'SIGNUP';

export const signup = (email, password) => {
    console.log(email, password)
    return async dispatch => { 
        try {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5aFK44S74uNclFfD7xWO3ge2Ex-zekWY'
        , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            throw Error('Sth went wrong')
        }
      
        const resData = await response.json();

        dispatch({ type: SIGNUP})
    } catch (err) {
        throw err;
    }
    };
}