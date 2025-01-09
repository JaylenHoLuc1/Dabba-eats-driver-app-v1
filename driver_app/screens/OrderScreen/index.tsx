import 'react-native-reanimated';
import { useEffect, useMemo, useRef, useState } from "react";
import { Image, StyleSheet, Platform, View, useWindowDimensions } from 'react-native';
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
import { GoogleMap, LoadScript, Marker,useLoadScript } from '@react-google-maps/api';
import { Dimensions } from 'react-native';
import React from 'react';

//dummy data format, could be used in production with some minor tweaks
export default function OrdersScreen() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const {width, height} = useWindowDimensions();
    const snapPoints = useMemo(() => ["12%", "95%"], [])
    const isWeb = Platform.OS === 'web';
    const [mapCenter, setMapCenter] = useState({ lat: 34.0522, lng: -118.2437 }); // Default center (Alhambra, CA)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.EXPO_PUBLIC_REACT_APP_GOOGLE_API_KEY as string
    });
    const center = {
      lat: 37.7749, // Example latitude (San Francisco)
      lng: -122.4194, // Example longitude (San Francisco)
    };
      useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setMapCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
            },
            (error) => {
                console.error('Error getting location', error);
            }
        );

        // Clean up the watch when component unmounts
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const markerPosition = useMemo(() => ({ lat: mapCenter.lat, lng: mapCenter.lng }), [mapCenter]);

  return (
   
        <ThemedView style={{backgroundColor : '#C2A9A1'}} >
          
 
              <LoadScript googleMapsApiKey={process.env.EXPO_PUBLIC_REACT_APP_GOOGLE_API_KEY as string}>
                <GoogleMap
                  mapContainerStyle={{
                    height : height, 
                    width: width
                  }}
                  center={markerPosition}
                  zoom={10}
                   
                >{<Marker position={markerPosition} icon={{
                  path: google.maps.SymbolPath.CIRCLE, // Customize the marker icon
                  scale: 10,
                  fillColor: 'blue',
                  fillOpacity: 0.8,
                  strokeColor: 'white',
                  strokeWeight: 2
                }}/>}</GoogleMap>
             </LoadScript>


          
            <BottomSheet  handleIndicatorStyle={{backgroundColor : '#C2A9A1', width : 100}}  ref={bottomSheetRef} snapPoints={snapPoints}>
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
