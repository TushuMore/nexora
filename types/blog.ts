// types/blog.ts
export interface BlogType {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
