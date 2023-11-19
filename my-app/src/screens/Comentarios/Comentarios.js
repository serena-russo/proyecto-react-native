import firebase from 'firebase'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import { Text, View, TextInput, TouchableOpacity, StyleSheet,FlatList} from 'react-native'

class Comentarios extends Component{
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
        db.collection('posts')
        .doc(this.props.route.params.id)
        .onSnapshot(doc=>{
            this.setState({id:doc.id,data:doc.data()})
        })
    }

    agregarC (id, comentario){
        db.collection('posts')
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
        console.log(this.state)
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
    
});


export default Comentarios
