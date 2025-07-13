"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AddBlogModal from "./AddBlogModal";
import EditBlogModal from "./EditBlogModal";
import { Pencil, Trash, Loader } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  tags?: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get<Blog[]>("/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id: string) => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      await fetchBlogs();
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <AddBlogModal onAdd={fetchBlogs} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin w-6 h-6" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <Card key={blog._id} className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="line-clamp-3">{blog.content}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setEditBlog(blog)}
                  size="sm"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteBlog(blog._id)}
                  size="sm"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {editBlog && (
        <EditBlogModal
          blog={{ ...editBlog, image: editBlog.image ?? "", tags: editBlog.tags ?? [] }}
          onClose={() => setEditBlog(null)}
          onUpdate={fetchBlogs}
        />
      )}
    </div>
  );
}