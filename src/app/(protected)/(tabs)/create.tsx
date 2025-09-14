import { View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {AntDesign} from "@expo/vector-icons"
import {Link, router} from "expo-router"
import { selectedGroupAtom } from '../../../atoms'
import { useAtom } from 'jotai'

const CreateScreen = () => {
  const [title, setTitle] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [group, setGroup]= useAtom(selectedGroupAtom)

  const goBack =() =>{
    setTitle("")
    setBody("")
    setGroup(null)
    router.back()
  }
  return (
    <SafeAreaView style={{backgroundColor: "white", flex:1, paddingHorizontal:10}}>
      {/* Header */}
      <View style={{flexDirection:"row",alignItems:"center"}}>
        <AntDesign name='close' size={30} color={"black"} onPress={goBack}/>
      <Pressable onPress={()=>console.log("Pressed!")} style={{ marginLeft:"auto"}}>
        <Text style={styles.postText}>Post</Text>
      </Pressable>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{flex:1}}>
        <ScrollView showsHorizontalScrollIndicator={false} style={{paddingVertical:10}}>

      {/* Community Selector */}
      <Link href={"/groupSelector"} asChild>
      <Pressable style={styles.communityContainer}>
        {group ? (
          <>
          <Image source={{uri:group.image}} style={{width:20, height:20, borderRadius:10}}/>
          <Text style={{fontWeight:"bold"}}>{group.name}</Text>
          </>
        ):(
          <>
        <Text style={styles.rStyles}>r/</Text>
        <Text style={{fontWeight:"bold"}}>Select a community</Text>
          </>
        )}
      </Pressable>
      </Link>

      {/* Input */}
      <TextInput placeholder='Title' 
      style={{
        fontSize:20, 
        fontWeight:"bold", 
        paddingVertical:20
      }} 
      value={title} 
      onChangeText={(text)=>setTitle(text)} 
      multiline 
      scrollEnabled={false}/>

      <TextInput placeholder='body text [optional]' 
      value={body}      
      onChangeText={(text)=>setBody(text)}
      multiline 
      scrollEnabled={false}/>

        </ScrollView>
       </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
  postText:{
    color:"white",
    backgroundColor:"#115BCA", 
    fontWeight:"bold", 
    paddingVertical:2, 
    paddingHorizontal:7,
    borderRadius:10
  },
  rStyles:{
    backgroundColor:"black",
    color:"white",
    paddingVertical:1,
    paddingHorizontal:5,
    borderRadius:10,
    fontWeight:"bold",
  },
  communityContainer:{
    backgroundColor:"#EDEDED",
    flexDirection:"row",
    gap:5,
    padding:10,
    borderRadius:20,
    alignSelf:"flex-start",
    marginVertical:10,
  }
})