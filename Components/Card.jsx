import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useState, memo } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const Card = (props) => {

  const cardPress = () => {
    let myData = { title: props.title }
    props.setData(myData)
    props.navigation.push('detail')
  }

  const [source, setSource] = useState('https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg');
  return (
    <Pressable className="my-5 bg-transparent  px-2" onPress={() => { cardPress() }} style={{height:220, marginBottom:10}}>
      <View className="bg-black rounded-xl">
        <Image
          placeholder={'ggg'}
          className="w-full rounded-xl opacity-[0.30]"
          style={{height:220}}
          source={source}
          onLoad={(e) => {

            setSource(props.url);
          }}
          tintColor={"black"}
          contentFit="cover"
          blurRadius={1.2}
        />

      </View>
      <View className="absolute w-full items-center flex flex-row justify-between bg-transparent top-0 left-0 p-4">
        <Text className="text-gray-100 font-semibold text-xl p-1">
          {props.title}
        </Text>
        <Text className='text-white p-2'>
          2023 6
        </Text>
      </View>

      <View className="absolute bg-transparent bottom-0 flex flex-row gap-3  py-4  w-full">
        {/*platforms*/}
        <View className='flex flex-column items-start w-full gap-2'>
          <View className='flex flex-row justify-start items-center gap-3'>
            <FontAwesome5 name="playstation" size={16} color="white" />
            <FontAwesome5 name="xbox" size={16} color="white" />
            <FontAwesome5 name="windows" size={16} color="white" />
          </View>
          <View className='px-3'>
            <Text className='text-white font-semibold text-[10px]'>Action  RPG  SandBox ....  18+</Text>
          </View>
        </View>
        {/*rating*/}


        <View className='border-green-400 border border-2 px-[4px] py-[2px] rounded-md absolute bottom-4 flex justify-center right-0'>
          <Text className='text-green-400 font-bold text-center'>81</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default Card;
