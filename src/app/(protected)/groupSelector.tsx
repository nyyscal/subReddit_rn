import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {AntDesign} from "@expo/vector-icons"
import { router } from 'expo-router'
import groups from "../../../assets/data/groups.json"
import { selectedGroupAtom } from '../../atoms'
import { useSetAtom } from 'jotai'
import { useQuery } from '@tanstack/react-query'
import { fetchGroups } from '../../services/groupServices'
import { Tables } from '../../types/database.types'

type Group = Tables<"groups">

const GroupSelector = () => {

  const [searchValue,setSearchValue] = useState<string>("")
  const setGroup = useSetAtom(selectedGroupAtom)
  
  const {data,error,isLoading} = useQuery({
    queryKey:["groups", {searchValue}],
    queryFn:()=>fetchGroups(searchValue),
    staleTime:3000,
    placeholderData:(previousData) => previousData
  })
  
  const onGroupSelect = (group:Group) =>{
    setGroup(group)
    router.back()
  }
  
  if(isLoading){
    return <ActivityIndicator size={24} color={"green"}/>
  }
  
  if(error || !data){
    return <Text>Error while fetching posts.</Text>
  }

  // const filteredGroups = data.filter((group)=> group.name.toLocaleLowerCase().includes(searchValue.toLowerCase()))
  
  return (
    <SafeAreaView style={{marginHorizontal:10, flex:1}}>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <AntDesign name='close' size={30} color={"black"} onPress={()=>router.back()}/>
          <Text style={{fontSize:16, fontWeight:"bold", textAlign:"center", flex:1, paddingRight:30}}>Post to </Text>
      </View>

      <View style={{flexDirection:"row", backgroundColor:"lightgrey", borderRadius:5, gap:5, marginVertical:10, alignItems:"center", paddingHorizontal:5}}>
        <AntDesign name='search1' size={16} color={"grey"}/>
        <TextInput placeholder='Search for a community' placeholderTextColor={"grey"} 
        style={{ paddingVertical:10, flex:1}} value={searchValue} 
        onChangeText={(text)=>setSearchValue(text)}/>
        {searchValue && (
          <AntDesign name='closecircle' size={15} color={"#E4E4E4"} onPress={()=>setSearchValue("")}/>
        )}
      </View>

      <FlatList data={data} renderItem={({item})=>(
        <Pressable
        onPress={()=>onGroupSelect(item)}
         style={{flexDirection:'row', alignItems:"center", gap:5, marginBottom:20}}>
          <Image source={{uri: item.image}} style={{width:40, aspectRatio:1, borderRadius:20}}/>
          <Text style={{fontWeight:"600"}}>{item.name}</Text>
        </Pressable>
      )}/>

    </SafeAreaView>
  )
}

export default GroupSelector

const styles = StyleSheet.create({})