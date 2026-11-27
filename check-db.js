const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const mongoose = require("mongoose");
const Call = require("./callSchema");
const Extension = require("./extensionSchema");

async function checkDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected successfully to:", mongoose.connection.name);

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("\n--- Collections in Database ---");
    console.log(collections.map((c) => c.name));

    // Fetch extensions
    const extensions = await Extension.find({}).lean();
    console.log(`\n--- Extensions Collection (${extensions.length} records) ---`);
    console.dir(extensions, { depth: null });

    // Fetch calls
    const calls = await Call.find({}).lean();
    console.log(`\n--- Calls Collection (${calls.length} records) ---`);
    console.dir(calls, { depth: null });

    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB.");
  } catch (error) {
    console.error("Database check failed:", error);
    process.exit(1);
  }
}

checkDatabase();
