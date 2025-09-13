import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import posts from "../../../../assets/data/posts.json"
import PostListItem from "../../../components/PostListItem";

export default function DetailedPost(){
  const {id} = useLocalSearchParams()

  const detailPost = posts.find((post)=> post.id === id)
  if(!detailPost) {
    return <Text>Post not found!</Text>
  }
  // console.log(detailPost)

  return(
    <View>
      <PostListItem post={detailPost} isDetailedPost/>
    </View>
  )
}