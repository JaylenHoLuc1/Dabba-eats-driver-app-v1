import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import orders from '../../assets/data/orders.json';
import { Entypo } from '@expo/vector-icons';
//dummy data format, could be used in production with some minor tweaks
type Restaurant = {
  id: string;
  name: string;
  image: string;
  deliveryFee: number;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  rating: number;
  address: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type Order = {
  id: string;
  userID: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderRestaurantId: string;
  Restaurant: Restaurant;
  User: User;
};

type OrderArray = Order[];

const order : Order = orders[0];
export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D4C2B4', dark: '#C2A9A1' }}
      headerImage={
        <Image
          source={require('@/assets/images/dabba.png')}
          style={styles.dabbaLogo}
        />
      }>
      <ThemedView >
        <ThemedText type="title">Driver app</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.orderOuter}>
        <ThemedView style={styles.orderInner}>
          <Image source={{uri: order.Restaurant.image}} style={styles.orderImage}></Image>
        
          <ThemedView style={{marginLeft: 10, flex: 2, paddingVertical: 5}}>
            <ThemedText type="title">{order.Restaurant.name}</ThemedText>
            <ThemedText style={styles.subtext}  type="subtitle">{order.Restaurant.address}</ThemedText>
            <ThemedText style={{marginTop: 10}} type="subtitle">Delivery Details:</ThemedText>
            <ThemedText style={styles.subtext}  type="subtitle">{order.User.name}</ThemedText>
            <ThemedText style={styles.subtext}  type="subtitle">{order.User.address}</ThemedText>
          </ThemedView>

          <ThemedView style={{padding: 5, backgroundColor: '#3FC060', borderBottomRightRadius: 10, borderTopRightRadius: 10, alignItems : 'center', justifyContent: 'center'}}>
            <Entypo name="check" size={30} color="white" style={{marginLeft: 'auto'}}></Entypo>
          </ThemedView>

        </ThemedView>
      </ThemedView>
      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subtext: {
    color: 'grey'
  },
  orderOuter: {
    gap: 8,
    marginBottom: 8,
    
  },
  orderInner : {
    flexDirection: 'row',
    borderColor: '#D4C2B4',
    borderWidth : 3,
    borderRadius : 14,
    margin: 10,

    

  }
  ,
  dabbaLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  orderImage: {
    width: '30%',
    height: '100%',
    borderRadius : 10
  }
});
