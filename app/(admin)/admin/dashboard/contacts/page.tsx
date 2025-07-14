import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { ContactType } from "@/types/contact";

export default async function AdminContactsPage() {
  await connectDB();

  // Explicitly fetch all contact messages sorted by newest
  const rawContacts = await Contact.find({}).sort({ createdAt: -1 }).lean();

  // Transform MongoDB documents to ContactType format
  const contacts: ContactType[] = rawContacts.map((raw) => ({
    _id: raw._id?.toString() || "",
    name: raw.name,
    email: raw.email,
    message: raw.message,
    createdAt: raw.createdAt?.toString() || "",
  }));

  // Debug log to see how many contacts were fetched
  console.log("Total contacts fetched:", contacts.length);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">📨 Contact Messages</h1>

      {contacts.length === 0 ? (
        <p className="text-muted-foreground text-center text-sm italic">
          No contact messages found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white/5 border border-border rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-md"
            >
              {/* Name & Email */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground">{contact.name}</h3>
                <span className="inline-block mt-1 text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {contact.email}
                </span>
              </div>

              {/* Message */}
              <div className="text-sm text-foreground leading-relaxed whitespace-pre-line line-clamp-6">
                {contact.message}
              </div>

              {/* Timestamp */}
              <div className="text-[11px] text-muted-foreground mt-4 text-right italic">
                Received: {new Date(contact.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
