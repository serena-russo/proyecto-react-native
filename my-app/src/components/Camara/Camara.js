import React, {Component} from "react";
import {Camera} from "expo-camera";
import {db, storage} from '../../firebase/config';
import { TouchableOpacity, View, Text } from 'react-native';


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
        Camara.requestCameraPermissionsAsync()
            .then( ()=>{
                this.setState({
                    permisosDeHardware: true,
                })
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
            <View>
                <Camara
                    style={StyleSheet.camara}
                    type={Camara.Constants.Type.front}
                    ref={metedosDeCamara => this.metedosDeCamara = metedosDeCamara}
                />
                <TouchableOpacity onPress={()=>this.sacarFoto()}>
                    <Text>Sacar Foto</Text>
                </TouchableOpacity>
            </View>
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

