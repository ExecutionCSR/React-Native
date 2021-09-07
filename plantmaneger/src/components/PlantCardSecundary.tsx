import React from "react";
import { 
  StyleSheet,Text,Image,Animated
} from "react-native";
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import  Swipeable  from "react-native-gesture-handler/Swipeable";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import userImg from '../assets/Franciele.png';
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface PlantPros extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  }
  handleRemove:() => void;
}

export const PlantCardSecundary = ({data,handleRemove,...rest} : PlantPros) => {
  return(
    <Swipeable
    overshootRight = {false}
    renderRightActions = {() => (
      <Animated.View>
        <View>
          <RectButton 
          style = {styles.buttonRemove}
          onPress = {handleRemove}
          >
            <Feather  
          name = 'trash'
          size= {32}
          color = {colors.white}
          />

          </RectButton>

          

        </View>
      </Animated.View>
    )}
    >
      <RectButton style = {styles.container}
      {...rest}>
        <Image source = {userImg} style = {styles.image}/>
        
        <Text style={styles.Title}>
          {data.name}
        </Text>

        <View style= {styles.datails}>
          <Text style = {styles.timelabel}>
            Regar às
          </Text>
          <Text style = {styles.time}>
            {data.hour}
          </Text>
        </View>

      </RectButton>

   </Swipeable>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 25,
    alignItems: 'center',
    marginVertical: 5,
  },
  Title: {
    flex:1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading
  },
  image: {
    flex: 1,
    alignItems:'center',
    width: 110,
    height: 110,
    justifyContent: 'center',
    borderRadius: 55
  },
  datails: {
    alignItems: 'flex-end',
  },
  timelabel:{
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark
  },
  buttonRemove:{
    width: 100,
    height: 150,
    backgroundColor: colors.red,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 10,
    paddingLeft: 15,
    borderRadius: 20
  }

})