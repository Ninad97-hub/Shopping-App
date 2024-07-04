import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {addToCartItem, removeFromCart,decreaseFromCart} from './redux/action';

const Cart = ({navigation}) => {
  const cartData = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const sum = cartData.reduce((acc, item) => (acc + Number(item.price))* item.quantity, 0);
  const gstCharges = sum * 0.18;
  const totalPrice = sum + gstCharges;

  const removeProductHandler = productName => {
    dispatch(removeFromCart(productName));
  };

  const RenderProduct = ({data, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          height: 100,
          marginVertical: 9,
          flexDirection: 'row',
          alignItems: 'center',
          position:'relative'
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 10,
            backgroundColor: '#dedddc',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 22,
          }}>
          <Image
            source={data.image}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            height: '100%',
          }}>
          <View>
            <Text style={{fontSize: 18, fontWeight: '800', color: 'black'}}>
              {data.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
              }}>
              <Text style={{fontSize: 14, fontWeight: '400', color: 'black'}}>
                &#8377;{data.price}
              </Text>
              <Text style={{fontSize: 14, fontWeight: '400', color: 'black'}}>
                (~&#8377;{data.price * 0.18})
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
              onPress={()=>{dispatch(decreaseFromCart(data))}}
                style={{
                  borderRadius: 100,
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: 4,
                  marginRight: 20,
                }}>
                <MaterialCommunityIcons name="minus" style={{fontSize: 14}} />
              </TouchableOpacity>
              <Text>{data.quantity}</Text>
              <TouchableOpacity
              onPress={()=> dispatch(addToCartItem(data))}
                style={{
                  borderRadius: 100,
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: 4,
                  marginLeft: 20,
                  
                }}>
                  
                <MaterialCommunityIcons name="plus" style={{fontSize: 14}} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeProductHandler(data.name)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 20,
                  backgroundColor: 'red',
                  padding: 4,
                  borderRadius: 100,
                  marginRight: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            paddingTop: 10,
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Productinfo', {productId: cartData.id})
            }>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 30,
                color: 'black',
                backgroundColor: '#cfcbca',
                padding: 10,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
            Order Details
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            letterSpacing: 1.5,
            paddingTop: 20,
            paddingLeft: 15,
            fontWeight: '700',
          }}>
          My cart
        </Text>
        <View>
          {cartData
            ? cartData.map((data, index) => (
                <RenderProduct data={data} index={index} key={index} />
              ))
            : null}
        </View>
        <View>
          <View style={{paddingHorizontal: 16, marginVertical: 10}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              Delivery loaction
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    color: 'blue',
                    backgroundColor: '#dedddc',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 14,
                    borderRadius: 10,
                    marginRight: 18,
                  }}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    style={{fontSize: 20, color: 'blue'}}
                  />
                </View>
                <View>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 15}}>
                    mumbai,0001900
                  </Text>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 15}}>
                    opp xyz raliway station
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{fontSize: 20, color: 'black'}}
              />
            </View>
          </View>
          <View style={{paddingHorizontal: 16, marginVertical: 10}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              Payment method
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    color: 'blue',
                    backgroundColor: '#dedddc',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    borderRadius: 10,
                    marginRight: 18,
                  }}>
                  <Image
                    source={require('../assests/gpay.png')}
                    style={{height: 30, width: 30}}
                  />
                </View>
                <View>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 15}}>
                    UPI ID
                  </Text>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 15}}>
                    abcde******@okaxis
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{fontSize: 20, color: 'black'}}
              />
            </View>
          </View>
          <View style={{marginHorizontal: 16, marginTop: 20}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              Order info
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: 'black',
                }}>
                SubTotal
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: 'black',
                }}>
                &#8377;{sum}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'black',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: 'black',
                }}>
                GST charges
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: 'black',
                }}>
                &#8377;{gstCharges}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: 'black',
                }}>
                Total Amount
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: 'black',
                }}>
                &#8377;{totalPrice}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          height: '8%',
          alignItems: 'center',
          justifyContent: 'center',
          position: "absolute",
          bottom: 8,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            height: '80%',
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: 'white',
            }}>
            Checkout( &#8377;{totalPrice})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Cart;
