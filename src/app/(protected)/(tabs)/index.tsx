import React, { useEffect, useState } from 'react'
import PostListItem from '../../../components/PostListItem';
// import posts from "../../../../assets/data/posts.json"
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { supabase } from '../../../lib/supabase';
// import { Post } from '../../../types';
import { Tables } from '../../../types/database.types';
import { useQuery } from '@tanstack/react-query';

type PostWithGroupAndName = Tables<"posts"> & {
  user: Tables<"users">
  group:Tables<"groups">
}

  const fetchPosts = async()=>{
    const {data,error} = await supabase.from("posts").select("*, group:groups(*),user:users!posts_user_id_fkey(*)")
    // console.log(error)
    // console.log(JSON.stringify(data, null ,2))
    if(error){
      console.log(error)
      throw error
    }else{
      return data
    }
  }

const HomeScreen = () => {

  const {data: posts, error, isLoading} = useQuery({
    queryKey:["posts"],
    queryFn: () => fetchPosts()
  })

  if(isLoading){
    return <ActivityIndicator size={24} color={"green"}/>
  }

  if(error){
    return <Text>Error while fetching posts.</Text>
  }

  return (
    <View>
   <FlatList 
   data={posts} 
   renderItem={({item})=><PostListItem post={item}/>}
   />
    </View>
  )
}

export default HomeScreen
