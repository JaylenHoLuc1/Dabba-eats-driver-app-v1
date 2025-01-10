import { Image, StyleSheet, Platform, View, useWindowDimensions, ActivityIndicator, Pressable } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Entypo, FontAwesome5, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import orders from '../../assets/data/orders.json';
import styles from './styles';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Order } from '@/app/types/types';
import { useNavigation } from 'expo-router';
import { RootStackParamList, coordz } from '../../app/types/types';
import { RouteProp } from '@react-navigation/native';

//order status enum
enum ORDER_STATUS {
    READY_FOR_PICKUP = "READY_FOR_PICKUP",
    ACCEPTED = "ACCEPTED",
    PICKED_UP = "PICKED_UP"

}
type OrderDeliveryScreenRouteProp = RouteProp<RootStackParamList, 'OrderDelivery'>;

const OrderDelivery = ({ route }: { route: OrderDeliveryScreenRouteProp }) => {
    const order  = route.params.order;
    const mapRef = useRef<MapView | null>(null);
    const [driverLocation, setDriverLocation] = useState<coordz|null>(null);
    const [totalMin, setTotalMin] = useState(0);
    const navigation = useNavigation();
    const [totalMiles, setMiles] = useState(0);
    const [isClose, setIsClose] = useState(false)
    const [deliveryStatus, setDeliveryStatus] = useState<ORDER_STATUS| null>(ORDER_STATUS.READY_FOR_PICKUP);
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


    const renderButtonTitle = () => {
        if (deliveryStatus === ORDER_STATUS.READY_FOR_PICKUP){
            return 'Accept Order'
        }
        else if (deliveryStatus === ORDER_STATUS.ACCEPTED){
            return 'Pick Up'
        }
        else if (deliveryStatus === ORDER_STATUS.PICKED_UP){
            return 'Complete delivery'
        }
    }

    const isNotPressable = () => {
        if (deliveryStatus === ORDER_STATUS.READY_FOR_PICKUP){
            return false;
        }else if (deliveryStatus === ORDER_STATUS.ACCEPTED && isClose){
            return false;
        }else if (deliveryStatus === ORDER_STATUS.PICKED_UP && isClose){
            return false;
        }
        return true;
    }

    const onPress = () => {
        //clicking accept order button 
        if (deliveryStatus === ORDER_STATUS.READY_FOR_PICKUP){
            bottomSheetRef.current?.collapse();
            mapRef.current!.animateToRegion({
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            })
            setDeliveryStatus(ORDER_STATUS.ACCEPTED)
        }
        else if (deliveryStatus === ORDER_STATUS.ACCEPTED){
            setDeliveryStatus(ORDER_STATUS.PICKED_UP)
        }else{
            bottomSheetRef.current?.collapse();
            navigation.goBack();
            console.warn('Delivery Finished')
            
        }
    }

    return (
        <View style={{ flex : 1}}>
            <MapView 
            
            ref={mapRef}
            style ={{
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
                    destination={deliveryStatus === ORDER_STATUS.ACCEPTED? {latitude : order.Restaurant.lat, longitude : order.Restaurant.lng}:
                    {latitude : order.User.lat, longitude : order.User.lng}}
                    strokeWidth={5}
                    strokeColor='#C2A9A1'
                    apikey={process.env.EXPO_PUBLIC_REACT_APP_GOOGLE_API_KEY as string}
                    waypoints={deliveryStatus === ORDER_STATUS.READY_FOR_PICKUP ? 
                        [{latitude : order.Restaurant.lat, longitude : order.Restaurant.lng}] : []
                    }
                    onReady={(result) => {
                        if (result.distance <= 0.1){
                            setIsClose(true)
                        }else{
                            setIsClose(false)
                        }
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
            {deliveryStatus ===  ORDER_STATUS.READY_FOR_PICKUP? 
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back-circle"
                    size={45}
                    color = '#C2A9A1'
                    style={{top : 40, left : 5, position: 'absolute'}}
                ></Ionicons> : null
        
            }

            <BottomSheet 
                backgroundStyle={{
                    backgroundColor: '#C2A9A1'
                }}
                handleIndicatorStyle={{backgroundColor : '#C2A9A1', width : 100}} 
                ref={bottomSheetRef} 
                snapPoints={snapPoints} 
            >
                <View style={{marginTop: 10, alignSelf: 'center',flexDirection: 'row', alignItems: 'center', justifyContent : 'center'}}>
                    <ThemedText style={{color : 'black', fontSize : 25, letterSpacing : 1}}>{totalMin.toFixed(0)} min</ThemedText>
                    <FontAwesome5
                        name="shopping-bag"
                        size={30}
                        color = "black"
                        style={{marginHorizontal: 10}}
                    />
                    <ThemedText style={{color : 'black', fontSize : 25, letterSpacing : 1}}>{totalMiles.toFixed(1)} Miles</ThemedText>   
                </View>
                <View style={styles.info} >
                    <ThemedText style={styles.titles}>{order.Restaurant.name}</ThemedText>
                    <View style={{flexDirection : 'row', marginBottom: 10,}}>
                        <Fontisto name="shopping-store" size={22} color='black' />
                        <ThemedText style={styles.details}>{order.Restaurant.address}</ThemedText>                    
                        
                    </View>
                    <View style={{flexDirection : 'row',}}>
                        <Fontisto name='person' size={22} color='black' />
                        <Fontisto name="map-marker-alt" size={22} color='black' />
                        <ThemedText style={styles.details}>{order.User.address}</ThemedText>
                    </View>
                    <View style={styles.foods}>
                        <ThemedText style={styles.details} >dummy food</ThemedText>
                    </View>
                </View>
                    <View style={{ borderRadius: 15 , backgroundColor: "#C2A9A1",marginBottom : 45, marginTop: 'auto', marginVertical: 20, marginHorizontal: 10}}>
                        <Pressable style={{borderRadius: 15, backgroundColor: isNotPressable()? 'grey' : "black"}}onPress={onPress} disabled={isNotPressable()}>
                            <ThemedText style={{color: 'white', padding: 10, fontWeight: '500', textAlign: 'center'}}>{renderButtonTitle()}</ThemedText>
                        </Pressable>
                    </View>
            </BottomSheet>
        </View>
    );
}


export default OrderDelivery;

