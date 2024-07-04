import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getuserlist } from './redux/action'


const UserList = () => {
  const userList=useSelector((state)=> state.reducer)

  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(getuserlist())
  },[])

  console.warn("in componrn",userList)

  return (
    <View style={styles.container}>
      <Text>UserList </Text>
    </View>
  )
}

export default UserList

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})