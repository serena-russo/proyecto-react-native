import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Image} from 'react-native';
import { auth, db } from '../../firebase/config';
import Posts from '../../components/Posts/Posts';

class UsuarioPerfil extends Component {
    constructor(props){
        super(props)
        this.state = {
            ListaPosts: [],
            infoUser: {},
            mail: this.props.route.params.mail
        }
    }

    componentDidMount(){
        console.log(this.props.route.params)
        db.collection('posts').where('owner', '==', this.state.mail)
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            Posts => {
                let postsAMostrar = [];

                Posts.forEach(unPost => {
                    postsAMostrar.push({
                        id: unPost.id,
                        datos: unPost.data(),
                    })
                })

                this.setState({
                    ListaPosts: postsAMostrar
                })
            }
        )

        db.collection('users')
            .where('owner', '==', this.props.route.params.mail)
            .onSnapshot(user => {
                user.forEach(info =>
                    this.setState({
                        id: info.id,
                        infoUser: info.data()
                    }))
            })
    }

    render(){
        console.log(this.state);
        return(
            <ScrollView style= {styles.contenedor}>
            <View>

                <View  style={styles.info3}>
                    <Text style= {styles.usuario}>{this.state.infoUser.userName}</Text>
                    <Text style= {styles.bio}>Biografia: {this.state.infoUser.miniBio}</Text>
                    <Image style= {styles.imagenP} source={{uri: this.state.infoUser.fotoPerfil}}/>
                </View>

                <Text style={styles.titulos}>{this.state.ListaPosts.length} Posteos:</Text>

                <FlatList
                    data={this.state.ListaPosts}
                    keyExtractor={(onePost) => onePost.id}
                    renderItem={({ item }) => <Posts dataPost={item} navigation={this.props.navigation} />}
                  />

            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: 'lightblue',
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
        marginTop: 10,
        fontWeight: 'bold',
    }
})

export default UsuarioPerfil