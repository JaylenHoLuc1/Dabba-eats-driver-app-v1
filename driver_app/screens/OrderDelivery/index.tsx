import { Image, StyleSheet, Platform, View, useWindowDimensions, ActivityIndicator } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Entypo, FontAwesome5, Fontisto, MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import orders from '../../assets/data/orders.json';
import styles from './styles';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
const order = orders[0]
type coordz = {
latitude : number,
longitude : number
}
const OrderDelivery = () => {
    const [driverLocation, setDriverLocation] = useState<coordz|null>(null);
    const [totalMin, setTotalMin] = useState(0);
    const [totalMiles, setMiles] = useState(0);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["12%", "95%"], [])
    const {width, height} = useWindowDimensions();
    useEffect(() => {
        ( async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (!(status === 'granted')){
                console.log("nonono")
                return;
            }

            let location = await Location.getCurrentPositionAsync();
            setDriverLocation({
                latitude : location.coords.latitude,
                longitude: location.coords.longitude
            });
        })();

        const foregroundSubscription = Location.watchPositionAsync({
            accuracy : Location.Accuracy.High,
            distanceInterval: 10
        }, (updatedLocation) => {
            setDriverLocation({
                latitude : updatedLocation.coords.latitude,
                longitude: updatedLocation.coords.longitude
            })
        })
        //this may be a problem with updating the nav stroke
        return () => {
            foregroundSubscription;
          };
        //return foregroundSubscription;
    }, [])

    if (!driverLocation){
        return <ActivityIndicator size={'large'}/>
    }

    return (
        <View style={{ flex : 1}}>
            <MapView style ={{
                height,
                width
                }}

                showsUserLocation
                followsUserLocation
                initialRegion={{
                    latitude: driverLocation!.latitude ,
                    longitude: driverLocation!.longitude,
                    latitudeDelta : 0.07,
                    longitudeDelta: 0.07
                }}
            >
                <MapViewDirections 
                    origin={driverLocation}
                    destination={{latitude : order.User.lat, longitude : order.User.lng}}
                    strokeWidth={5}
                    strokeColor='#C2A9A1'
                    apikey={process.env.EXPO_PUBLIC_REACT_APP_GOOGLE_API_KEY as string}
                    waypoints={[{latitude : order.Restaurant.lat, longitude : order.Restaurant.lng}]}
                    onReady={(result) => {
                        setTotalMin(result.duration );
                        setMiles(result.distance * 0.621371)
                    }}
                />
                <Marker
                    coordinate={{
                        latitude: order.Restaurant.lat,
                        longitude : order.Restaurant.lng,

                    }}
                    title={order.Restaurant.name}
                    description={order.Restaurant.address}
                >
                    <View style={{backgroundColor: '#C2A9A1', padding : 5, borderRadius : 20}}>
                        <Entypo name="shop" size={24} color="white"></Entypo>
                    </View>
                </Marker>
                <Marker
                    coordinate={{
                        latitude: order.User.lat,
                        longitude : order.User.lng,

                    }}
                    title={order.User.name}
                    description={order.User.address}
                >
                    <View style={{backgroundColor: '#C2A9A1', padding : 5, borderRadius : 20}}>
                        <MaterialIcons name='restaurant' size={30} color='white'></MaterialIcons>
                    </View>
                </Marker>
            </MapView>
            <BottomSheet 
                handleIndicatorStyle={{backgroundColor : '#C2A9A1', width : 100}} 
                ref={bottomSheetRef} 
                snapPoints={snapPoints} 
            >
                <View style={{marginTop: 10, alignSelf: 'center',flexDirection: 'row', alignItems: 'center', justifyContent : 'center'}}>
                    <ThemedText style={{color : 'black', fontSize : 25, letterSpacing : 1}}>{totalMin.toFixed(0)} min</ThemedText>
                    <FontAwesome5
                        name="shopping-bag"
                        size={30}
                        color = "#C2A9A1"
                        style={{marginHorizontal: 10}}
                    />
                    <ThemedText style={{color : 'black', fontSize : 25, letterSpacing : 1}}>{totalMiles.toFixed(1)} Miles</ThemedText>   
                </View>
                <View style={styles.info} >
                    <ThemedText style={styles.titles}>{order.Restaurant.name}</ThemedText>
                    <View style={{flexDirection : 'row', marginBottom: 10,}}>
                        <Fontisto name="shopping-store" size={22} color='#C2A9A1' />
                        <ThemedText style={styles.details}>{order.Restaurant.address}</ThemedText>                    
                        
                    </View>
                    <View style={{flexDirection : 'row',}}>
                        <Fontisto name="map-marker-alt" size={22} color='#C2A9A1' />
                        <ThemedText style={styles.details}>{order.User.address}</ThemedText>
                    </View>
                    <View style={styles.foods}>
                        <ThemedText style={styles.details} >dummy food</ThemedText>
                    </View>
                </View>
                <View style={{borderRadius: 15, backgroundColor: "#C2A9A1",marginBottom : 45, marginTop: 'auto', marginVertical: 20, marginHorizontal: 10}}>
                    <ThemedText style={{color: 'white', padding: 10, fontWeight: '500', textAlign: 'center'}}>Accept Order</ThemedText>

                </View>
            </BottomSheet>
        </View>
    );
}


export default OrderDelivery;

