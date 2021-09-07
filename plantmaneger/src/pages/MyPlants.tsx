import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Alert
} from 'react-native'
import { Header } from "../components/Header";
import colors from "../styles/colors";
import watImg from '../assets/water-drops.png'
/*import { FlatList } from "react-native-gesture-handler";*/
import { useState } from "react";
import { PlantProps,loadPlants, removePlants } from "../libs/storege";
import { useEffect } from "react";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import fonts from "../styles/fonts";
import { PlantCardSecundary } from "../components/PlantCardSecundary";
import { Load } from "../components/Load";



export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove (plant: PlantProps){
    Alert.alert('Remover', `Deseja Remover a ${plant.name}?`,[{
      text: 'Não  👺 ',
      style: 'cancel'
    },{
      text: 'Sim 👺',
      onPress: async () => {
        try {
          await removePlants(plant.id);
          setMyPlants((oldData) => (
            oldData.filter((item) => item.id !== plant.id
            )
            ));
        } catch (error) {
          Alert.alert('desista');
        }
      }
    }
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlants();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {locale: pt}
      );

      setNextWatered(
        `Não Esqueça de regar a ${plantsStoraged[0].name} daqui à ${nextTime}`
      );

      setMyPlants(plantsStoraged)
      setLoading(false);
    }

    loadStorageData();

  },[])

  if (loading)
  return <Load />

  return (
    <ScrollView
      showsHorizontalScrollIndicator = {false}
    >
    <View style = {styles.container}>
      <Header/>

      <View style = {styles.spotlight}>
        <Image 
        source = {watImg}
        style= {styles.spotlightImage}
        />
        <Text style = {styles.spotlightText}>
         {nextWatered}
        </Text>

      </View>

      <View style = {styles.plants}>
        <Text style = {styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList 
          data ={ myPlants }
          keyExtractor = {(item) => String(item.id)}
          renderItem = {({item}) => (
           <PlantCardSecundary 
           data={item}
           handleRemove = {() =>{handleRemove(item)}} 
           />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle= {{flex: 1}}
        />
      </View>

    </View>
    </ScrollView>
  )
}

const styles= StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background 
  },
  spotlight:{
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }

})