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

const ContactScreen = () => {
    const navigation = useNavigation();
    const users = useSelector(selectUsersWithLastMessage);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.userCard}
            onPress={() => navigation.navigate('ChatRoom', { user: item })}
        >
            <Image source={item.profilePic} style={styles.avatar} />
            <View style={styles.userInfo}>
                <View style={styles.userHeader}>
                    <Text style={styles.userName}>{item.fullName}</Text>
                </View>
                <Text style={styles.bio} numberOfLines={1}>
                    {item.bio}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Contacts</Text>
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
        backgroundColor: '#1E1E2E',
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
    bio: {
        fontSize: 14,
        color: '#AAA',
    },
});

export default ContactScreen;
