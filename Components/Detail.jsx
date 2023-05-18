import { View, Text, Pressable, Dimensions, KeyboardAvoidingView } from "react-native";
import { Image } from "expo-image";
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import Swiper from "./Swiper";
import Loading from "./Loading";
import CommentsModal from './CommentsModal'
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";

const Description = ({text})=>{
  let texts = text.split('\n')

  return texts.map((text)=>{
    if(text.length<=1)return
    return <Text className='text-white font-semibold text-sm leading-snug my-1'>{text.trim()}</Text>
  })
}

const PLATFORMS = {
  1: <FontAwesome5 name="windows" size={25} color="white" key={1} />,
  2: <FontAwesome5 name="playstation" size={25} color="white" key={2} />,
  3: <FontAwesome5 name="xbox" size={25} color="white" key={3} />,
  5: <AntDesign name="android1" size={25} color="white" key={5} />,
  6: <FontAwesome5 name="apple" size={25} color="white" key={6} />,
  7: <FontAwesome5 name="ubuntu" size={25} color="white" key={7} />,
  8: 
    <MaterialCommunityIcons
      name="nintendo-switch"
      size={25}
      color="white"
      key={8}
    />
  ,
};

const fetchData = async (
  id,
  setDetailData,
  setScreenshots,
  setFetchLoading
) => {
  setFetchLoading(true);
  let SCREENSHOTS = [];
  let screenshots = await fetch(
    `https://game-browser-api.vegetaxxsan.repl.co/games/screenshots/${id}`
  );
  let response = await fetch(
    `https://game-browser-api.vegetaxxsan.repl.co/game/${id}`
  );
  let scData = await screenshots.json();
  let data = await response.json();
  await Promise.all(scData.results.map( async (obj) => {
    let img = obj.image;
    const compressed = await manipulateAsync(img,[{resize:{height:450}}],{ format:SaveFormat.PNG})
    SCREENSHOTS.push({ url: compressed.uri});
  }));
  setScreenshots(SCREENSHOTS);

  setDetailData(data)
  setFetchLoading(false);
};

const ScreenshotsView = (props) => {
  let img = props.SCREENSHOTS[0].url;
  return (
    <>
      <Pressable
        className="w-full h-[20%] relative flex-row jusitfy-between"
        onPress={() => {
          props.setHeaderVisibility(false);
          props.setSwiperVisible(true);
        }}
      >
        <Image
          source={img}
          contentFit="contain"
          blurRadius={2}
          className="h-full w-full"
        />

        <View className="bg-black opacity-1 w-full h-full absolute opacity-50"></View>
        <Text className="absolute bottom-0 right-0 text-white text-xl px-5 font-bold">
          {props.SCREENSHOTS.length}{" "}
          <MaterialCommunityIcons
            name="image-multiple-outline"
            size={24}
            color="white"
          />
        </Text>
      </Pressable>
    </>
  );
};

export default (props) => {
  const [swiperVisible, setSwiperVisible] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [SCREENSHOTS, setScreenshots] = useState([{url:'https://images.unsplash.com/photo-1568433154467-f5f907bf7741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'}]);
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData(
      props.detailData.id,
      setData,
      setScreenshots,
      setFetchLoading
    );
  }, [props.detailData.id]);

 
  if (fetchLoading) return  <Loading loading={fetchLoading} />;

  if (swiperVisible)
    return (
      <Swiper
        data={SCREENSHOTS}
        swiperVisible={swiperVisible}
        setHeaderVisibility={props.setHeaderVisibility}
        setSwiperVisible={setSwiperVisible}
      />
    );

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
    enabled={Platform.OS === "ios" ? true : false}
    className="w-full h-full"
  >
      <View className="w-full h-full">
        <ScreenshotsView
          SCREENSHOTS={SCREENSHOTS}
          setSwiperVisible={setSwiperVisible}
          setHeaderVisibility={props.setHeaderVisibility}
          swiperVisible={swiperVisible}
        />
        <View className='flex flex-row py-3 px-4 gap-3 w-full bg-transparent'>
        {props.detailData.platforms.map((obj) => {
              return PLATFORMS[obj.platform.id];
            })}
        </View>
        <ScrollView style={{maxHeight:Dimensions.get('screen').height*0.645}}>
        <View className='px-3 py-2'>
        <Description 
        text={data.description.replace(/<[^>]*>?/gm, '').replace(/[0-9|!|@|#|$|%|^|&|*|(|)|;]/gm,'').replaceAll('.','.\n')}
        />
        </View>
        <View className='w-full flex justify-center'>
        <Pressable className='px-10 py-5 '>
        <Text className='text-white font-bold text-2xl bg-purple-500 rounded-lg text-center px-5 py-2'> <MaterialCommunityIcons name='comment' size={22}  color={'white'}/> Comments </Text>
        </Pressable>
        </View>
        </ScrollView>

      </View>
    </KeyboardAvoidingView>
  );
};
