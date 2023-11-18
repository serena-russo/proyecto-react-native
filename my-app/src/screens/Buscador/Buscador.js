import React, { Component } from 'react';
import {db} from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet,FlatList, ActivityIndicator} from 'react-native';


class Buscador extends Component {
    constructor(){
        super();
        this.state = {
            backup: [],
            caampoBusqueda: "",
            filtradoUsers: [],
            userId: "",
            infoUser: null,
            usuarios: [],
        }
    }
    

    componentDidMount(){
        db.collection("users").onSnapshot(
            docs => {
                let usuarios = [];
                docs.forEach(dot => {
                    usuarios.push({
                        id: dot.id,
                        data: dot.data()
                    })
                    this.setState({backup: usuarios})
                })
                console.log('aca')
                console.log(usuarios)
            }
        )
    }

    busqueda(){
        let filtrado = this.state.backup.filter(fil => {
            if(fil.data.userName.toLowerCase().includes(this.state.caampoBusqueda.toLowerCase())) {
                return fil
            }
        console.log('filtrado')
        console.log(filtrado) 
            })
        this.setState({filtradoUsers: filtrado}, () => console.log(this.state.filtradoUsers))    
    }
    usuarioSeleccionado(id){
        this.props.navigation.navigate("ProfileUsers", id)
        console.log(id)
    }
    

   render(){
        return(
            <View style={styles.formContainer}>
                
                {this.state.backup === 0 ? 
                
                <View>
                   <ActivityIndicator size='large' color='white' />
                   
                   <Text>Buscate algo pa!</Text>
               </View>
               :
                <View>
                <TextInput
                style= {styles.input}
                onChangeText={(text)=> this.setState({caampoBusqueda: text})}
                placeholder='Buscar Perfiles'
                keyboardType='default'
                value={this.state.caampoBusqueda}
                />
                </View>
                }

                <TouchableOpacity style={styles.button} onPress={()=> {
                    this.busqueda();
                    }}>
                    <Text style={styles.texto}>Buscar</Text>
                </TouchableOpacity>
                {
                    this.state.filtradoUsers.length > 0 ?
                        
                        <View>
                            <Text style={styles.texto}> Buscaste : {this.state.caampoBusqueda}</Text>  
                            <FlatList
                            data={this.state.filtradoUsers}
                            keyExtractor={user => user.id}
                            renderItem= {({item}) =>
                                <TouchableOpacity style={styles.button} onPress={() => this.usuarioSeleccionado()}>
                                    <Text style={styles.texto}>{item.data.userName}</Text>
                                    </TouchableOpacity>
                            } 
                            />
                        </View>     
                        
                    :
                    <Text style={styles.texto}>NO HAY USUARIOS PARA ESTA BÚSQUEDA</Text>
                    
                }        
                
                

                
            </View>
        )

        
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
        backgroundColor:'orange',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'orange'
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

export default Buscador;