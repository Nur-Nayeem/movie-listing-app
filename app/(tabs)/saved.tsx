import { icons } from '@/constants/icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, ScrollView, Text } from 'react-native'

const saved = () => {
  return (
    <LinearGradient
            colors={['#7e22ce', '#4f46e5']}
            className="flex-1"
          >
      <ScrollView
              className="flex-1 px-5"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >

          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

          <Text className='text-lg text-white font-bold'>My Saved Movies</Text>
          
            
      </ScrollView>
    </LinearGradient>
  )
}

export default saved