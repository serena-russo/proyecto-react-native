import React, {Component} from "react";
import {Camera} from "expo-camera";
import {db, storage} from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';


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
        this.metedosDeCamara.takePictureAsync()
        .then(urlInternaFoto=>{
            this.setState({
                urlInternaFoto: urlInternaFoto.uri,
                mostrarLaCamara: false
            })
        })
        .catch( e => console.log(e))
    }

    guradarFoto(){
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

    rechazarFoto(){
        this.setState({
            mostrarLaCamara: true,
            urlInternaFoto: ''
        })
    }
    render(){
        return (
            <>
                {this.state.permisosDeHardware ? 
                this.state.mostrarLaCamara ?
                <View style={styles.formContainer} >
                    <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={metodosCamara => this.metodosCamara = metodosCamara}/>
                    <TouchableOpacity style={styles.button} onPress={() => this.sacarFoto()}>
                        <Text style={styles.textButton}>Sacar foto</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.formContainer}>
                    <Image style={styles.camera} source={{uri: this.state.urlInternaFoto}} />
                    <TouchableOpacity style={styles.button} onPress={() => this.aceptarFoto()}>
                        <Text style={styles.textButton}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.rechazarFoto()}>
                        <Text style={styles.textButton}>Rechazar</Text>
                    </TouchableOpacity>
                </View>
                :
                <Text style={styles.texto}>No tenes permisos de la camara</Text>
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
    }

});

export default Camara

