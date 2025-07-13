"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AddProjectModal } from "./AddProjectModal";
import { EditProjectModal } from "./EditProjectModal";
import { Loader, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  live?: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

const fetchProjects = async () => {
  setLoading(true);
  try {
    const res = await axios.get<{ projects: Project[] }>("/api/projects");
    setProjects(res.data.projects || []);
  } catch (err) {
    console.error("Error fetching projects:", err);
  } finally {
    setLoading(false);
  }
};
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <AddProjectModal onSuccess={fetchProjects} />
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="text-center text-muted-foreground">
          <Loader className="animate-spin mx-auto mb-2" />
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center text-muted-foreground">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="border p-4 rounded-xl shadow bg-muted/30 relative"
            >
              {/* Edit + Delete Buttons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <EditProjectModal project={proj} onSuccess={fetchProjects} />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(proj._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Project Info */}
              <h3 className="text-lg font-semibold">{proj.title}</h3>
              <p className="text-sm text-muted-foreground">{proj.description}</p>

              <div className="mt-2 flex gap-2 flex-wrap">
                {proj.tech?.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
