import React, {Component} from "react";
import {Camera} from "expo-camera";
import {db, storage} from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

class Camara extends Component{
    constructor(props){
        super(props),
        this.state = {
            permisosDeHardware: false,
            urlInternaFoto: '',
            mostrarLaCamara: true, //Para elegir si queremos mostrar cámara o preview de foto.
        }

        this.metedosDeCamara = '' //Guardar los métodos internos de la cámara.
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( response =>{
                if (response.granted === true){
                    this.setState({
                        permisosDeHardware: true,
                    })
                }
                
            })
            .catch( e => console.log(e))
    }

    sacarFoto(){
        console.log ("sacando foto")

        this.metodosDeCamara.takePictureAsync()
            .then( urlInternaFoto => {
                this.setState({
                    urlInternaFoto: urlInternaFoto.uri,
                    mostrarLaCamara: false
                })
            })
            .catch( e => console.log(e))
    }

    guardarFoto(){
        fetch(this.state.urlInternaFoto)
            .then(res=> res.blob())
            .then(image =>{
                const ref= storage.ref(`urlInternaFoto/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=>{
                        ref.getDownloadURL()
                            .then(url=>{
                                this.props.onImageUpload(url);
                                this.setState({
                                    urlInternaFoto: ''
                                })
                            })
                    })
        })
        .catch(e=>console.log(e))
    }

    cancelarFoto(){
        this.setState({
            mostrarLaCamara: true,
            urlInternaFoto: ''
        })
    }

    render(){
        return (
            <>
                {this.state.permisosDeHardware === true ? 
                this.state.mostrarLaCamara === false ?
                <React.Fragment>
                    <View style={styles.formContainer}>
                        <Image style={styles.camera} source={{uri: this.state.urlInternaFoto}} />
                        <TouchableOpacity style={styles.button} onPress={() => this.guardarFoto()}>
                            <Text style={styles.textButton}>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.cancelarFoto()}>
                            <Text style={styles.textButton}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>
                :
                <React.Fragment>
                    <View style={styles.formContainer} >
                        <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}/>
                        <TouchableOpacity style={styles.button} onPress={() => this.sacarFoto()}>
                            <Text style={styles.textButton}>Sacar foto</Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>
                :
                <Text style={styles.texto}>La cámara no tiene permisos para ser usada</Text>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: `60vh`,
        widht: `100vw`,
    },
    camera: {
        widht: '100%',
        height: '100%',
    },
    textButton:{
        fontWeight: 'bold',
        backgroundColor:'blue',
        borderColor: 'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        color: '#fff'
    },
    button:{
        fontWeight: 'bold',
        backgroundColor:'blue',
        borderColor: 'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        color: '#fff',
        margin: 5
    }
});

export default Camara