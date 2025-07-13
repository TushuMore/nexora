"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle, // ✅ Import DialogTitle
} from "@/components/ui/dialog";

// ✅ Accept optional onSuccess prop
interface AddProjectModalProps {
  onSuccess?: () => void;
}

export function AddProjectModal({ onSuccess }: AddProjectModalProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    tech: "",
    github: "",
    live: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProject = async () => {
    try {
      await axios.post("/api/projects", {
        ...form,
        tech: form.tech.split(",").map((t) => t.trim()),
      });

      if (onSuccess) onSuccess(); // ✅ callback
      setForm({
        title: "",
        description: "",
        image: "",
        tech: "",
        github: "",
        live: "",
      }); // ✅ reset
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Project</DialogTitle> {/* ✅ required for accessibility */}
        <div className="space-y-4">
          <Input name="title" placeholder="Project Title" value={form.title} onChange={handleChange} />
          <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <Input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
          <Input name="tech" placeholder="Tech (comma-separated)" value={form.tech} onChange={handleChange} />
          <Input name="github" placeholder="GitHub URL" value={form.github} onChange={handleChange} />
          <Input name="live" placeholder="Live Site URL" value={form.live} onChange={handleChange} />
          <Button onClick={handleAddProject}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
