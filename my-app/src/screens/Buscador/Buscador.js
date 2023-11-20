import React, { Component } from "react";
import {TextInput, ScrollView, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db } from '../../firebase/config';

class Buscador extends Component {
    constructor(props){
        super(props)
        this.state={
            usersFiltrados:[],
            users: [],
            mailDeUsers: [],
            textoSearch: "",
            search: false,
        }
    }
    
    componentDidMount(){
        db.collection('users').onSnapshot(
            (res) => {
                let dbUsers = [];

                res.forEach( (user) => {
                    dbUsers.push(
                        {
                            id: user.id,
                            data: user.data()
                        }
                    )
                });
                this.setState({
                    users: dbUsers,
                })
            }
        )
    }

    buscarResultados(textoS){
        this.setState({
            usersFiltrados: this.state.users.filter((user) => user.data.userName.toLowerCase().includes(textoS.toLowerCase())),
                mailDeUsers: this.state.users.filter((user)=> user.data.owner.toLowerCase().includes(textoS.toLowerCase())),
                search: true,
                textoSearch: textoS,
        })
    }

    render(){
        return(
            <ScrollView style= {styles.contenedor}>
            <View style={styles.mainContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Buscar usuario'
                    keyboardType='default'
                    onChangeText={textoS => this.buscarResultados(textoS)}
                    value={this.state.textoSearch}>
                </TextInput>

                {
                    this.state.usersFiltrados.length === 0 && this.state.search === true && this.state.mailDeUsers.length === 0 ?
                    (<Text> No hay resultados que coincidan</Text>)
                    : (
                    <FlatList
                    data= {this.state.usersFiltrados}
                    keyExtractor= {user => user.id.toString()}
                    renderItem= {({item}) =>(
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('MiPerfil', {mail: item.data.owner })} >
                        <View>
                        <Text>Nombre de usuario:</Text>
                        <Text>{item.data.userName}</Text>
                        </View>
                        </TouchableOpacity>)}
                    />,
                    <FlatList
                    data= {this.state.mailDeUsers}
                    keyExtractor={user => user.id.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('UsuarioPerfil', { mail: item.data.owner })}>
                        <View>
                        <Text>Email:</Text>
                        <Text>{item.data.owner}</Text>
                        </View>
                        </TouchableOpacity>)}
                    />)
                    
                }
            </View>
            </ScrollView>

        )
    }

}

const styles= StyleSheet.create({
    input:{
        height: 20,
        width: 300,
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 5,
    },
    mainContainer: {
        flex: 1,
        borderRadius: 6,
        marginHorizontal: 20,
        marginVertical: 5,
        flex: 1,
        backgroundColor: '#F7F7F7',
        padding: 20,
    },
    contenedor: {
        backgroundColor: 'lightblue',
        padding: 18,
    },
})

export default Buscador;