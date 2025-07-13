"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import axios from "axios";

interface EditProjectModalProps {
  project: {
    _id: string;
    title: string;
    description: string;
    image: string;
    tech: string[];
    github?: string;
    live?: string;
  };
  onSuccess: () => void;
}

export function EditProjectModal({ project, onSuccess }: EditProjectModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: project.title,
    description: project.description,
    image: project.image,
    tech: project.tech.join(", "),
    github: project.github || "",
    live: project.live || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/projects/${project._id}`, {
        ...form,
        tech: form.tech.split(",").map((t) => t.trim()),
      });
      setOpen(false);
      onSuccess();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4 max-w-md">
        <DialogTitle>Edit Project</DialogTitle> {/* ✅ Required for accessibility */}
        <Input name="title" value={form.title} onChange={handleChange} />
        <Input name="description" value={form.description} onChange={handleChange} />
        <Input name="image" value={form.image} onChange={handleChange} />
        <Input name="tech" value={form.tech} onChange={handleChange} />
        <Input name="github" value={form.github} onChange={handleChange} />
        <Input name="live" value={form.live} onChange={handleChange} />
        <Button onClick={handleUpdate} disabled={loading} className="w-full">
          {loading ? "Saving..." : "Update Project"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
