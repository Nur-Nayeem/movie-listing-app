import { account, AppwriteUser } from '@/services/appWrite';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const ProfileScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [profileDetails, setProfileDetails] = useState({
    country: 'United States',
    bio: 'Passionate movie enthusiast and a casual film critic. Always looking for the next great story to watch!',
    socialLinks: {
      twitter: 'https://twitter.com/yourhandle',
      linkedin: 'https://linkedin.com/in/yourprofile',
      github: 'https://github.com/yourusername',
    },
    profileImage: 'https://avatars.githubusercontent.com/u/109820227?v=4',
  });

  useEffect(() => {
    async function fetchUserAndProfile() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (e: any) {
        setUser(null);
        router.replace('/screens/auth');
      }
    }
    fetchUserAndProfile();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await account.deleteSession('current');
      setUser(null);
      Alert.alert('Success', 'Logged out successfully!');
      router.replace('/screens/auth');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to log out.');
    } finally {
      setLoading(false);
    }
  };

  const openSocialLink = (url: string) => {
    Linking.openURL(url).catch(err =>
      Alert.alert('Error', `Could not open link: ${err.message}`),
    );
  };

  if (!user) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Loading profile...</Text>
      </View>
    );
  }

  return (
    // <ScrollView className="flex-1">
      <LinearGradient
        colors={['#7e22ce', '#4f46e5']}
        className="flex-1 px-5 pt-10 pb-16"
      >
        <View className="items-center mt-10 mb-8">
          <Image
            source={{ uri: profileDetails.profileImage }}
            className="w-36 h-36 rounded-full border-4 border-purple-300 shadow-lg"
          />
          <Text className="text-4xl font-bold text-white mt-5">
            {user.name || 'Guest User'}
          </Text>
          <Text className="text-lg text-purple-200 mt-1">{user.email}</Text>
        </View>

        <View className="bg-white rounded-3xl p-6 mx-2 shadow-2xl mb-8">
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-3">📍</Text>
            <Text className="text-lg text-gray-700">
              Country:{' '}
              <Text className="font-bold">{profileDetails.country}</Text>
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-xl font-bold text-gray-800 mb-2">Bio</Text>
            <Text className="text-base text-gray-600">{profileDetails.bio}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-xl font-bold text-gray-800 mb-3">
              Social Links
            </Text>
            <View className="flex-row justify-around">
              {profileDetails.socialLinks.twitter && (
                <TouchableOpacity
                  className="bg-blue-400 p-3 rounded-full shadow-md"
                  onPress={() =>
                    openSocialLink(profileDetails.socialLinks.twitter)
                  }
                >
                  <Text className="text-white text-xl">🐦</Text>
                </TouchableOpacity>
              )}
              {profileDetails.socialLinks.linkedin && (
                <TouchableOpacity
                  className="bg-blue-700 p-3 rounded-full shadow-md"
                  onPress={() =>
                    openSocialLink(profileDetails.socialLinks.linkedin)
                  }
                >
                  <Text className="text-white text-xl">🔗</Text>
                </TouchableOpacity>
              )}
              {profileDetails.socialLinks.github && (
                <TouchableOpacity
                  className="bg-gray-800 p-3 rounded-full shadow-md"
                  onPress={() =>
                    openSocialLink(profileDetails.socialLinks.github)
                  }
                >
                  <Text className="text-white text-xl">💻</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="w-full h-14 bg-red-600 rounded-xl justify-center items-center mt-5 mb-10 shadow-lg"
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-xl font-bold">Logout</Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
    // </ScrollView>
  );
};

export default ProfileScreen;
