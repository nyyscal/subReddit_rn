import { View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {AntDesign} from "@expo/vector-icons"
import {Link, router} from "expo-router"
import { selectedGroupAtom } from '../../../atoms'
import { useAtom } from 'jotai'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, useSupabase } from '../../../lib/supabase'
import { Database, TablesInsert } from '../../../types/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

type InsertPost = TablesInsert<'posts'>

  const insertPost = async(post: InsertPost, supabase: SupabaseClient<Database>)=>{
    {
      //use supabase
      const  {data,error} =await supabase.from("posts").insert(post).select().single()
      if(error){
        throw error
      }else{
        return data
      }
    }
  }

  
  const CreateScreen = () => {
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [group, setGroup]= useAtom(selectedGroupAtom)
    
    const queryClient = useQueryClient()

    const supabase = useSupabase()

   const goBack =() =>{
    setTitle("")
    setBody("")
    setGroup(null)
    router.back()
  }

   const { mutate, isPending } = useMutation({
  mutationFn: async () => {
    if (!group) {
      throw new Error("Please select a group.");
    }
    if (!title) {
      throw new Error("Please select a title.");
    }
    if (!body) {
      throw new Error("Please select a body.");
    }

    return await insertPost({
      title,
      description: body,
      group_id: group.id,
    },
  supabase
);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    goBack();
  },
  onError: (error) => {
    // console.error(error);
    Alert.alert("Failed to insert post.",error.message);
  },
});



 
  return (
    <SafeAreaView style={{backgroundColor: "white", flex:1, paddingHorizontal:10}}>
      {/* Header */}
      <View style={{flexDirection:"row",alignItems:"center"}}>
        <AntDesign name='close' size={30} color={"black"} onPress={goBack}/>
      <Pressable onPress={()=>mutate()} disabled={isPending} style={{ marginLeft:"auto"}}>
        <Text style={styles.postText}>{isPending? "Posting...":"Post"}</Text>
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