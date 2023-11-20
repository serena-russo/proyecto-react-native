import React, {Component} from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, ScrollView, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
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
            url: this.state.url
        })
        .then( res=>{
            console.log ("posteo ok!")
            this.setState({
                textoPost:'',
                url:'',
            })
        })
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
            <ScrollView style= {styles.contenedor}>
            <View style={styles.formContainer}>
                <Text style={styles.titulo}>New Post</Text>
                {this.state.mostrarCamara ? <Camara onImageUpload={(url)=> this.onImageUpload(url)}/> :
                
                
                <React.Fragment>
                    <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir...'
                    keyboardType='default'
                    value={this.state.textoPost}
                    />
                                           
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.crearPost(auth.currentUser.email, this.state.textoPost, this.state.fotoUrl, Date.now());
                            this.props.navigation.navigate('Home');
                            this.setState({ mostrarCamara: true });
                        }}
                        >
                        <Text style={styles.textButton}>Postear</Text>
                    </TouchableOpacity>
                </React.Fragment>}
            </View>
            </ScrollView>
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
    },
    contenedor: {
        backgroundColor: 'lightblue',
        padding: 18,
    }
})

export default PostForm;  