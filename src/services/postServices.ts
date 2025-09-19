import { SupabaseClient } from "@supabase/supabase-js"
import { useSupabase } from "../lib/supabase"
import { Database } from "../types/database.types"

  export const fetchPosts = async(supabase:SupabaseClient<Database>)=>{
    const {data,error} = await supabase.from("posts")
    .select("*, group:groups(*), upvotes(value.sum()), nr_of_comments:comments(count)")
    .order("created_at",{ascending:false})
    
    if(error){
      console.log(error)
      throw error
    }else{
      return data
    }
  }

  export const fetchPostById = async(id:string, supabase:SupabaseClient<Database>)=>{
    const {data,error} = await supabase.from("posts").select("*, group:groups(*), upvotes(value.sum()), nr_of_comments:comments(count)")
    .eq("id",id)
    .single()
    if(error){
      console.log(error)
      throw error
    }else{
      return data
    }
  }

  // export const fetchPostUpVotes = async (id:string, supabase:SupabaseClient<Database>)=>{
  //   const{data,error}= await supabase.from("upvotes").select("value.sum()").eq("post_id",id)
  //   if(error){
  //     throw error
  //   }else{
  //     return data
  //   }
  // }

  export const fetchComments = async(postId:string, supabase: SupabaseClient<Database>) =>{
    const {data,error} = await supabase.from("comments").select("*,replies:comments(*)").eq("post_id",postId).is("parent_id",null)
      if(error){
      console.log(error)
      throw error
    }else{
      return data
    }
  }
  export const fetchCommentsReplies = async(parentId:string, supabase: SupabaseClient<Database>) =>{
    const {data,error} = await supabase.from("comments").select("*,replies:comments(*)").eq("parent_id",parentId)
      if(error){
      console.log(error)
      throw error
    }else{
      return data
    }
  }


  export const deletePostById = async(id:string,supabase:SupabaseClient<Database>)=>{
    const {data,error} = await supabase.from("posts").delete().eq("id",id)
    if(error){
      throw error
    }else{
      return data
    }
  }