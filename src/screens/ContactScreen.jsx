import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const ContactScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Contacts</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>Contact List Coming Soon...</Text>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#aaa',
        fontSize: 18,
    },
});

export default ContactScreen;
