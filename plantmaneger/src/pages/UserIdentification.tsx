import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {StyleSheet, SafeAreaView, View, Text,TextInput,KeyboardAvoidingView, Platform,Alert} from 'react-native';
import colors from "../styles/colors";
import Fonts from "../styles/fonts";
import { Button } from "../components/Button";

import AsyncStorage from '@react-native-async-storage/async-storage';

export function UserIdentification(){
  const [isFocused,setISFocused] = useState (false);

  const [isFiled,setIsFiled] = useState(false);

  const [name, setName] = useState<string>();

    function handleInputBlur(){
      setISFocused(false);
      setIsFiled(!!name)
    }

    function handleInputFocus (){
      setISFocused(true)
    }

    function handleInputChange(value: string){
      setIsFiled(!! value);
      setName(value);
    }

    const navigation = useNavigation();

  async function handleSubnit(){
    if(!name)
    return Alert.alert('Me diz como chamar você   👺  ');

    try{await AsyncStorage.setItem('@plantmaneger:user',name);
    navigation.navigate('Confirmation',{
      title: 'Prontinho',
      subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
      buttontitle: 'Começar',
      icon: 'smile',
      nextScreen:'PlantSelect' 
    });
  }catch{
    Alert.alert('Não foi possivel salvar seu nome 👺  ');
  }
    
  };

   

  return(
    <SafeAreaView style = {styles.conteiner}>
      <KeyboardAvoidingView style= {
        styles.conteiner
      }
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <View style = {
        styles.content
      }>
        <View style = {
          styles.form
        }>
          <View style = {
            styles.header
          }>
          <Text style = {
            styles.emoji
          }>
            { isFiled ? '👌👺': '👺'}
          </Text>
          <Text style = {
            styles.title
          }>
            Como podemos {'\n'}
            chamar você?
          </Text>

          </View>
          
          <TextInput style = {[
            styles.input,
            (isFocused || isFiled) &&{borderColor: colors.green}
          ]}
            placeholder='Digite seu Nome'
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onChangeText={handleInputChange}
          />

          <View style = {
            styles.footer
          }>
            <Button title='Confirmar'
            onPress= {handleSubnit}
            />
            </View> 
        </View>
        
      </View>

      </KeyboardAvoidingView>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content:{
    flex: 1,
    width: '100%'
  },
  form:{
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  emoji: {
   fontSize: 34
  },
  input:{
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: Fonts.heading,
    marginTop: 20
  },
  footer:{
    marginTop: 40,
    width:'100%',
    paddingHorizontal: 20,
  },
  header:{
    alignItems: 'center'
  },

})