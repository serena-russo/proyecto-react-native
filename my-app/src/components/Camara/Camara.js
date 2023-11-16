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
        this.metedosDeCamara.takePicturesAsync()
        .then(urlInternaFoto=>{
            this.setState({
                urlInternaFoto: urlInternaFoto.uri,
                mostrarLaCamara: false
            })
        })
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
        return(
            <>
                {this.state.permisosDeHardware ?
                this.state.mostrarLaCamara ?
                <View>
                    <Camara
                        style={styles.camara}
                        type={Camera.Constants.Type.front}
                        ref={metedosDeCamara => this.metedosDeCamara = metedosDeCamara}
                    />
                    <TouchableOpacity onPress={()=>this.sacarFoto()}>
                        <Text>Sacar Foto</Text>
                    </TouchableOpacity>
                </View>
                :
                <view>
                    <image style={styles.camara}
                    source={{uri: this.state.urlInternaFoto}} />
                    <TouchableOpacity onPress={()=>this.rechazarFoto()}>
                        <Text>Cancelar foto</Text>
                    </TouchableOpacity>
                </view>
                :
                <Text>No se habilitarion los permisos de la camara</Text>
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

