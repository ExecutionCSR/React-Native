import React from "react";
import {createStackNavigator} from "@react-navigation/stack"

import colors from "../styles/colors"; 
import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { Confirmation } from "../pages/Confitmation";
import { PlantSave } from "../pages/PlantSave";
import { MyPlants } from "../pages/MyPlants";
import AutRoutes from "./app.routes";

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
 <StackRoutes.Navigator
  screenOptions = {{
    headerShown:false,
    cardStyle: {
      backgroundColor: colors.white
    },
  }}
 >
   <StackRoutes.Screen
    name ="Welcome"
    component = {Welcome}
   />

<StackRoutes.Screen
    name ="UserIdentification"
    component = {UserIdentification}
   />

<StackRoutes.Screen
    name ="Confirmation"
    component = {Confirmation}
   />

<StackRoutes.Screen 
    name ="PlantSelect"
    component = {AutRoutes}
   />

<StackRoutes.Screen
    name = "PlantSave"
    component = {PlantSave}
   />

<StackRoutes.Screen
    name = "MyPlant"
    component = {AutRoutes}
   />

   

 </StackRoutes.Navigator>
)

export default AppRoutes;