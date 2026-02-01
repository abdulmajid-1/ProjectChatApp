import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUsersWithLastMessage } from '../store/slices/chatSlice';

const ChatListScreen = () => {
  const navigation = useNavigation();

  const users = useSelector(selectUsersWithLastMessage);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => navigation.navigate('ChatRoom', { user: item })}
    >
      <Image source={item.profilePic} style={styles.avatar} />
      <View style={styles.userInfo}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>{item.fullName}</Text>
          <Text style={styles.time}>
            {item.lastMessageTime
              ? new Date(item.lastMessageTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
              : ''}
          </Text>
        </View>
        <View style={styles.lastMessageContainer}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {index < 3 && <View style={styles.onlineDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E', // Dark theme background
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D3F',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  listContent: {
    paddingBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D3F',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  lastMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#AAA',
    flex: 1,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ADE80', // Green for online
    marginLeft: 6,
  },
});

export default ChatListScreen;
