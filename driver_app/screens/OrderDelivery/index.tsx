import { Image, StyleSheet, Platform, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useMemo, useRef } from 'react';
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import orders from '../../assets/data/orders.json';

const order = orders[0]

const OrderDelivery = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["12%", "95%"], [])
    return (
        <View style={{ flex : 1}}>
            <BottomSheet 
                handleIndicatorStyle={{backgroundColor : '#C2A9A1', width : 100}} 
                ref={bottomSheetRef} 
                snapPoints={["20%", "90%"]} 
            >
                <View style={{marginTop: 10, alignSelf: 'center',flexDirection: 'row', alignItems: 'center', justifyContent : 'center'}}>
                    <ThemedText style={{color : 'black', fontSize : 25, letterSpacing : 1}}>14 min</ThemedText>
                    <FontAwesome5
                        name="shopping-bag"
                        size={30}
                        color = "#C2A9A1"
                        style={{marginHorizontal: 10}}
                    />
                    <ThemedText style={{color : 'black', fontSize : 25, letterSpacing : 1}}>5 Km</ThemedText>   
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
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({

    Container : {
      backgroundColor: '#C2A9A1'
  
    },
    details : {
        color : 'black', fontSize : 15, letterSpacing : 1, marginLeft : 15

    },
    titles : {
        color : 'black', fontSize : 20, letterSpacing : 1, 
        fontWeight: '500', paddingVertical: 20
    },

    foods : {
        borderTopWidth: 1, borderColor: '#C2A9A1'
    },
    info : {
        paddingHorizontal : 20,
    }
    
  });

export default OrderDelivery;

