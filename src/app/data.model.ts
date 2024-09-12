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
  