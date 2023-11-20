import React, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }
    componentDidMount(){
        console.log("Chequeando si el usuario está logueado en Firebase");

        auth.onAuthStateChanged( user => {
            console.log(user)

            if (user) {
                //Redirigir al usuario al menu del sitio.
               this.props.navigation.navigate('Menu')
            }
        })
    }
   
    login (email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( response => {
                //Cuando firebase responde sin error
                console.log('Login ok', response);

                //Cambiar los estados a vacío como están al inicio.


                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Menu')

            })
            .catch( error => {
                //Cuando Firebase responde con un error.
                console.log(error);
            })
    }

    render(){
        return(
            <ScrollView style={styles.formContainer}>
            <View>
                <Text style={styles.textoLogin}>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.textButton}>¿No tienes una cuenta? Regístrate</Text>
                </TouchableOpacity>

            </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        backgroundColor: 'lightblue'
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'violet',
        borderColor: 'violet',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        margin: 5,
    },
    textButton:{
        color: 'white',
        fontWeight:'bold'
    },
    textoLogin:{
        fontSize: 25,
        fontWeight: 'bold',
    }
})

export default Login;