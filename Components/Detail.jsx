import { View, Text, Dimensions, Button, Pressable } from "react-native";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated } from "react-native";
import Swiper from "./Swiper";
import { useState, useRef } from "react";

const DATA = [
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb5L8em_1UomoVWfuVifjcYt2RXfQnq01mj9d-b2HN-ZG3QxpS2zYA5jcstBq28B7d10U&usqp=CAU",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb5L8em_1UomoVWfuVifjcYt2RXfQnq01mj9d-b2HN-ZG3QxpS2zYA5jcstBq28B7d10U&usqp=CAU",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb5L8em_1UomoVWfuVifjcYt2RXfQnq01mj9d-b2HN-ZG3QxpS2zYA5jcstBq28B7d10U&usqp=CAU",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb5L8em_1UomoVWfuVifjcYt2RXfQnq01mj9d-b2HN-ZG3QxpS2zYA5jcstBq28B7d10U&usqp=CAU",
  },
];

const ScreenshotsView = (props) => {
  if(props.swiperVisible)return
  return (
    <>
      <Pressable className='w-full h-[20%] relative flex-row jusitfy-between' onPress={()=>{
        props.setHeaderVisibility(false)
        props.setSwiperVisible(true)
      }}>
        <Image source={DATA[0].url} contentFit="contain" blurRadius={2} className='h-full w-full'/>


        <View className='bg-black opacity-1 w-full h-full absolute opacity-50'></View>
        <Text className='absolute bottom-0 right-0 text-white text-xl px-5 font-bold'>{DATA.length} <MaterialCommunityIcons name="image-multiple-outline" size={24} color="white" /></Text>
      </Pressable>
    </>
  );
};

export default (props) => {
  const [swiperVisible, setSwiperVisible] = useState(false);


  return (
    <View className="w-full h-full">
      <Swiper
        data={DATA}
        swiperVisible={swiperVisible}
        setHeaderVisibility={props.setHeaderVisibility}
        setSwiperVisible={setSwiperVisible}

      />
      <View className="w-full h-full">
        <ScreenshotsView setSwiperVisible={setSwiperVisible} setHeaderVisibility={props.setHeaderVisibility} swiperVisible={swiperVisible}/>
      </View>
    </View>
  );
};
