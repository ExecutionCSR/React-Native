import React, {useEffect} from "react";
import AppLoading from "expo-app-loading";
import Routes from "./src/routes";
import * as Notifications from 'expo-notifications';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import { PlantProps } from "./src/libs/storege";


export default function App(){
  const [fontsloaded] = useFonts({
 Jost_400Regular,
 Jost_600SemiBold
});

/*useEffect(() => {
  const subscripition = Notifications.addNotificationReceivedListener(
    async notification => {
      const data = notification.request.content.data.plants as PlantProps;
      console.log(data);
    }
  );

  return subscripition.remove();
},[])*/ 

if(!fontsloaded)
return <AppLoading />


  return (
    <Routes/>
  )
}


