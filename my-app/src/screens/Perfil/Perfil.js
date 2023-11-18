import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { auth, db } from '../../firebase/config';

class Perfil extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            infoUser: {},
            id: ''
        }
    }

    componentDidMount(){
        db.collection('posts').where('owner', '==', auth.currentUser.email)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            listaPosts => {
                let postsAMostrar = [];

                listaPosts.forEach(unPost => {
                    postsAMostrar.push({
                        id: unPost.id,
                        datos: unPost.data(),
                    })
                })

                this.setState({
                    posts: postsAMostrar
                })
            }
        )

        db.collection('users')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(doc => {
                doc.forEach(doc =>
                    this.setState({
                        id: doc.id,
                        infoUser: doc.data()
                    }))
            })
    }

    logout(){
        auth.signOut();
        this.props.navigation.navigate('Login')

    }

    render(){
        console.log(this.state);
        return(
            <ScrollView style= {styles.contenedor}>

                <View  style={styles.info3}>
                    <Text style= {styles.usuario}>Bienvenidi {this.state.infoUser.userName}</Text>
                    <Text style= {styles.bio}>Biografia: {this.state.infoUser.miniBio}</Text>
                    <Text style= {styles.mail}>Mail: {this.state.infoUser.userName}</Text>
                    <Image style= {styles.imagenP} source={{uri: this.state.infoUser.imagenP}}/>
                </View>

                <Text style={styles.titulos}>Mis posteos:</Text>
                <FlatList>
                    data={this.state.props}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item})=> <Post dataPost={item}/>}
                </FlatList>
           
                <TouchableOpacity onPress={() => this.logout()} style={styles.botonSalir}>
                    <Text style={styles.mail}> Cerrar sesión</Text>
                </TouchableOpacity>
            
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: 'green',
        padding: 18,
    },
    info3: {
        alignItems: 'center',
        marginBottom: 20,
    },
    usuario: {
        fontSize: 20,
        marginBottom: 8,
    },
    bio: {
        fontSize: 20,
        marginBottom: 8,
    },
    mail: {
        fontSize: 16,
        marginBottom: 15,
    },
    imagenP: {
        width: 150,
        height: 150,
        borderRadius: 80,
    },
    titulos: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    botonSalir: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },
})

export default Perfil