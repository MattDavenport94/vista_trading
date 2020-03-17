import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/authContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    console.log(state);

    return (
        <View style={styles.container}>
            <NavigationEvents 
                onWillBlur={clearErrorMessage}
            />
            <AuthForm
                //headerText="Sign Up for Vista"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                onSubmit={signup}
            />
            <NavLink
                routeName="Signin"
                text="Already have an account? Sign in instead."
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
    container: {
        flex: 1,
        justifyContent: 'center',
        //marginBottom: 250,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        //opacity: 0.3
    }
});

export default SignupScreen;