import { useLocalSearchParams } from "expo-router";
import { FlatList, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import posts from "../../../../assets/data/posts.json"
import PostListItem from "../../../components/PostListItem";
import Comments from "../../../../assets/data/comments.json"
import CommentListItem from "../../../components/CommentListItem";
import { useState, useRef, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DetailedPost(){
  const {id} = useLocalSearchParams()

  const detailPost = posts.find((post)=> post.id === id)

  const postComment = Comments.filter((comment)=> comment.post_id === "post-1")
  // console.log(postComment)

  const insets = useSafeAreaInsets()

  const [comment,setComment] = useState<string>("")
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false)

  const inputRef = useRef<TextInput | null>(null)

  const handleReplyButtonPressed = useCallback((commentId: string) =>{
    console.log(commentId)
    inputRef.current?.focus()
  },[])

  if(!detailPost) {
    return <Text>Post not found!</Text>
  }
  // console.log(detailPost)

  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding": undefined} 
    style={{flex:1}}
    keyboardVerticalOffset={insets.top + 10}
    >
      <FlatList 
      data={postComment} 
      renderItem={({item})=>(
      <CommentListItem comment={item} depth={0} handleReplyButtonPressed={handleReplyButtonPressed}/>
      )}
      ListHeaderComponent={<PostListItem post={detailPost} isDetailedPost/>}
      />
      <View
        style={{
          paddingBottom: insets.bottom,
          borderBottomColor: "lightgray",
          padding: 10,
          backgroundColor: "white",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 4,
        }}
      >
        <TextInput 
        placeholder="Join the conversation"
        style={{backgroundColor:"#E4E4E4", padding:5, borderRadius:5}}
        value={comment}
        onChangeText={(text)=>setComment(text)}
        multiline
        onFocus={()=>setIsInputFocused(true)}
        onBlur={()=>setIsInputFocused(false)}
        ref={inputRef}
        />
       {isInputFocused && <Pressable 
       style={{
        backgroundColor: "#0d469b", 
        borderRadius:15, 
        marginLeft:"auto", 
        marginTop:15,
        }}>
          <Text style={{
            color:"white", 
            paddingVertical:5, 
            paddingHorizontal:10, 
            fontWeight:"bold"}}>
              Reply
            </Text>
        </Pressable>}
      </View>
    </KeyboardAvoidingView>
  )
}