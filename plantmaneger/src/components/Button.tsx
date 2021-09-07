import React from "react";
import {TouchableOpacity,Text, StyleSheet,TouchableOpacityProps, ButtonProps, } from 'react-native'
import colors from "../styles/colors";
import fonts from '../styles/fonts'

interface ButtonsProps extends TouchableOpacityProps {
  title: string;
}

export function Button({title, ...rest}: ButtonProps){
  return (
    <TouchableOpacity style = {
      styles.conteiner
    }{...rest}>
      <Text style = {
        styles.text
      }>
        { title }
      </Text>
    </TouchableOpacity>
  )
  
};

const styles = StyleSheet.create ({
  conteiner:{
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.heading
  }
})