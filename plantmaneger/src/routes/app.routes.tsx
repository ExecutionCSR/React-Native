import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../styles/colors";
import { PlantSelect } from "../pages/PlantSelect";
import { MaterialIcons } from "@expo/vector-icons";
import { MyPlants } from "../pages/MyPlants";
import { Platform } from "react-native"; 

const AppTab = createBottomTabNavigator()

const AutRoutes = () => {
  return(
    <AppTab.Navigator
      screenOptions = {{
        tabBarActiveTintColor : colors.green,
        tabBarInactiveTintColor : colors.heading,
        tabBarLabelPosition : 'beside-icon',
        tabBarStyle : {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 60,
        },
      }}>
        <AppTab.Screen 
          name = "Nova Planta"
          component = {PlantSelect}
          options = {{
            tabBarIcon: (({ size,color}) => (
              <MaterialIcons
                name = "add-circle-outline"
                size = {size}
                color = {color}
              />
            ))
          }}
        />

        <AppTab.Screen 
          name = "Minha Planta"
          component = {MyPlants}
          options = {{
            tabBarIcon: (({ size,color}) => (
              <MaterialIcons
                name = "format-list-bulleted"
                size = {size}
                color = {color}
              />
            ))
          }}
        />
        


    </AppTab.Navigator>
  )
}

export default AutRoutes;