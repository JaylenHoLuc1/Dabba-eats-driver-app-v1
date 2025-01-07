import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import orders from '../../assets/data/orders.json';
import { Entypo } from '@expo/vector-icons';
import OrderItem from '../components/OrderItem';
import { Order } from '../types/types';
import { FlatList } from 'react-native-gesture-handler';
const order : Order = orders[1]
//dummy data format, could be used in production with some minor tweaks
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
            <FlatList data={orders} renderItem={({item}) => <OrderItem order={item}/>}/>

        </ThemedView>
      </ParallaxScrollView>

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
});
