import React, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            miniBio: '',
            fotoPerfil: '',
            mensajeE: '',
        }
    }

    componentDidMount(){
        console.log("Chequeando si el usuario está logueado en Firebase");

        auth.onAuthStateChanged( user => {
            console.log(user)

            if (user) {
                //Redirigir al usuario al login del sitio.
               this.props.navigation.navigate('Login')
            }
        })
    }

    register (email, pass, userName, miniBio, fotoPerfil){
        if (email && password && userName) {
            auth.createUserWithEmailAndPassword(email, pass)
                .then( response => {
                    db.collection('users').add({
                        owner: auth.currentUser.email,
                        userName: userName,
                        miniBio: miniBio || '', 
                        fotoPerfil: fotoPerfil || '',
                        createdAt: Date.now(),
                    })
                    this.props.navigation.navigate("Login")
            })

                .catch( error => {
                    //Cuando Firebase responde con un error
                    this.setState ({mensajeE: error.message})
                    console.error ("Firebase authentication error:", error);
                });
            } else {
                this.setState({mensajeE: 'Completar los campos obligatorios para registrarse'});
            }
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Register</Text>
                {this.state.mensajeE ? <Text style={styles.textoE}>{this.state.mensajeE}</Text>
                : null}

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='user name'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password (6 caracteres minimo)'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({miniBio: text})}
                    placeholder='opcional: mini biografia'
                    keyboardType='default'
                    value={this.state.miniBio}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({fotoPerfil: text})}
                    placeholder='opcional: URL para insertar imagen'
                    keyboardType='default'
                    value={this.state.fotoPerfil}
                    />

                <TouchableOpacity style={styles.button} onPress={()=> this.register(this.state.email, this.state.password, this.state.userName, this.state.miniBio, this.state.fotoPerfil)} disabled= {!this.state.email || !this.state.password || !this.state.userName}>    
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                   <Text>Ya tengo cuenta. Ir al login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
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
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    textoE: {
        color: 'red',
        marginBottom: 20
    }

})


export default Register;