import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Detail from "./Detail";
import Title from "./Title";
import { createStackNavigator } from "@react-navigation/stack";
import Card from "./Card";
import { useRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

const config = {
  animation: "spring",
  config: {
    stiffness: 10000,
    damping: 500,
    mass: 100,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const MyGoBackBtn = (props) => {
  return (
    <>
      <Pressable
        className="px-5 justify-center"
        onPress={() => {
          props.navigation.navigate("home");
        }}
      >
        <Ionicons name="arrow-back" size={26} color="#ffffff" />
      </Pressable>
    </>
  );
};

const SearchStack = createStackNavigator();
export default (props) => {
  const [data, setData] = useState({});
  const [detailData, setDetailData] = useState([]);
  const [headerVisibility, setHeaderVisibility] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const scrollOffset = useRef(0);
  const flashListRef = useRef();

  const fetchData = async (setData, query) => {
    setFetchLoading(true);
    let Data = [];
    try {
      let response = await fetch(
        `https://game-browser-api.vegetaxxsan.repl.co/games/${query}`
      );
      let myData = await response.json();
      Data = myData.results;
    } catch (e) {
      console.log(e);
    }
    setData(Data);
    setFetchLoading(false);
  };

  useEffect(() => {
    if (search != "") fetchData(setData, search);
  }, [search]);

  const CardList = ({ navigation }) => {
    const [loading, setLoading] = useState(true);

    function renderItem({ item, index }) {
      return (
        <Card
          id={item.id}
          url={item.background_image}
          esrb_rating={item.esrb_rating}
          title={item.name}
          released={item.released}
          rating={item.metacritic}
          platforms={item.parent_platforms}
          genres={item.genres}
          navigation={navigation}
          setData={setDetailData}
        />
      );
    }

    return (
      <>
        <View
          style={{
            backgroundColor: "#181920",
            borderWidth: 0,
            width: Dimensions.get("screen").width,
            height: "98%",
            flexGrow: 0,
          }}
        >
         {search.length>0?<Title><Text>Search results for "{search}"</Text></Title>:<></>}
          <FlashList
            ref={(ref) => (flashListRef.current = ref)}
            data={data}
            renderItem={renderItem}
            estimatedItemSize={data.length}
            onScroll={(e) => {
              scrollOffset.current = e.nativeEvent.contentOffset.y;
            }}
            onLoad={() => {
              setTimeout(() => {
                setLoading(false);
                try{

                  flashListRef.current.scrollToOffset({
                    offset: scrollOffset.current,
                  });
                }catch(e){}
              }, 120);
            }}
          />
          <Loading loading={(loading || fetchLoading) && search != ""} />
        </View>
      </>
    );
  };
  return (
    <>
      <SearchStack.Navigator
        initialRouteName="home"
        screenOptions={{
          detachPreviousScreen: false,
          transitionSpec: { close: config, open: config },
          headerMode: "float",
        }}
      >
        <SearchStack.Screen
          name="home"
          component={CardList}
          options={{
            
            headerTitle:(props) => <SearchBar search={search} setSearch={setSearch} />,
            
            headerStyle: { backgroundColor: "#181920" },
            headerTitleContainerStyle:{justifyContent:'center', width:'100%', marginTop:10, paddingHorizontal:20},
            headerTitleAlign: "center",
            headerTitleStyle:{width:'100%'},
            transitionSpec: { open: config, close: config },
            presentation: "modal",
          }}
        />
        <SearchStack.Screen
          name="detail"
          options={({ navigation }) => ({
            title: <Title>{detailData.title}</Title>,
            headerStyle: { backgroundColor: "#181920" },
            headerLeftContainerStyle: { width: "100%" },
            headerMode: "float",
            headerTitleAlign: "center",
            headerShown: headerVisibility,
            transitionSpec: { open: config, close: config },
            headerLeft: () => (
              <MyGoBackBtn
                navigation={navigation}
                flashListRef={flashListRef}
              />
            ),
          })}
        >
          {(props) => (
            <Detail
              {...props}
              setDetailData={setDetailData}
              detailData={detailData}
              setHeaderVisibility={setHeaderVisibility}
              headerVisibility={headerVisibility}
            />
          )}
        </SearchStack.Screen>
      </SearchStack.Navigator>
    </>
  );
};
