export type Restaurant = {
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
  
export type User = {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
  
 export type Order = {
    id: string;
    userID: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    orderRestaurantId: string;
    Restaurant: Restaurant;
    User: User;
  };

  export type RootStackParamList = {
    Home: undefined; // Home screen has no params
    OrdersScreen: undefined,
    OrderDelivery: { order: Order }; // OrderDelivery expects an Order Object parameter of type string
  };
  
  export type OrderArray = Order[];

  export type coordz = {
    latitude : number,
    longitude : number
    }
    

  export interface OrderItemProps {
    order: Order; // This ensures the `order` prop is typed correctly
  }