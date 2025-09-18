import React, { useEffect, useState } from 'react'
import PostListItem from '../../../components/PostListItem';
// import posts from "../../../../assets/data/posts.json"
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { supabase, useSupabase } from '../../../lib/supabase';
// import { Post } from '../../../types';
import {fetchPosts} from "../../../services/postServices"
import { Tables } from '../../../types/database.types';
import { useQuery } from '@tanstack/react-query';

type PostWithGroupAndName = Tables<"posts"> & {
  user: Tables<"users">
  group:Tables<"groups">
}

const HomeScreen = () => {

  const supabase = useSupabase()

  const {data: posts, error, isLoading, refetch, isRefetching} = useQuery({
    queryKey:["posts"],
    queryFn: () => fetchPosts(supabase)
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
   renderItem={({item})=><PostListItem post={item}/>} onRefresh={refetch} refreshing={isRefetching}
   />
    </View>
  )
}

export default HomeScreen
