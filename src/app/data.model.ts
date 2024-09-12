// src/app/data.model.ts
export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Album {
    userId: number;
    id: number;
    title: string;
  }
  
  export interface UserWithAlbums extends User {
    albums: Album[];
  }

  export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  export interface Album {
    userId: number;
    id: number;
    title: string;
  }
  export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }
  