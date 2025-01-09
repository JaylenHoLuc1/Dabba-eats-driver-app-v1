import { useRef } from "react";
import { Image, StyleSheet, Platform, View, StatusBar } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import orders from '../../assets/data/orders.json';
import { Entypo } from '@expo/vector-icons';
import OrderItem from '../../components/OrderItem';
import { Order } from '../types/types';
import { FlatList } from 'react-native-gesture-handler';
import Navigation from "@/components/Navigation";
import OrdersScreen from "@/screens/OrderScreen";

export default function HomeApp() {
  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#D4C2B4', dark: '#C2A9A1' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/dabba.png')}
    //       style={styles.dabbaLogo}
    //     />
    // }>
    
      <View style={styles.Container}>
        <ThemedText type="title">Driver app</ThemedText>
        <Navigation/>
      </View>

    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dabbaLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  Container : {
    backgroundColor: '#C2A9A1',
    flex : 1,
    justifyContent: 'center'

  }
});
