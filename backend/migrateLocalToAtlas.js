import mongoose from "mongoose";
import dotenv from "dotenv";

import Course from "./models/Course.js";
import Section from "./models/Section.js";
import SubSection from "./models/SubSection.js";
import Category from "./models/Category.js";
import User from "./models/User.js";
import Profile from "./models/Profile.js";
import RatingAndReview from "./models/RatingAndReview.js";
import CourseProgress from "./models/CourseProgress.js";

dotenv.config();

// Edit LOCAl_URL if your local database is named differently (e.g., 'edvora' instead of 'Edvora')
const LOCAL_URL = "mongodb://127.0.0.1:27017/Edvora";
const REMOTE_URL = process.env.MONGODB_URL;

async function migrate() {
    console.log("🚀 Starting Database Migration from Localhost to Atlas...");

    try {
        console.log(`🔌 Connecting to Local DB: ${LOCAL_URL}`);
        const localDb = await mongoose.createConnection(LOCAL_URL).asPromise();
        console.log("✅ Connected to Local DB");

        console.log(`🔌 Connecting to Remote DB: Atlas`);
        const remoteDb = await mongoose.createConnection(REMOTE_URL).asPromise();
        console.log("✅ Connected to Remote DB");

        const models = [
            { name: "User", schema: User.schema },
            { name: "Profile", schema: Profile.schema },
            { name: "Category", schema: Category.schema },
            { name: "Course", schema: Course.schema },
            { name: "Section", schema: Section.schema },
            { name: "SubSection", schema: SubSection.schema },
            { name: "RatingAndReview", schema: RatingAndReview.schema },
            { name: "CourseProgress", schema: CourseProgress.schema }
        ];

        for (let { name, schema } of models) {
            console.log(`\n⏳ Migrating collection: ${name}...`);
            
            const LocalModel = localDb.model(name, schema);
            const RemoteModel = remoteDb.model(name, schema);
            
            // Fetch all documents from local
            const docs = await LocalModel.find({}).lean();
            console.log(`Found ${docs.length} documents in local DB.`);
            
            if (docs.length > 0) {
                // Clear the remote collection to avoid duplicates or conflicts
                await RemoteModel.deleteMany({});
                console.log(`Cleared remote ${name} collection.`);
                
                // Insert all documents into remote
                await RemoteModel.insertMany(docs);
                console.log(`✅ Migrated ${docs.length} ${name} documents to Atlas.`);
            } else {
                console.log(`⏩ Skipped ${name} (No data to migrate).`);
            }
        }

        console.log("\n🎉 Migration Complete! All data is now live on Atlas.");
        await localDb.close();
        await remoteDb.close();
        process.exit(0);

    } catch (error) {
        console.error("\n❌ Migration Failed:", error.message);
        process.exit(1);
    }
}

migrate();
