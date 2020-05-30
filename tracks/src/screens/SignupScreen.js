import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from './../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';

const SignupScreen =({navigation}) => {
  const { state, signup, clearErrorMessage} = useContext(AuthContext);
  

  return (
    <View style={styles.nice}>

    <NavigationEvents onWillFocus={clearErrorMessage}/>
    
    <AuthForm 
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={({email,password})=>signup({email,password})}
    />

    <NavLink 
     text="Already have an account? Sign In here"
     routeName="Signin"
    />
  </View>
 );
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    
    
    nice: {
        justifyContent: 'center',
        flex: 1,
        marginBottom:50
        
    },
    
});

export default SignupScreen; 