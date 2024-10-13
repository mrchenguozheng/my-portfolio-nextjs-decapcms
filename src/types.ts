// src/types.ts
// example if using typescript: this is based on the post schema we created in the config.yml

export interface PostData {
    slug: string;
    title: string;
    description: string;
    date: Date | string; // Use Date type if you want to work with Date objects
    thumbnail?: string; // Optional
    author: string;
    body: string; // The actual content of the post
}
