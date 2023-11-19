import firebase from 'firebase'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import { Text, View, TextInput, TouchableOpacity, StyleSheet,FlatList} from 'react-native'

class Comentario extends Component{
    constructor(props){
        super(props)
        this.state = {
            nuevoC: "",
            id: "",
            data: {},
            comentariosVisibles: 3, // Mostrar inicialmente 3 comentarios
        }
    }

    componentDidMount(){
        db.collection("posts")
        .doc(this.props.route.params.id)
        .onSnapshot(doc=>{
            this.setState({id:doc.id,data:doc.data()})
        })
    }

    agregarC (id, comentario){
        db.collection("posts")
        .doc(id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner:auth.currentUser.email,
                createdAt:Date.now(),
                comentario:comentario
            })
    })
    }

    mostrasMasC() {
        const comentAdicional = 3; // Puedes ajustar la cantidad de comentarios adicionales a mostrar
        this.setState((prevState) => ({
            comentariosVisibles: prevState.comentariosVisibles + comentAdicional,
        }));
      }

      render() {
        return (
            <View style={styles.container}>
                {this.state.data.comentarios && this.state.data.comentarios.length > 0 ? (
                    <View>
                        <FlatList>
                            data= {this.state.data.comentarios.slice(0, this.state.comentariosVisibles)}
                            keyExtractor= {(item) => item.createdAt.toString()}
                            renderItem= {({item})=> (
                                <View style={styles.comentarioContainer}>
                                    <Text style={styles.owner}>{item.owner}:</Text>
                                    <Text style={styles.texto}>{item.comentario}</Text>
                                </View>
                            )}
                        </FlatList>
                        {this.state.data.comentarios.length > this.state.comentariosVisibles && (
                            <TouchableOpacity onPress={() => this.mostrasMasC()} style={styles.botonVm}>
                                <Text style={styles.botonVmTexto}>Ver mas comentarios</Text>
                            </TouchableOpacity>
                        )} 
                    </View>
                ) : (
                    <Text>No hay comentarios aun</Text>
                )}
                <View style={styles.contenedor7}>
                    <TextInput>
                        onChangeText= {texto => this.setState({nuevoC: texto})}
                        keyBoardType='default'
                        placeholder="Agregar un comentario"
                        value=(this.state.nuevoC)
                        style= {styles.input}
                    </TextInput>

                    <TouchableOpacity onPress={() => this.agregarC(this.state.id, this.state.nuevoC)} style={styles.comentario6}>
                        <Text style={styles.comentario6texto}> Comentar</Text>
                    </TouchableOpacity>
                </View>

                <Text onPress={() => this.props.navigate("TabNavigation")} style={styles.irHome}>
                    Volver a Home
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#FFFFFF'
    },
    comentarioContainer: {
      borderBottomWidth: 1,
      borderBottomColor: 'red',
      paddingBottom: 10,
      marginBottom: 10
    },
    owner: {
      marginBottom: 5,
      fontWeight: 'bold'
    },
    texto: {
      color: 'orange'
    },
    contenedor7: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'pink',
      padding: 10,
      marginRight: 10
    },
    botonVm: {
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
        marginTop: 10
      },
      botonVmTexto: {
        color: '#FFFFFF',
        textAlign: 'center'
      },
    comentario6: {
      padding: 10,
      backgroundColor: 'red',
      borderRadius: 5
    },
    comentario6texto: {
      color: 'red',
      textAlign: 'center'
    },
    irHome: {
      marginTop: 20,
      color: '#3897f0',
      textDecorationLine: 'underline'
    }
});


export default Comentario
