import { SafeAreaView } from "react-native";
import { DialogLoading } from "@rneui/base/dist/Dialog/Dialog.Loading";
const Loading = (props) => {
    let bg = props.bg==undefined?'bg-[#181920]':props.bg

  
     return (
       <>
         <SafeAreaView
           className={`flex-1 items-center justify-center ${bg} absolute top-0 bottom-0 left-0 right-0 w-full h-full`}
           style={{ opacity: props.loading ? 1 : 0 }}
           pointerEvents="none"
         >
           <DialogLoading loadingProps={{ size: 50, color: "#5468ff" }} />
         </SafeAreaView>
       </>
     );
};
   
export default Loading