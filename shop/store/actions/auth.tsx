export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
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
                const errorResData = await response.json();
                const errorId = errorResData.error.message;

                let errMessage = 'Something went wrong';
                if (errorId === 'EMAIL_EXISTS') {
                    errMessage = 'The email address is already in use by another account'
                }

                throw new Error(errMessage)
            }
        
            const resData = await response.json();

            dispatch({ type: SIGNUP})
        } catch (err) {
            throw err;
        }
    };
}

export const login = (email, password) => {
    console.log(email, password) 
    return async dispatch => { 
        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5aFK44S74uNclFfD7xWO3ge2Ex-zekWY'
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
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                
                let errMessage = 'Something went wrong';
                if (errorId === 'EMAIL_NOT_FOUND') {
                    errMessage = 'Email not be found!'
                } else if (errorId === 'INVALID_PASSWORD') {
                    errMessage = 'Wrong password!'
                }

                throw new Error(errMessage)
            }
        
            const resData = await response.json();
            console.log(resData)
            dispatch({ type: LOGIN})
        } catch (err) {
            throw err;
        }
    };
}