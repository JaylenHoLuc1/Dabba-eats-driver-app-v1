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
import MapView, { Marker } from 'react-native-maps';
//import { GoogleMap, LoadScript, Marker,useLoadScript } from '@react-google-maps/api';
import { Dimensions } from 'react-native';
//dummy data format, could be used in production with some minor tweaks
export default function OrdersScreen() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const {width, height} = useWindowDimensions();
    const snapPoints = useMemo(() => ["12%", "95%"], [])
    const isWeb = Platform.OS === 'web';
    //web impl
    // const [mapCenter, setMapCenter] = useState({ lat: 34.0522, lng: -118.2437 }); // Default center (Alhambra, CA)
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: process.env.EXPO_PUBLIC_REACT_APP_GOOGLE_API_KEY as string
    // });
    // const center = {
    //   lat: 37.7749, // Example latitude (San Francisco)
    //   lng: -122.4194, // Example longitude (San Francisco)
    // };
    //   useEffect(() => {
    //     const watchId = navigator.geolocation.watchPosition(
    //         (position) => {
    //             setMapCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
    //         },
    //         (error) => {
    //             console.error('Error getting location', error);
    //         }
    //     );

    //     // Clean up the watch when component unmounts
    //     return () => navigator.geolocation.clearWatch(watchId);
    // }, []);

//     const markerPosition = useMemo(() => ({ lat: mapCenter.lat, lng: mapCenter.lng }), [mapCenter]);
//     <LoadScript googleMapsApiKey={process.env.EXPO_PUBLIC_REACT_APP_GOOGLE_API_KEY as string}>
//     <GoogleMap
//       mapContainerStyle={{
//         height : height, 
//         width: width
//       }}
//       center={markerPosition}
//       zoom={10}
       
//     >{<Marker position={markerPosition}/>}</GoogleMap>
//  </LoadScript>

  return (
   
        <View style={{backgroundColor:'#C2A9A1', flex :1 }} >
          <MapView style ={{
            height,
            width
            }}
            showsUserLocation
            followsUserLocation
          >
            {orders.map((order) => (
              <Marker
              key={order.id}
              title={order.Restaurant.name}
              description={order.Restaurant.address}
              coordinate={
                {latitude: order.Restaurant.lat,
                  longitude: order.Restaurant.lng
                }}
            >
              <View style={{backgroundColor: '#C2A9A1', padding : 5, borderRadius : 20}}>
                <Entypo name="shop" size={24} color="white"></Entypo>
              </View>
              
            </Marker>
            ))}


          </MapView>
            <BottomSheet    
              backgroundStyle={{
                backgroundColor: '#C2A9A1'
              }} 
              ref={bottomSheetRef} 
              snapPoints={snapPoints}
            >
                <View style={{ flex : 1,alignItems : 'center'}}>
                  <ThemedText style={{color : 'black', fontSize: 20, fontWeight : 600, paddingBottom : 5}}>You are Online!</ThemedText>
                    <ThemedText style={{color : 'black'}}>Available Orders: {orders.length}</ThemedText>
                </View>
                <FlatList data={orders} renderItem={({item}) => <OrderItem order={item}/>}/>
            </BottomSheet>
               
        </View>

  );
}

const styles = StyleSheet.create({

});
