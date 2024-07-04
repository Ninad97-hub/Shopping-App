import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dummy_product} from '../ProductData/ProductData';
import {addToCartItem, removeFromCart} from './redux/action';
import {useDispatch, useSelector} from 'react-redux';
const ProductInfo = ({route,navigation}) => {
  const [productInfoItem, setProductInfoItem] = useState({});
  const {productId} = route.params;
  const dispatch = useDispatch()
  const width = Dimensions.get('window').width;
  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);
  //    useEffect(()=> getSelectedproduct,[navigation])

  useEffect(() => getSelectedproduct(), [productId]);

  const getSelectedproduct = () => {
    dummy_product.map((ele, index) => {
      if (ele.id === productId) {
        setProductInfoItem(dummy_product[index]);
      }
    });
  };

  const addItemhandler = data => {
    dispatch(addToCartItem(data));
    ToastAndroid.show('Product Added Succesfully',ToastAndroid.SHORT)
  };

  const renderProduct = ({item, index}) => {
    return (
      <View
        style={{
          width: width,
          height: 250,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={item}
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
      }}>
      <StatusBar backgroundColor="#cbd0d6" barStyle="dark-content" />
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: '#b2b8b5',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
              paddingBottom: 20,
            }}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 20,
                  color: '#2e2d2c',
                  padding: 12,
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={
              productInfoItem.productImageList
                ? productInfoItem.productImageList
                : null
            }
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.9}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'centre',
              justifyContent: 'center',
            }}>
            {productInfoItem.productImageList
              ? productInfoItem.productImageList.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: '16%',
                        height: 4,
                        backgroundColor: 'black',
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <View
          style={{
            padding: 10,
            marginVertical: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Entypo
              name="shopping-cart"
              color="blue"
              style={{fontSize: 20, marginRight: 6}}
            />
            <Text style={{fontSize: 20}}>Shopping cart</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 7,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '600',
                marginVertical: 7,
                maxWidth: '80%',
              }}>
              {productInfoItem.name}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                padding: 8,
                color: 'blue',
                backgroundColor: '#0000FF' + 10,
                borderRadius: 100,
              }}
            />
          </View>
          <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
            Delivery loaction
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f5eceb',
              padding: 8,
              marginVertical: 12,
              borderRadius: 10,
              elevation: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
                marginLeft: 0,
              }}>
              <View
                style={{
                  backgroundColor: '#dcdcde',
                  padding: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  margin: 10,
                }}>
                <Entypo
                  name="location-pin"
                  style={{fontSize: 24, color: 'blue'}}
                />
              </View>
              <Text>Mumbai-40002</Text>
            </View>
            <Entypo name="chevron-right" style={{fontSize: 25}} />
          </View>
          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
              &#8377;{productInfoItem.price}
            </Text>
            <Text>GST 18%:- &#8377;{(18 / 100) * productInfoItem.price} </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          height: '8%',
          alignItems: 'center',
          justifyContent:'center',
          position: 'absolute',
          bottom: 8,
        }}>
        <TouchableOpacity
        onPress={()=>productInfoItem.isAvaliable ? addItemhandler(productInfoItem) : null}
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
            {productInfoItem.isAvaliable ? 'ADD TO CART' : 'NOT AVALIABLE'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({});
