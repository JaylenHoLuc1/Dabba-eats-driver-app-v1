import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersScreen from "@/screens/OrderScreen";
import OrderDelivery from "@/screens/OrderDelivery";


const Stack = createNativeStackNavigator();

const Navigation = () => {
    <Stack.Navigator>
        <Stack.Screen name="OrdersScreen" component={OrdersScreen}/>
        <Stack.Screen name="OrderDelivery" component={OrderDelivery}/>
    </Stack.Navigator>

};

export default Navigation;