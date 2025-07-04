// app/RootLayout.tsx
import { account } from "@/services/appWrite";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null); // State to hold the initial route
  const [isLoading, setIsLoading] = useState<boolean>(true); // State to track if auth check is complete

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const currentUser = await account.get();
        console.log('Current user on app start:', currentUser);
        // If user is found, set initial route to tabs
        setInitialRoute('(tabs)');
      } catch (e: any) {
        console.warn('No user logged in on app start:', e.message);
        // If no user, set initial route to auth screen
        setInitialRoute('screens/auth');
      } finally {
        setIsLoading(false); // Auth check is complete
      }
    }

    checkAuthStatus();
  }, []);

  // Display a loading indicator until the initial route is determined
  if (isLoading || initialRoute === null) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  // Once initialRoute is determined and loading is false, render the Stack
  return (
    <View className="flex-1 bg-primary">
      <StatusBar hidden={true} />
      <Stack initialRouteName={initialRoute}> {/* Use initialRouteName here */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="screens/auth"
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="movies/[id]" // Example of another screen
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
          }}
        />
        {/* You can add a 404 or catch-all route if needed */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
}