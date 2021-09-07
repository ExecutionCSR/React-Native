import React,{useEffect,useState} from "react";
import { 
  StyleSheet,
  Text,
  Image,
  View,
 } from "react-native";
import colors from "../styles/colors";
import userImg from '../assets/Franciele.png';
import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

 export function Header ( ){

   const [userName, setUsername] = useState<string>();

   useEffect (() => {
     async function loadstoreusername() {
       const user = await AsyncStorage.getItem('@plantmaneger:user');
       setUsername(user || '');
     }
     loadstoreusername();
   },[]);

   return(
     <View style = {styles.container}>
       <View>
         <Text style = {styles.greeting}>Olá,</Text>

         <Text style = {styles.userName}>
           {userName}
         </Text>
       </View>

       <Image source = {userImg} style = {styles.image} />
     </View>
   )
 }

 const styles = StyleSheet.create({
   container: {
     width: '100%',
     height: '25%',
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingVertical: 20,
     backgroundColor: colors.white,
     marginTop: 20,
    },
    image:{
      width: 90,
      height: 90,
      borderRadius: 45
    },
    greeting:{
      fontFamily: fonts.text,
      color: colors.heading,
      fontSize: 32,
    },
    userName:{
      fontFamily: fonts.heading,
      fontSize: 32,
      color: colors.green,
      lineHeight: 40
    }
 })

