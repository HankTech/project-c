import React, { useEffect } from 'react'
import { StyleSheet, FlatList, SafeAreaView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

//  components
import Message from '../components/ChatRoom/Message'
import MessageInput from '../components/ChatRoom/MessageInput'

import chatRoomData from '../../assets/dummy-data/Chats'

const ChatRoomScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: `Nombre de id: ${route.params?.id}` })
  }, [])

  console.log('displaying chat room: ', route.params?.id)

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
      />
      <MessageInput />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})

export default ChatRoomScreen
