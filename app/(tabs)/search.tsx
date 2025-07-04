import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { fetchMovie } from '@/services/api'
import { updateSearchCount } from '@/services/appWrite'
import useFetch from '@/services/useFetch'
import { LinearGradient } from 'expo-linear-gradient'

import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() =>
    fetchMovie({
      query: searchQuery,
    }),false
  );

  React.useEffect(() => {
    const timeOutId = setTimeout(async ()=>{
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset(); // Reset data when search query is empty
      }
    },500)
    return () => clearTimeout(timeOutId); // Cleanup timeout on unmount or when searchQuery changes
  }, [searchQuery]);

  React.useEffect(()=>{
    if( movies?.length > 0 && movies?.[0]) {
          // Optionally, you can update search count in your database here
          updateSearchCount(searchQuery, movies[0]);
        }
  },[movies])

  return (
    <LinearGradient
          colors={["#7e22ce", "#4f46e5"]}
          className="flex-1"
        >
      <FlatList 
      data={movies}
      renderItem={({item}) => <MovieCard {...item} />}
      keyExtractor={(item) => item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle={{
        justifyContent : 'center',
        gap: 16,
        marginVertical: 16
      }}
      contentContainerStyle={{paddingBottom: 100}}
      ListHeaderComponent={
        <>
        <View className='flex-row w-full mt-20 justify-center'>
          <Image source={icons.logo} className='w-12 h-10' />
        </View>
        <View className='my-5'>
          <SearchBar placeholder='Search movies...' 
          value={searchQuery} 
          onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        {loading && (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            className='my-3'/>
        )}
        {error && (
          <Text className='text-red-500 px-5 my-3'>Error: {error?.message}</Text>
        )} 
        {
        !loading && !error && searchQuery.trim() && movies?.length > 0 &&(
        <Text className='text-xl text-white font-bold'>
          Search Results for{' '}
          <Text className='text-accent'>{searchQuery}</Text>
        </Text>
      )}   
        </>
      }

      ListEmptyComponent={
        !loading && !error ? (
          <View className='mt-10 px-5'>
            <Text className='text-gray-500 text-center'>{searchQuery.trim() ? 'No Movie Found' : 'Search for a movie'}</Text>
          </View>
        ): null
      }
      
      />
      <Text>search</Text>
    </LinearGradient>
  )
}

export default search