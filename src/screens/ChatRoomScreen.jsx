import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  messagesDummyData,
  formatMessageTime,
} from '../data/dummyData'; // Using dummy messages
import {
  ArrowLeft,
  Image as ImageIcon,
  Smile,
  Send,
  Mic,
  X,
  FileText,
} from 'lucide-react-native';
import TypingIndicator from '../components/TypingIndicator';
import { launchImageLibrary } from 'react-native-image-picker';

const CURRENT_USER_ID = '680f50e4f10f3cd28382ecf9'; // Simulating logged-in user

const ChatRoomScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params || {};
  const [messages, setMessages] = useState(messagesDummyData);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const flatListRef = useRef(null);

  // Custom Header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Simulate typing indicator when user types
  useEffect(() => {
    if (inputText.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [inputText]);

  const handlePickImage = async () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 5,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage);
        return;
      }

      if (result.assets) {
        // Map to the format we need (just uri for now, or object)
        const newImages = result.assets.map(asset => ({ uri: asset.uri }));
        setSelectedImages([...selectedImages, ...newImages]);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };



  const removeImage = index => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handleSend = () => {
    if (inputText.trim().length === 0 && selectedImages.length === 0) return;

    const newMessages = [];

    // Send images first
    selectedImages.forEach(img => {
      newMessages.push({
        _id: Math.random().toString(),
        senderId: CURRENT_USER_ID,
        receiverId: user?._id,
        image: img.uri ? { uri: img.uri } : img, // Handle both object with uri and direct require (if dummy)
        seen: false,
        createdAt: new Date().toISOString(),
      });
    });

    // Send text
    if (inputText.trim().length > 0) {
      newMessages.push({
        _id: Math.random().toString(),
        senderId: CURRENT_USER_ID,
        receiverId: user?._id,
        text: inputText,
        seen: false,
        createdAt: new Date().toISOString(),
      });
    }

    setMessages(prev => [...prev, ...newMessages]);
    setInputText('');
    setSelectedImages([]);
  };

  const renderMessage = ({ item }) => {
    const isMyMessage = item.senderId === CURRENT_USER_ID;
    return (
      <View
        style={[
          styles.messageBubbleContainer,
          isMyMessage
            ? styles.myMessageContainer
            : styles.theirMessageContainer,
        ]}
      >
        {!isMyMessage && item.senderId !== CURRENT_USER_ID && (
          <Image source={user?.profilePic} style={styles.messageAvatar} />
        )}

        <View
          style={[
            styles.messageBubble,
            isMyMessage ? styles.myMessageBubble : styles.theirMessageBubble,
          ]}
        >
          {item.image && (
            <Image
              source={item.image}
              style={styles.messageImage}
              resizeMode="cover"
            />
          )}

          {item.document && (
            <View style={styles.documentContainer}>
              <FileText size={24} color={isMyMessage ? "#FFF" : "#DDD"} />
              <Text style={[styles.documentName, { color: isMyMessage ? "#FFF" : "#DDD" }]} numberOfLines={1}>
                {item.document.name}
              </Text>
              {/* You might want to add a download icon or functionality here */}
            </View>
          )}

          {item.text && <Text style={styles.messageText}>{item.text}</Text>}
          <Text style={styles.messageTime}>
            {formatMessageTime(item.createdAt)}
            {isMyMessage && <Text style={styles.readReceipt}> ✓✓</Text>}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <Image source={user?.profilePic} style={styles.headerAvatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{user?.fullName || 'User'}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={[...messages].reverse()} // Reverse for inverted list
        renderItem={renderMessage}
        keyExtractor={item => item._id}
        inverted
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
        }
      />

      {/* Keyboard & Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        {/* Typing Indicator */}
        {isTyping && (
          <View style={styles.typingContainer}>
            <Text style={styles.typingText}>Typing</Text>
            <TypingIndicator />
          </View>
        )}

        {/* Media Preview */}
        {selectedImages.length > 0 && (
          <View style={styles.mediaPreviewContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Images Preview */}
              {selectedImages.map((img, index) => (
                <View key={`img-${index}`} style={styles.previewImageWrapper}>
                  <Image source={img.uri ? { uri: img.uri } : img} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <X color="#FFF" size={12} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.inputContainer}>

          <TouchableOpacity style={styles.iconButton} onPress={handlePickImage}>
            <ImageIcon color="#BBB" size={24} />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Message..."
            placeholderTextColor="#888"
            multiline
            value={inputText}
            onChangeText={setInputText}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            {inputText.length > 0 || selectedImages.length > 0 ? (
              <Send color="#FFF" size={20} />
            ) : (
              <Mic color="#FFF" size={20} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#27273A',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  headerInfo: {
    marginLeft: 12,
  },
  headerName: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerStatus: {
    color: '#4ADE80',
    fontSize: 12,
  },
  listContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  theirMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  myMessageBubble: {
    backgroundColor: '#6D28D9', // Primary color
    borderBottomRightRadius: 2,
  },
  theirMessageBubble: {
    backgroundColor: '#374151', // Secondary color
    borderBottomLeftRadius: 2,
  },
  messageText: {
    color: '#FFF',
    fontSize: 15,
  },
  messageTime: {
    fontSize: 10,
    color: '#DDD',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  readReceipt: {
    fontSize: 10,
    color: '#4ADE80',
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  documentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 8,
    borderRadius: 8,
  },
  documentName: {
    marginLeft: 8,
    fontSize: 14,
    maxWidth: 150,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#27273A',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  iconButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1E1E2E',
    color: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#6D28D9',
    padding: 10,
    borderRadius: 20,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#1E1E2E',
  },
  typingText: {
    color: '#888',
    fontSize: 12,
    marginRight: 4,
  },
  mediaPreviewContainer: {
    height: 100,
    padding: 10,
    backgroundColor: '#27273A',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  previewImageWrapper: {
    marginRight: 10,
    position: 'relative',
    width: 60,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  removeImageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
});

export default ChatRoomScreen;
