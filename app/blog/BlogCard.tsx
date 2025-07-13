import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  image?: string;
}

interface BlogCardProps {
  post: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 mt-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm bg-gray-200 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      {post.image && (
        <Image width={1000} height={1000} priority src={post.image} alt={post.title} className="mt-2 w-full h-40 object-cover" />
      )}
      <Link href={`/blog/${post.slug}`} className="text-blue-500 mt-2 inline-block">
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;