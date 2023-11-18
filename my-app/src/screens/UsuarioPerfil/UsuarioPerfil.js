import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,FlatList, ActivityIndicator, Image} from 'react-native';


class UsuarioPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            ListaPosts: [],
            mail: this.props.route.params.mail
        };
    }
    componentDidMount() {
        db.collection("posts").where("owner", "==", this.props.route.params).onSnapshot(
            docs => {
                let posteos = [];
                
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({ 
                    ListaPosts: posteos 
                })
            }
        )
        db.collection('users').where("owner", "==", this.props.route.params).onSnapshot(
            docs => {
                let usuario = [];

                docs.forEach(doc => {
                    usuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({ 
                    users: usuario 
                })

            })

    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        paddingHorizontal:5,
        marginTop: 20,
        backgroundColor:'grey',
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
        color:'white'
    },
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'blue'
    },
    textButton:{
        color: '#fff'
    },
    image: {
      height: 50,
   },
   texto:{
        color: 'white',
    }

})

export default UsuarioPerfil;