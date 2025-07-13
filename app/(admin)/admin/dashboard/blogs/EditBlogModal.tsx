"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BlogType } from "@/types/blog";


export default function EditBlogModal({
  blog,
  onClose,
  onUpdate,
}: {
  blog: BlogType;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [image, setImage] = useState(blog.image || "");

  const handleUpdate = async () => {
    await axios.put(`/api/blogs/${blog._id}`, { title, content, image });
    onUpdate();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-xl font-bold">Edit Blog</DialogTitle>

        <input
          className="w-full p-2 border rounded mt-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded mt-2"
          placeholder="Content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mt-2"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <Button onClick={handleUpdate} className="mt-4 w-full">
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}
