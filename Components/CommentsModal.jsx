import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
const CommentsModal = (props) => {
  //   const modalVisible = props.modalVisible;
  //   const setModalVisible = props.setModalVisible;

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
        className="w-full h-full"
      >
        <View className="w-full h-[60%] bg-[#252733] absolute bottom-0 flex flex-col px-2">
          <View className="w-full h-[15%] px-5 py-2 bg-transparent">
            <TextInput
              className=" bg-gray-200 h-full rounded-xl"
              placeholder="CHEESE!"
              style={{ paddingLeft: 10 }}
            />
          </View>
          <ScrollView>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
            <Text>HELLO</Text>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommentsModal;
