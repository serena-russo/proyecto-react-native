import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { auth } from '../../firebase/config';
import Post from '../../components/Posts/Posts';

class Home extends Component {
    constructor(){
        super()
        this.state={
            posts: []      
        }
    }

    componentDidMount(){
        //traer datos de firebase, y cargarlos en el estado
        db.collection('posts')
            .ordeBy('createdAt' , 'desc')
            .limit(15)
            .onSnapshot(
                listaPosts => {
                    let postsAMostrar = [];

                    listaPosts.forEach(unPost => {
                        postsAMostrar.push({
                            id: unPost.id,
                            datos: unPost.data()
                        })
                    })

                    this.setState({
                        posts: postsAMostrar
                    })
                }
            )
    }


    render(){
        console.log(this.state);
        return(
           <FlatList
            data={this.state.posts}
            keyExtractor={unPost.id.toString()}
            renderItem={({item})=> <Post dataPost={item} navigation={this.props.navigation}/>}
            />
        )
    }
}



export default Home;