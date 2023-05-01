import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView } from 'react-native';
import NavBar from './Components/NavBar';

import { useEffect, useMemo, useState } from 'react';

import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';
import { styled } from 'nativewind';



const StyledLoading = styled(DialogLoading)


export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchData = useMemo((url) => {
    return function fetch() {
      let Data = [
        { url: 'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg', title: 'Minecraft' },
        { url: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg', title: 'Grand theft auto V' },
        { url: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg', title: 'The Witcher' },
        { url: 'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg', title: 'Minecraft' },
        { url: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg', title: 'Grand theft auto V' },
        { url: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg', title: 'The Witcher' },
        { url: 'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg', title: 'Minecraft' },
        { url: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg', title: 'Grand theft auto V' },
        { url: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1680&q=80', title: 'Grand theft auto V' },
        { url: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg', title: 'The Witcher' },
        { url: 'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg', title: 'Minecraft' },
      ]
      setData(Data)
      return Data
    }

  }, [])
  const getUser = async () => {
    const response = await fetch('localhost:3000/')
    const data = await response.json()

  }
  const getCSRFToken = async () => {
    const response = await axios.get('/getCSRFToken');
    axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
  };




  useEffect(() => {
    // getUser()
    fetchData()
  }, [])

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


