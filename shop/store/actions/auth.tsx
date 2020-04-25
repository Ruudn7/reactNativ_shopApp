import { AsyncStorage } from 'react-native'

export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token) => {
    return { type: AUTHENTICATE, userId: userId, token: token }
}

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

            dispatch(authenticate(
                resData.localId,
                resData.idToken
            ))

            const expirationDate = new Date().getTime() + +resData.expiresIn * 1000;
            saveDataToStorage(resData.idToken, resData.localId, expirationDate)

        } catch (err) {
            throw err;
        }
    };
}

export const login = (email, password) => {
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

            dispatch(authenticate(
                resData.localId,
                resData.idToken
            ))

            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            saveDataToStorage(resData.idToken, resData.localId, expirationDate)

        } catch (err) {
            throw err;
        }
    };
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
}