import React from "react";
import { 
  StyleSheet,Text,Image
} from "react-native";
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import userImg from '../assets/Franciele.png';

interface PlantPros extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export const PlantCardPrimary = ({data,...rest} : PlantPros) => {
  return(
   <RectButton style = {styles.container}
   {...rest}>
     <Image source = {userImg} style = {styles.image}/>
     <Text style={styles.text}>
       {data.name}
     </Text>

   </RectButton>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    maxWidth: '90%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10,
    maxHeight: '100%'
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16
  },
  image: {
    flex: 1,
    alignItems:'center',
    width: 110,
    height: 110,
    justifyContent: 'center',
    borderRadius: 55
  }

})