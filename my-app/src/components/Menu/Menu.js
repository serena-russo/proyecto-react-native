import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from "react";

import Home from "../../screens/Home/Home";
import PostForm from '../../screens/PostForm/PostForm';
import Perfil from '../../screens/Perfil/Perfil';

const Tab = createBottomTabNavigator();

function Menu (){
        return(
            <Tab.Navigator>
                <Tab.Screen name='Home' component={Home}  />
                <Tab.Screen name='PostForm' component={PostForm}  />  
                <Tab.Screen name='Perfil' component={Perfil}  />            
            </Tab.Navigator>
        )
    }

export default Menu;