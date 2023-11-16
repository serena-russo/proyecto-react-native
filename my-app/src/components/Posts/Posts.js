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
            cantidadDeComentarios: this.props.dataPost.datos.comentarios.length
        }
    }

    componentDidMount(){

        if(this.props.dataPost.datos.likes.length === 0){
            this.setState({
                like: false
            })
        }
        if(this.props.dataPost.datos.likes.length > 0){
            this.props.dataPost.datos.likes.forEach( like => {if (like === auth.currentUser.owner) {
                this.setState({ like: true })
            }})
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

    render (){
        console.log(this.props)
        return(
            <View style= {styles.manzana}>
              <View style= {styles.banana}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('SuPerfil', this.props.dataPost.datos.owner)}>
                    <Text style={styles.usuario}> Posteo de: {this.props.dataPost.owner} </Text>
                </TouchableOpacity>

                <Image style= {styles.camara}
                    source={{uri: this.props.dataPost.datos.foto}}
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

                <Text style={styles.textButton}>{this.state.cantidadDeLikes}</Text>
            </View>

            <View>
                <Text>{this.state.cantidadDeComentarios} Comentarios</Text>
                <TouchableOpacity style= {styles.button} onPress={() => this.props.navigation.navigate('Comment' , {id: this.props.dataPost.id})}>
 
                </TouchableOpacity>
            </View>
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
        backgroundColor:'pink',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'pink'
    },
    textButton:{
        color: '#fff'
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
    }
})

export default Post