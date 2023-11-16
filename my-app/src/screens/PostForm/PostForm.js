import React, {Component} from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import Camara from '../../components/Camara/Camara'

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
           mostrarCamara: true,
           url:''
        }
    }

    crearPost(){
        //Crear la colección Users
        db.collection('posts').add({
            owner: auth.currentUser.email,
            textoPost: this.state.textoPost,
            createdAt: Date.now(), 
            likes: [],
            comentarios:[],
            foto: this.state.url
        })
        .then( console.log ("posteo ok!"))
        .catch( e => console.log(e))
    }

    onImageUpload(url){
        this.setState({
            mostrarCamara: false,
            url: url
        })
    }

  

    render(){
        return(
            <View style={styles.formContainer}>
                {
                    this.state.mostrarCamara ?
                    <Camara onImageUpload = {(url) => this.onImageUpload(url)} />
                    :
                    <>
                     
                        <Text style= {styles.titulo}> New Post </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState ({textoPost: text})}
                            placeholder='caption here...'
                            keyboardType='default'
                            value= {this.state.textoPost}
                        />
                    <></>
                        <TouchableOpacity style = {styles.button} onPress={() => {this.crearPost(); this.props.navigation.navigate('Home'); this.setState({ mostrarCamara: true})}}>
                            <Text style={styles.textButton}>Post</Text>
                        </TouchableOpacity>
                    </>
                }
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
    titulo:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25,
    }


})


export default PostForm;  