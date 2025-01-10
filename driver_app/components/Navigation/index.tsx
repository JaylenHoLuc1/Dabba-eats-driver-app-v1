import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersScreen from "@/screens/OrderScreen";
import OrderDelivery from "@/screens/OrderDelivery";
import { RootStackParamList } from "@/app/types/types";



const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigation = () => {
return (    
    <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="OrdersScreen" component={OrdersScreen}/>
        <Stack.Screen name="OrderDelivery" component={OrderDelivery}/>
    </Stack.Navigator>
    );
};

export default Navigation;