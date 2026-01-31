import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const TypingIndicator = () => {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = (dot, delay) => {
            Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(dot, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.delay(600), // Wait for other dots
                ])
            ).start();
        };

        animate(dot1, 0);
        animate(dot2, 150);
        animate(dot3, 300);
    }, []);

    const getStyle = (dot) => ({
        opacity: dot.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        }),
        transform: [{
            translateY: dot.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -5],
            }),
        }],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.dot, getStyle(dot1)]} />
            <Animated.View style={[styles.dot, getStyle(dot2)]} />
            <Animated.View style={[styles.dot, getStyle(dot3)]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        marginLeft: 10,
        marginBottom: 5,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#888',
        marginHorizontal: 2,
    },
});

export default TypingIndicator;
