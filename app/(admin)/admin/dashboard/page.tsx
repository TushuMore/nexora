import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Projects";
import { Blog } from "@/models/Blogs";
import { Contact } from "@/models/Contact"; // ✅ Make sure this model exists

export default async function AdminDashboardPage() {
  await connectDB();

  const totalProjects = await Project.countDocuments();
  const totalBlogs = await Blog.countDocuments();
  const totalContacts = await Contact.countDocuments(); // ✅ Contact Count

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* 📁 Total Projects */}
        <DashboardCard
          title="Total Projects"
          value={totalProjects}
          gradient="from-primary to-primary/80"
        />

        {/* 📝 Total Blogs */}
        <DashboardCard
          title="Total Blogs"
          value={totalBlogs}
          gradient="from-pink-500 to-pink-400"
        />

        {/* 📬 Total Contacts */}
        <DashboardCard
          title="Total Contacts"
          value={totalContacts}
          gradient="from-green-500 to-emerald-400"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  gradient,
}: {
  title: string;
  value: number;
  gradient: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl shadow-xl`}
    >
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}
