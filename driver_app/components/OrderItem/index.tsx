import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Entypo } from '@expo/vector-icons';
import { Order } from '../../app/types/types';
//dummy data format, could be used in production with some minor tweaks
interface OrderItemProps {
  order: Order; // This ensures the `order` prop is typed correctly
}
const OrderItem : React.FC<OrderItemProps> = ({order}) => {
  return (
    <div>

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
    </div>
  );
}

export default OrderItem;

const styles = StyleSheet.create({
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
  orderImage: {
    width: '30%',
    height: 190, //using relative will not show the image, this must be fixed 
    borderRadius : 10,
  }
});