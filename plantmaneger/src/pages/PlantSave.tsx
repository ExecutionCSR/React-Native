import React from "react";

import { 
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity
 } from "react-native";

 import userImg from '../assets/Franciele.png';

import watImg from '../assets/water-drops.png'
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useRoute,useNavigation } from "@react-navigation/core";
import DataTimePicker, {Event} from '@react-native-community/datetimepicker';
import { useState } from "react";
import { format, isBefore } from "date-fns";
import { loadPlants, PlantProps, savePlants } from "../libs/storege";


interface Params {
  plant: PlantProps
}

 export function PlantSave(){
   const [selectedDateTime,setSelectedDataTime] = useState(new Date());
   const [showDatePicker, setShowDatePicker] = useState (Platform.OS == 'ios');

   const route = useRoute();
   const { plant } = route.params as Params;
   const navigation = useNavigation();

   async function handleSave(){
   
     try {
       await savePlants ({
         ...plant,
         dateTimeNotification: selectedDateTime
       });
       navigation.navigate('Confirmation',{
        title: 'Tudo Certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado',
        buttontitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen:'MyPlant' 
      });
     } catch{
        Alert.alert('Não foi possivel salvar.')
     }
   }

   function handleChangeTime(event: Event, dataTime:Date | undefined){
     if(Platform.OS === 'android'){
      setShowDatePicker(oldState => !oldState);
     }

     if(dataTime && isBefore(dataTime, new Date())){
       setSelectedDataTime(new Date ());
       return Alert.alert('Escolha uma hora no Futuro!👺');
     }

     if(dataTime)
        setSelectedDataTime(dataTime);
   }

   function handleOpenDateTimePickerForAndroid (){
     setShowDatePicker(oldState => !oldState);
   }
 
   return(
   <ScrollView>
     <View style = {styles.container}>
      <View style  = {styles.plantInfo}>

        <Image source = {userImg} style = {styles.Img} />
        
        <Text style = {styles.plantName}>
          {plant.name}
        </Text>

        <Text style = {styles.plantAbout}>
          {plant.about}
        </Text>

      </View>

      <View style = {styles.controller}>

        <View style = {styles.tipContainer}>
          <Image source = {watImg} style = {styles.tipImage}/>

          <Text style = {styles.tipText} >
           {plant.water_tips}
          </Text>

        </View>

        <Text style = {styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>
        
        {
          showDatePicker &&(
          <DataTimePicker 
          value = {selectedDateTime}
          mode ="time"
          display = "spinner"
          onChange = {handleChangeTime}
          />
        )}
        {
          Platform.OS ==='android' && (
            <TouchableOpacity
            style= {styles.dataTimePickerButton} 
            onPress= {handleOpenDateTimePickerForAndroid}
            >
              <Text style = {styles.dataTimePickerText}>
                {`Mudar ${format(selectedDateTime, 'HH,mm')}`}
              </Text>
            </TouchableOpacity>
          )
        }

        

        <Button
        title = "Cadastrar planta"
        onPress = {handleSave}
        />

      </View>
     </View>
   </ScrollView>
   )
 }

 const styles = StyleSheet.create({
   container : {
     flex: 1,
     justifyContent : "space-between",
     backgroundColor : colors.shape,
   },
   plantInfo: {
     flex:1,
     paddingHorizontal: 30,
     paddingVertical : 50,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: colors.shape,
   },
   Img: {
     height:200, 
     width: 200,
     borderRadius: 100,
   },
   plantName:{
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout:{
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },

   controller: {
     backgroundColor: colors.white,
     paddingHorizontal: 20,
     paddingTop: 20,
     paddingBottom: 20
   },
   tipContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     backgroundColor: colors.blue_light,
     padding:20,
     borderRadius: 20,
     position:'relative',
     bottom: 60
   },
   tipImage : {
     width: 55,
     height: 56, 
   },
   tipText:{
     flex: 1,
     marginLeft: 20,
     fontFamily: fonts.text,
     color: colors.blue,
     fontSize: 14,
     textAlign: 'justify'
    },
    alertLabel: {
      textAlign: 'center',
      fontFamily: fonts.complement,
      fontSize: 14,
      marginBottom: 5
    },
    dataTimePickerButton: {
      width:'100%',
      alignItems: 'center',
      paddingVertical: 40,
    },
    dataTimePickerText: {
      color: colors.heading,
      fontSize: 24,
      fontFamily: fonts.text
    } 
 })