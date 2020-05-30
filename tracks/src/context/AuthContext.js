import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracks'
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return{...state, errorMessage: action.payload};
        case 'signin':
            return {errorMessage:'', token: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage:''};    
        default:
            return state;
    }
}

const signup = dispatch => async ({email,password}) => {
        //make api request to sign up with email and password (axios):
        try {
            const response = await trackerApi.post('/signup', { email, password });
            console.log(response.data);
            await AsyncStorage.setItem('token, response.data.token');
        
        //if success, modify state,  into `signedin':true , and navigate to MainFlow
            dispatch({ type: 'signin', payload: response.data.token})
            navigate('TrackList');
            
        //if fail, show error message 
        } catch (err){
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'})
        }
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({type: 'signin', payload: token});
        navigate('TrackList');
    } else {
        navigate('loginFlow');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({type:  'clear_error_message'});
};


const signin = dispatch => async ({email,password}) => {
     try {
        const response = await trackerApi.post('/signin, { email, password }');            console.log(response.data);
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({type:'signin', payload: response.data.token});
            navigate('TrackList');
    } catch (err){
            console.log(err);
            dispatch({
                type:'add_error',
                payload:'Something went wrong with sign in'
            })
    }
    
}

const signout = (dispatch) => {
    return ({email,password}) => {
        //signout
    }
}



export const { Provider, Context } = createDataContext(
    authReducer,
    {signin, signout, signup, clearErrorMessage, tryLocalSignin},
    {token:null, errorMessage: '' }
);