import React, { useEffect,useState } from "react";
import { 
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator
 } from "react-native";

import colors from "../styles/colors";
import { Header } from "../components/Header";
import fonts from "../styles/fonts";
import { EnviromentButton } from "../components/EnviromentButton";
import api from "../services/api";

import { PlantCardPrimary } from "../components/PlantCardPrimary";
import {Load} from '../components/Load';

import {useNavigation} from '@react-navigation/native'
import { PlantProps } from "../libs/storege";

interface EnviromentsProps{
  key: string;
  title: string;
}

 export function PlantSelect(){

  const [evironments, setenviroments] = useState<EnviromentsProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [enviromentsSelected ,setenviromentsSelected] = useState ('all');
  const [filteredPlants, setfilteredPlants] = useState<PlantProps[]>([]);
  const [loading,setLoading] = useState(true);
  
  const [page,setPage] =useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigation =useNavigation()

   
  function handleEnviromentsSelected(evironment: string){
    setenviromentsSelected(evironment);

    if(evironment == 'all')
     return setfilteredPlants(plants);

    const filtered = plants.filter(plant =>
      plant.evironments.includes(evironment)
      );
      
      setfilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data }  = await api.get('plants');

    if(!data)
    return setLoading(true);

    if(page > 1){
      setPlants(oldValue => [oldValue, ...data])
      setfilteredPlants(oldValue => [oldValue, ...data])
    }else{
      setPlants(data);
      setfilteredPlants(data);
    }

    
    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore (distance: number){
    if (distance< 1)
    return;
    setLoadingMore (true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect (plant: PlantProps){
    navigation.navigate('PlantSave',{plant});
  }

  useEffect(() => {
    async function fetchEnvioroment() {
      const { data }  = await api.get('plants_enviroments');
      setenviroments([
        {
          key: 'all,',
          title: 'Todos',
        },
        ...data
      ]);
    }
    fetchEnvioroment();
  },[])

  useEffect(() => {
    fetchPlants();
  },[])

  if (loading)
  return <Load />

  return(
     <View style = {styles.container} >
       <Header />
       <Text style = {styles.title}>
          Em qual ambiente
       </Text>
       <Text style = {styles.subtitle}>
         Você quer colocar sua planta?
       </Text>

       <View>
       <FlatList
       data={evironments}
       keyExtractor ={(item)=> String(item.key)} 
       renderItem={({item}) =>(
           <EnviromentButton 
           title ={item.title} 
           active = {item.key === enviromentsSelected}
           onPress ={() => handleEnviromentsSelected(item.key)}
           />
         )}
         horizontal
         showsHorizontalScrollIndicator= {false}
         contentContainerStyle={styles.envorimentList}
         />
       </View>

       <View style = {styles.plants}>
         <FlatList
         data={filteredPlants}
         keyExtractor ={(item)=> String( item.id)}
         renderItem = {({ item }) => (
           <PlantCardPrimary
           onPress = {() => handlePlantSelect(item) }
           data ={ item }/>
         )}
         showsVerticalScrollIndicator ={false}
         numColumns = {2}
         onEndReachedThreshold = {0.1}
         onEndReached={({ distanceFromEnd}) => handleFetchMore(distanceFromEnd)
        }
        /*ListFooterComponent = {
          loadingMore
          <ActivityIndicator color= {colors.green} />
          : <> </>
        }*/
         />

       </View>

     </View>
   )
 }

 const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 15,
    },
    title: {
      fontSize: 16,
      color: colors.heading,
      fontFamily: fonts.heading,
      lineHeight: 20,
      marginTop: 10,
    },
    subtitle: {
      fontFamily: fonts.text,
      fontSize: 16,
      lineHeight: 20,
      color: colors.heading,
    },
    envorimentList: {
      height: 40,
      justifyContent: 'center',
      paddingBottom: 5,
      marginLeft: 32,
      marginVertical: 32
    },
    plants: {
      flex: 1,
      paddingHorizontal: 32,
      justifyContent: 'center'
    },
 })