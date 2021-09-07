import React from 'react';

import { 
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions 
} from 'react-native';

import FrancieleImg from '../assets/Franciele.png';

import colors from '../styles/colors';

import fonts from '../styles/fonts';

import {
  Feather,
} from  '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';



export function Welcome(){

  const navigation = useNavigation();

  function handleStart(){
    navigation.navigate('UserIdentification')
  };
  return(
    <SafeAreaView 
    style={styles.conteiner}
    >
      <View style= {styles.wrapper}>

      <Text style={styles.title}>
        Gerencie{'\n'}
        suas plantas de {'\n'}
        forma fácil
      </Text>
        <Image 
        source={FrancieleImg} 
        style={styles.image} resizeMode='contain' 
        />
      <Text 
      style={styles.subtitle}
      >
        Não esqueça mais de regar suas plantas.
        Nós cuidamos de lembrar você sempre que prescisar
      </Text>

      <TouchableOpacity 
      style={styles.button} 
      activeOpacity={0.5} 
      onPress = {handleStart}
      >
    
      <Text>
       <Feather 
       name='chevron-right' 
       style={styles.Icon}
 
       />
      </Text>
      </TouchableOpacity>

      
   
</View>
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  conteiner: {
    flex: 1, 
  },
  wrapper:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title:{
    fontSize: 28,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34
  },
  subtitle:{
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  image:{
    height: Dimensions.get('window'). width * 0.7
    
  },
  button:{
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  Icon:{
  color: colors.white,
  fontSize:26,
  },
})