import 'react-native-reanimated';
import { useEffect, useMemo, useRef } from "react";
import { Image, StyleSheet, Platform, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import orders from '../../assets/data/orders.json';
import { Entypo } from '@expo/vector-icons';
import OrderItem from '../../components/OrderItem';
import { Order } from "@/app/types/types";
import { FlatList } from 'react-native-gesture-handler';
import BottomSheet from "@gorhom/bottom-sheet";
//import MapView from 'react-native-maps';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dimensions } from 'react-native';
import React from 'react';

//dummy data format, could be used in production with some minor tweaks
export default function OrdersScreen() {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ["12%", "95%"], [])
    const isWeb = Platform.OS === 'web';
    const center = {
      lat: 37.7749, // Example latitude (San Francisco)
      lng: -122.4194, // Example longitude (San Francisco)
    };
  return (
   
        <ThemedView style={{backgroundColor : '#C2A9A1'}} >
          
            {isWeb? (
              <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY as string}>
                <GoogleMap
                  mapContainerStyle={{
                    height : Dimensions.get('window').height, 
                    width: Dimensions.get('window').width
                  }}
                  center={center}
                  zoom={10}
                ></GoogleMap>
             </LoadScript>
            ) : (<></>)
            //  MapView && (
            //     <React.Fragment>
            //       <MapView 
            
            //         style={{
            //           height : Dimensions.get('window').height, 
            //           width: Dimensions.get('window').width
            //         }}

            //     />
            // </React.Fragment>
            // )
            }

          
            <BottomSheet  handleIndicatorStyle={{backgroundColor : '#C2A9A1', width : 100}}  ref={bottomSheetRef} snapPoints={["20%", "90%"]}>
                <ThemedView style={{flex : 1, alignItems : 'center'}}>
                  <ThemedText style={{fontSize: 20, fontWeight : 600, paddingBottom : 5}}>You are Online!</ThemedText>
                    <ThemedText>Available Orders: {orders.length}</ThemedText>
                    <FlatList data={orders} renderItem={({item}) => <OrderItem order={item}/>}/>

                </ThemedView>
            </BottomSheet>
               
        </ThemedView>

  );
}

const styles = StyleSheet.create({

});
