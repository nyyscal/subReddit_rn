import React from 'react'
import PostListItem from '../../../components/PostListItem';
import posts from "../../../../assets/data/posts.json"
import { FlatList, View } from 'react-native';

const HomeScreen = () => {
  
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
