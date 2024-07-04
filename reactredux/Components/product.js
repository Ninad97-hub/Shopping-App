import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {dummy_product} from '../ProductData/ProductData';
const Product = ({navigation}) => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.reducer);



  const removeFromCartHandler = item => {
    dispatch(removeFromCart(item.name));
  };

  const ProductCard = ({data}) => {
    return (
      <TouchableOpacity
      onPress={()=>navigation.navigate('Productinfo',{productId:data.id})}
        style={{
          marginVertical: 14,
          width: '48%',
        
        }}>
        <View
          style={{
            backgroundColor: '#c4c4cf',
            width: '100%',
            height: 100,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            elevation: 10,
          }}>
          {data.isOff ? (
            <View
              style={{
                width: '20%',
                height: '20%',
                position: 'absolute',
                backgroundColor: '#00AC76',
                top: 0,
                left: 10,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
              }}>
              <Text>{data.offPercentage}</Text>
            </View>
          ) : null}
          <Image
            source={data.image}
            style={{width: '80%', height: '80%', resizeMode: 'contain'}}
          />
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 5,
          }}>
          {data.name}
        </Text>
        <View>
          {data.isAvaliable ? (
            <FontAwesome name="circle" style={{color: 'green',fontSize:15,fontWeight:'500'}}>
              &nbsp;Avaliable
            </FontAwesome>
          ) : (
            <FontAwesome name="circle" style={{color: 'red',fontSize:15,fontWeight:'500'}}>
             &nbsp;Unavaliable
            </FontAwesome>
          )}
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'black',
          }}>
          &#8377;{data.price}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#f5f2f3',
        }}>
        <StatusBar backgroundColor="#f5f2f3" barStyle="dark-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            }}>
            <TouchableOpacity>
              <Entypo
                name="shopping-bag"
                style={{
                  fontSize: 18,
                  color: 'red',
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: '#7a7976',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
              <MaterialCommunityIcons
                name="cart"
                style={{
                  fontSize: 18,
                  color: 'red',
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: '#7a7976',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                letterSpacing: 2,
                fontWeight: '500',
                marginBottom: 10,
              }}>
              Hii This Your Shopping Mart
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                letterSpacing: 2,
                fontWeight: '500',
              }}>
              Unleash the Trendsetter Within
              {'\n'}This Shop offers both product and services
            </Text>
          </View>
          <View
            style={{
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  letterSpacing: 2,
                  fontWeight: '500',
                }}>
                products
              </Text>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 5,
                }}>
                {dummy_product.length}
              </Text>
            </View>
            <View>
              <Text style={{color: 'blue', fontSize: 14, fontWeight: '500'}}>
                See All
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {dummy_product.map(item => (
              <ProductCard data={item} key={item.id} />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* <View style={styles.container}>
        <Text style={{fontSize: 24,color:'#382f2e'}}>{props.item.name} </Text>
        <Text style={{fontSize: 24,color:'#382f2e'}}>{props.item.price}</Text>
        <Text style={{fontSize: 24,color:'#382f2e'}}>{props.item.color}</Text>
          <Button
            title="remove from cart"
            onPress={() => removeFromCartHandler(props.item)}
          />
        
          <Button
            title="Add to cart"
            onPress={() => addItemhandler(props.item)}
          />
        
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    marginTop: 10,
  },
});

export default Product;
