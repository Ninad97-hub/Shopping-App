/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Cart from './Components/Cart';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Image} from 'react-native';
import ProductInfo from './Components/ProductInfo';
import Product from './Components/product';

const Tab = createBottomTabNavigator();

const App = () => {
  const [cartItems, setCartItems] = useState(0);
  const cartData = useSelector(state => state.reducer);
  useEffect(() => {
    setCartItems(cartData.length);
  }, [cartData]);
  return (
  
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              borderRadius: 20,
              elevation: 8,
              backgroundColor: '#adb1b8',
              margin: 15,
            },
            headerShown: false,
          }}>
          <Tab.Screen
            name="Home"
            component={Product}
            options={{
              tabBarIcon: () => (
                <Image
                  source={require('./assests/house.png')}
                  style={{height: 30, width: 30, marginRight: 15}}
                />
              ),
            }}
          />
          <Tab.Screen name='Productinfo' component={ProductInfo}
            options={{
             
            }}
          />
          {/* <Stack.Screen name="user" component={UserList} /> */}
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarBadge: cartItems,
              tabBarBadgeStyle: {
                backgroundColor: '#FAFA33',
              },
              tabBarIcon: ({color, size}) => {
                return (
                  // <FontAwesome5 name="shopping-cart" size={size} color={color} />
                  <Image
                    source={require('./assests/carts.png')}
                    style={{height: 30, width: 30, marginRight: 15}}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  
  );
};

export default App;
