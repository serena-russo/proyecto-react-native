import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {db, auth} from '../../firebase/config';
import firebase from 'firebase';


class Post extends Component{
    constructor(props){
        super(props);

        this.state = {
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length,
            cantidadDeComentarios: this.props.dataPost.datos.comentarios.length,
            mostrarMensaje: false
        }
    }

    componentDidMount(){
        //Chequiar apenas carga si el post esta o no likeado
        if (this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like:true
            })
        }
    }

    likear(){
        //Agrega un email en la propiedad like del post
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)         
        })
        .then( res => this.setState({
            like:true,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })
        )
        .catche(e => console.log(e))
    }

    unlike(){
        //Quita un email de la propiedad like del post
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)         
        })
        .then( res => this.setState({
            like:false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })
        )
        .catche(e => console.log(e))
    }

    borrarPost = () => {
        const postOwner = this.props.dataPost.datos.owner;
        const currentUserEmail = auth.currentUser.email;
        if (postOwner === currentUserEmail) {
            db.collection('posts')
                .doc(this.props.dataPost.id)
                .delete()
                .then(() => {
                    console.log('Post eliminado correctamente');
                })
                .catch(error => {
                    console.error('Error al eliminar el post:', error);
                });
            } else {
                this.setState({mostrarMensaje: true})
                // Puedes mostrar un mensaje o tomar otra acción para informar al usuario
            }
        };



    render (){
        console.log(this.props)
        return(
            <View style= {styles.manzana}>
              <View style= {styles.banana}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('UsuarioPerfil', {mail: this.props.dataPost.datos.owner})}>
                    <Text style={styles.usuario}> Posteo de: {this.props.dataPost.datos.owner} </Text>
                </TouchableOpacity>

                <Image style= {styles.camara}
                    source={{uri: this.props.dataPost.datos.url}}
                /> 
              </View>
              
              <Text style= {styles.textoPosteo}>{this.props.dataPost.datos.textoPost}</Text>
              
              <View style={styles.bar}>
                {
                    this.state.like ?
                    <TouchableOpacity style={styles.button}onPress={()=>this.unlike()}>
                        <Text style={styles.textButton}>Unlike</Text>    
                    </TouchableOpacity>

                    :

                    <TouchableOpacity style={styles.button} onPress={()=>this.likear()}>
                        <Text style={styles.textButton}>Likear</Text>    
                    </TouchableOpacity>
                }
            <Text> Cantidad de likes: {this.state.cantidadDeLikes} </Text>
            </View>

            <View>
                <TouchableOpacity style= {styles.button} onPress={() => this.props.navigation.navigate('Comentarios' , {id: this.props.dataPost.id})}>
                    <Text style={styles.textButton}> Presionar para ver comentarios </Text>
                </TouchableOpacity>
                <Text>{this.state.cantidadDeComentarios} Comentarios</Text>
            </View>
            
            {this.state.mostrarMensaje ? null : (
                    <TouchableOpacity onPress={this.borrarPost}></TouchableOpacity>
    )}
                    {this.state.mostrarMensaje? (
                        <View>
                        <Text> No tienes permiso para eliminar este post </Text>
                        </View>
                    ):
                    null}
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
        backgroundColor:'blue',
        borderColor: 'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
       
        paddingHorizontal: 15,
        borderWidth: 3,

        borderRadius: 5,
        marginVertical: 5,
    },
    textButton:{
        color: '#fff',
        fontWeight: 'bold'
    }, 
    manzana:{
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    banana: {
        marginBottom: 10
    },
    usuario: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    camara:{
        width: '100%',
        aspectRatio: 1, 
        resizeMode: 'cover',  
        marginBottom: 10,
        marginTop: 5
    }, 
    textoPosteo:{
        fontSize: 15,
        marginBottom: 10,
    }, 
    bar:{
        flexDirection: 'row',
        alignItems: 'center',
    },

})

export default Post