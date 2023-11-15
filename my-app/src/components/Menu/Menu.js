import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from "react";

import Home from "../../screens/Home/Home";
import PostForm from '../../screens/PostForm/PostForm';

const Tab = createBottomTabNavigator();

function Menu (){
        return(
            <Tab.Navigator>
                <Tab.Screen name='Home' component={Home}  />
                <Tab.Screen name='PostForm' component={PostForm}  />            
            </Tab.Navigator>
        )
    }

export default Menu;