import React, { Component } from 'react';
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import { db } from '../../firebase/config';
import Posts from '../../components/Posts/Posts';

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
            .orderBy('createdAt' , 'desc')
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
            <ScrollView style= {styles.contenedor}>
            <View style={styles.formContainer}>

           <FlatList
            data={this.state.posts}
            keyExtractor={unPost => unPost.id.toString()}
            renderItem={({item})=> <Posts dataPost={item} navigation={this.props.navigation}/>}
            />

            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'lightblue',
    }

});

export default Home;