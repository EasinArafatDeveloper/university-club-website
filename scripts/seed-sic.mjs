import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in .env.local");
  process.exit(1);
}

const ApplicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  studentId: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  preferredWing: { type: String, required: true },
  whyJoin: { type: String, required: true },
  experience: { type: String },
  portfolio: { type: String },
  status: { type: String, enum: ["Pending", "Reviewed", "Accepted", "Rejected"], default: "Pending" }
}, { timestamps: true });

const Application = mongoose.models.Application || mongoose.model("Application", ApplicationSchema);

const mockApplications = [
  {
    firstName: "Farhan",
    lastName: "Ahmed",
    email: "farhan.cse@scholars.edu",
    phone: "01712345678",
    studentId: "2023-1102-01",
    department: "CSE",
    semester: "Sophomore",
    preferredWing: "Marketing & Branding Wing (MBW), Partnership & Collaboration Wing (PCW)",
    whyJoin: "I want to leverage my graphic design and tech skills to increase the brand presence of Scholars Influencers Club at the university level.",
    experience: "Managed social media pages for a student club previously.",
    portfolio: "https://behance.net/farhan-designs",
    status: "Pending"
  },
  {
    firstName: "Anika",
    lastName: "Kabir",
    email: "anika.tx@scholars.edu",
    phone: "01812345679",
    studentId: "2022-2204-12",
    department: "Textile Engineering",
    semester: "Junior",
    preferredWing: "Human Resource Wing (HRW), Event & Program Management Wing (EPMW)",
    whyJoin: "As a textile student, I want to learn HR strategies, conflict resolution, and organize major fashion and technology expos inside the campus.",
    experience: "Volunteered in University of Scholars annual orientation program.",
    portfolio: "",
    status: "Pending"
  },
  {
    firstName: "Samiul",
    lastName: "Islam",
    email: "samiul.bba@scholars.edu",
    phone: "01912345680",
    studentId: "2023-3108-04",
    department: "BBA",
    semester: "Freshman",
    preferredWing: "Finance Wing (FW)",
    whyJoin: "To apply standard corporate accounting principles in real-world environments, managing budgets and invoice reconciliations for SIC events.",
    experience: "Proficient in MS Excel and basic auditing.",
    portfolio: "",
    status: "Pending"
  },
  {
    firstName: "Nusrat",
    lastName: "Jahan",
    email: "nusrat.eng@scholars.edu",
    phone: "01512345681",
    studentId: "2024-1101-09",
    department: "English",
    semester: "Freshman",
    preferredWing: "Marketing & Branding Wing (MBW), Human Resource Wing (HRW)",
    whyJoin: "I am passionate about copywriting, drafting press releases, and assisting in managing public relations and new member recruitment.",
    experience: "Content writer for local school magazine.",
    portfolio: "https://medium.com/@nusrat-writes",
    status: "Pending"
  },
  {
    firstName: "Taskeen",
    lastName: "Reza",
    email: "taskeen.eee@scholars.edu",
    phone: "01612345682",
    studentId: "2023-2209-18",
    department: "EEE",
    semester: "Sophomore",
    preferredWing: "Career & Placement Wing (CPW)",
    whyJoin: "To connect other engineering peers with tech-industry employers and organize mock engineering panel interviews.",
    experience: "Basic project coordinator skills.",
    portfolio: "",
    status: "Pending"
  }
];

async function seedSIC() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for SIC Seeding.");

    // Delete existing pending mock applications to clean up
    await Application.deleteMany({ status: "Pending" });
    console.log("Cleaned up old pending applications.");

    // Seed mock candidates
    await Application.insertMany(mockApplications);
    console.log("Successfully seeded 5 realistic SIC pending member applications!");
    console.log("Farhan Ahmed (CSE) - MBW, PCW");
    console.log("Anika Kabir (Textile) - HRW, EPMW");
    console.log("Samiul Islam (BBA) - FW");
    console.log("Nusrat Jahan (English) - MBW, HRW");
    console.log("Taskeen Reza (EEE) - CPW");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seedSIC();
