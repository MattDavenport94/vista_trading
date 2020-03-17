import React, { useState } from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';


const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText}) => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.background}>
            <>
                <Spacer>
                    <Text h3>{headerText}</Text>
                </Spacer>
                <Image
                    style={styles.Image}
                    source={require('../asset/images/vista.png')}
                />
                <Text style={styles.text}>Welcome to Vista</Text>
                <Spacer/>
                <Input 
                    label="Email" 
                    value={email} 
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Spacer />
                <Input 
                    secureTextEntry
                    label="Password" 
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                )   : null}
                <Spacer>
                    <Button title={submitButtonText} onPress={() => onSubmit({ email, password })} />
                </Spacer>
            </>
        </View>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    Image: {
        marginLeft: 110
    },
    text: {
        textAlign: "center",
        fontSize: 20
    },
    background: {
        backgroundColor: "white"
    }
});

export default AuthForm;
