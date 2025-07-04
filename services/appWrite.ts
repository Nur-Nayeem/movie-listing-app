import { Account, Client, Databases, ID, Query, Models } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
.setEndpoint('https://fra.cloud.appwrite.io/v1')
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);




export const updateSearchCount = async (query : string , movie:Movie) => {

    try{
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ])
    if(result.documents.length > 0) {
        const existingMovie = result.documents[0];
    
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
            count : existingMovie.count + 1,
        });
    }
    else{
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            count: 1,
            movie_id: movie.id,
            title: movie.title,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            
        });
    }
    } catch (error) {
        console.error('Error updating search count:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }

}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc('count'),
            Query.limit(5)
        ]);
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}



// Define a type for the Appwrite user object for better type safety
export type AppwriteUser = Models.User<Models.Preferences>;

export const account = new Account(client);


// export const registerUser = async (
//   email: string,
//   password: string,
//   name: string
// ) => {
//   try {
//     return await account.create('unique()', email, password, name);
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// export const loginUser = async (email: string, password: string) => {
//   try {

//     const existingUser = await account.get();
//     if( existingUser) {
//         console.log('User already logged in:', existingUser);
//         await account.deleteSession('current');
//     }
//     await account.createEmailPasswordSession(email, password);

//       // 2. Get user data from Appwrite backend
//     const user = await account.get();
//     return user;

//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// export const getCurrentUser = async () => {
//   try {
//     return await account.get();
//   } catch {
//     return null;
//   }
// };

// export const logoutUser = async () => {
//   try {
//     return await account.deleteSession('current');
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };