import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { firebaseAuth } from '../firebaseconfig';
import { db } from '../firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const Sidebar = ({ onClose }) => {
    const auth = firebaseAuth;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await auth.signOut();
            navigation.reset({
                index: 0,
                routes: [{ 
                    name: 'Signinsignup',
                    params: { 
                        showLogoutMessage: true 
                    }
                }],
            });
        } catch (error) {
            console.error('Error signing out: ', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to logout. Please try again.',
                visibilityTime: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image
                    style={styles.userAvatar}
                    source={{ uri: 'https://avatar.iran.liara.run/public/boy' }}
                />
                <Text style={styles.userName}>{userData?.fullname || 'Loading...'}</Text>
                <Text style={styles.userEmail}>{userData?.email || ''}</Text>
                {userData?.country && (
                    <Text style={styles.userLocation}>{userData.country}</Text>
                )}
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="person-outline" size={24} color="#fff" />
                    <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="settings-outline" size={24} color="#fff" />
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="help-circle-outline" size={24} color="#fff" />
                    <Text style={styles.menuText}>Help</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.logoutButton, loading && styles.logoutButtonDisabled]}
                onPress={handleLogout}
                disabled={loading}
            >
                <Ionicons name="log-out-outline" size={24} color="white" />
                <Text style={styles.logoutText}>
                    {loading ? 'Logging out...' : 'Logout'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: '#060c24',
        paddingTop: 50,
    },
    userInfo: {
        marginTop: 30,
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(241, 241, 241, 0.2)',
    },
    userAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    userEmail: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 4,
    },
    menuContainer: {
        paddingTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(241, 241, 241, 0.1)',
    },
    menuText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 15,
    },
    logoutButton: {
        margin: 16,
        marginTop: 'auto',
        backgroundColor: '#ef4444',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    userLocation: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 2,
    },
    logoutButtonDisabled: {
        opacity: 0.7,
    },
});

export default Sidebar;