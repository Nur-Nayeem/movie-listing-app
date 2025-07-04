import { icons } from '@/constants/icons'
import { fetchMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
interface MovieProps {
  label: string;
  value?: string | number | null ;
}

const MovieInfo = ({label, value}: MovieProps) =>(
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>{label}:</Text>
    <Text className='text-light-100 text-sm font-bold'>{value || "N/A"}</Text>
  </View>
)


const MovieDetails = () => {
  
  const {id} = useLocalSearchParams()

  const {data: movie , loading} = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom:80}}>
        <View>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
          className='w-full h-[500px] ' resizeMode='stretch' 
          />
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <View className='flex-row items-center justify-between w-full'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
          <TouchableOpacity>
            <Image source={icons.save} className='size-6'/>
          </TouchableOpacity>
          </View>
          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0] }</Text>
            <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
          </View>
          <View className='flex-row items-center bg-dark-100 px-1 py-2 rounded-md gap-x-1 mt-2'>
            <Image source={icons.star} className='size-4'/>
            {/* // Displaying the average rating */}
            <Text className='text-light-200 text-sm font-bold pt-1'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
            <Text className='text-light-200 text-sm font-bold pt-1'> ({movie?.vote_count} votes)</Text>
          </View>
          <MovieInfo label='Overview' value={movie?.overview}/>
          <MovieInfo label='Genres' value={movie?.genres.map((g)=>g.name).join(' - ') || "N/A"}/>
            <View className='flex flex-row justify-between w-1/2'>
                <MovieInfo label='Budget' value={movie?.budget != null ? `$${movie.budget / 1_000_000} million ` : "N/A"}/>
                <MovieInfo label='Revenue' value={movie?.revenue != null ? `$${Math.round(movie.revenue / 1_000_000)} million ` : "N/A"}/>
            </View>

          <MovieInfo label='Production Companies' value={movie?.production_companies.map((c) => c.name).join(' - ') || "N/A"}/>
          
        </View>

      </ScrollView>

    <TouchableOpacity className='absolute bottom-5 right-0 left-0 bg-accent py-3.5 rounded-lg flex-row items-center justify-center z-50'
    onPress={router.back}
    >
        <Image 
        source={icons.arrow}
        className='size-5 mr-1 mt-0.5 rotate-180' 
        tintColor='#fff'
        />
        <Text className='text-white font-semibold text-base'>Go back</Text>
    </TouchableOpacity>

    </View>
  )
}

export default MovieDetails