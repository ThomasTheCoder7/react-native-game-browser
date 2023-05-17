import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useState, memo } from "react";
import { FontAwesome5, MaterialCommunityIcons,AntDesign } from "@expo/vector-icons";

const PLATFORMS = {
  1: <FontAwesome5 name="windows" size={16} color="white" key={1} />,
  2: <FontAwesome5 name="playstation" size={16} color="white" key={2} />,
  3: <FontAwesome5 name="xbox" size={16} color="white" key={3} />,
  5: <AntDesign name="android1" size={16} color="white" key={5} />,
  6: <FontAwesome5 name="apple" size={16} color="white" key={6} />,
  7: <FontAwesome5 name="ubuntu" size={16} color="white" key={7} />,
  8: (
    <MaterialCommunityIcons
      name="nintendo-switch"
      size={16}
      color="white"
      key={8}
    />
  ),
};

const CardTitle = ({ title }) => {
  return (
    <Text
      className={`text-gray-100 font-semibold text-lg p-1 break-all w-9/12`}
    >
      {title}
    </Text>
  );
};

const AGE = (esrb_rating) => {
  let slug = null;
  let rating = {
    everyone: "+5",
    "everyone-10-plus": "+10",
    teen: "+15",
    mature: "+18",
    "adults-only": "21",
    "rating-pending": "TBD",
  };
  if (esrb_rating != null) slug = esrb_rating.slug;
  return esrb_rating != null ? rating[slug] : "TBD";
};

const Rating = (props) => {
  let color = "green-400";
  rating = props.rating == null ? " ? " : props.rating;
  if (rating < 60) {
    color = "#dc2626";
  }
  if (rating >= 60) {
    color = "#eab308";
  }
  if (rating > 80) {
    color = "#4ade80";
  }
  if (rating == " ? ") {
    color = "#d4d4d4";
  }
  return (
    <View
      className="border border-2 px-[4px] py-[2px] rounded-md absolute bottom-4 flex justify-center right-0"
      style={{ borderColor: color }}
    >
      <Text className="font-bold text-center" style={{ color: color }}>
        {rating}
      </Text>
    </View>
  );
};

const Card = (props) => {
  const cardPress = () => {
    let myData = { title: props.title, id: props.id, platforms: props.platforms };
    props.setData(myData);
    props.navigation.navigate("detail");
  };

  const formatDate = (date) => {
    const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    try {
      let formatted = date.split("-");
      return `${MONTHS[formatted[1] - 1]} ${formatted[2]} / ${formatted[0]}`;
    } catch (e) {}
  };

  const [source, setSource] = useState(
    "https://images.unsplash.com/photo-1568433154467-f5f907bf7741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
  );
  return (
    <Pressable
      className="my-5 bg-transparent  px-2"
      onPress={() => {
        cardPress();
      }}
      style={{ height: 220, marginBottom: 10 }}
    >
      <View className="bg-black rounded-xl">
        <Image
          placeholder={"ggg"}
          className="w-full rounded-xl opacity-[0.40]"
          style={{ height: 220 }}
          source={source}
          onLoad={(e) => {
            setSource(props.url);
          }}
          tintColor={"black"}
          contentFit="cover"
          blurRadius={1.2}
        />
      </View>
      <View className="absolute w-full h-1/12 flex flex-row justify-between bg-transparent top-0 left-0 p-4">
        <CardTitle title={props.title} />
        <Text className="text-white p-2">{formatDate(props.released)}</Text>
      </View>

      <View className="absolute bg-transparent bottom-0 flex flex-row gap-3  py-4  w-full">
        {/*platforms*/}
        <View className="flex flex-column items-start w-full gap-2">
          <View className="flex flex-row justify-start items-center gap-3">
            {props.platforms.map((obj) => {
              return PLATFORMS[obj.platform.id];
            })}
          </View>
          <View className="px-3">
            <Text className="text-white font-semibold text-[10px] w-full">
              {props.genres.map((obj, i) => {
                return props.genres.length <= i + 1
                  ? `${obj.name}  `
                  : `${obj.name}, `;
              })}{" "}
              {AGE(props.esrb_rating)}
            </Text>
          </View>
        </View>
        {/*rating*/}
        <Rating rating={props.rating} />
      </View>
    </Pressable>
  );
};

export default Card;
