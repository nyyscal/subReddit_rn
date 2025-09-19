import { ComponentProps, useEffect, useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { downloadImage } from "../utils/supabaseImages";
import { useSupabase } from "../lib/supabase";

type ImageProps ={
  path: string;
  bucket:string
} & ComponentProps< typeof Image>


export default function SupabaseImage({path,bucket,...imageProps}:ImageProps){
    const [image,setImage]= useState<string | null>()
    const supabase = useSupabase()
    const [isLoading,setIsLoading] = useState(true)
    const handleDownload = async()=>{
      const result = await downloadImage(path,supabase)
      setImage(result)
      setIsLoading(false)
    }

   useEffect(()=>{
    setIsLoading(true)
    if(path && bucket){
      handleDownload()
    }else{
      setIsLoading(false)
    }
  },[path, bucket])

  if(isLoading){
    return( <View style={[{backgroundColor:"gainsboro", alignItems:"center", justifyContent:"center"},imageProps.style]}>
      <ActivityIndicator size={24}/>
    </View>)
  }
  
  return(
    <Image source={{uri:image}} {...imageProps}/>
  )
}