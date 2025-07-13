"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function AddBlogModal({ onAdd }: { onAdd: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = async () => {
    await axios.post("/api/blogs", { title, content, image });
    onAdd();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Blog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-bold">New Blog</DialogTitle>

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

        <Button onClick={handleAdd} className="mt-4 w-full">
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}
