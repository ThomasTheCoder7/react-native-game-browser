import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView } from 'react-native';
import NavBar from './Components/NavBar';

import { useEffect, useMemo, useState } from 'react';

import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';
import { styled } from 'nativewind';
import Loading from './Components/Loading';



const StyledLoading = styled(DialogLoading)


export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchLoading, setFetchLoading] = useState(true)
  const fetchData = async (url) => {
    setFetchLoading(true)
    
      let Data = []
      
      try{
        let response = await fetch('https://game-browser-api.vegetaxxsan.repl.co/games/trending')
        let myData = await response.json()
        Data = myData.results
      }catch(e){
        console.log(e)
      }
      
      setData(Data)

      setFetchLoading(false)
      return Data
    
  }





  useEffect(() => {
    // getUser()
    fetchData()

  }, [])

  if(fetchLoading)return <Loading loading={loading}/>
  else
  return (
    <>
      <StatusBar />
      <SafeAreaView className='flex-1 items-center justify-center dark:bg-[#181920] pt-[22%]'>
        <NavBar Data={data} setLoading={setLoading} />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
}

