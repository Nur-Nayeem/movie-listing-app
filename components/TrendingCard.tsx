import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const TrendingCard = ({movie : { movie_id,title, poster_url},index}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
        <Pressable className='w-32 relative pl-3'>
            <Image 
            source={{uri: poster_url}}
            className='w-30 h-48 rounded-lg'
            resizeMode='cover'
            />
            <View className='absolute bottom-9 left-3 px-2 py-1 rounded-full'>
               <MaskedView maskElement={
                <Text className='font-bold text-white text-6xl'>{index + 1}</Text>
               }>
                <Image 
                source={images.rankingGradient}
                className='size-16'
                resizeMode='cover'
                />

               </MaskedView>
            </View>
            <Text 
            className='text-sm text-light-200 font-bold mt-2'
            numberOfLines={2}
            >{title}</Text>

        </Pressable>
    </Link>
  )
}

export default TrendingCard