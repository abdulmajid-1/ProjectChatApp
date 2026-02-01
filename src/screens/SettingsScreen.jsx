import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const SettingsScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <View style={styles.profileSection}>
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{user?.fullName?.charAt(0) || 'U'}</Text>
                </View>
                <Text style={styles.name}>{user?.fullName || 'User Name'}</Text>
                <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
            </View>

            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Account Privacy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
                </TouchableOpacity>
            </View>
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
    profileSection: {
        alignItems: 'center',
        paddingVertical: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#2D2D3F',
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#6D28D9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#aaa',
    },
    menu: {
        marginTop: 20,
    },
    menuItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2D2D3F',
    },
    menuText: {
        fontSize: 16,
        color: '#FFF',
    },
    logoutText: {
        color: '#EF4444', // Red color
        fontWeight: 'bold',
    },
});

export default SettingsScreen;
