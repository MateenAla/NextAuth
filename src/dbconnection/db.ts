// import mongoose from "mongoose";

// export async function connectDB() {

//     try {
//         mongoose.connect(process.env.MONGODB_URL!);

//         const connection = mongoose.connection;

//         connection.on("connected", () => {
//             console.log("Connected to MongoDB");
//         });

//         connection.on("error", (err) => {
//             console.log("Error connecting to MongoDB");
//             console.log(err);
//         });



//     } catch (error) {
//         console.log("Error connecting to database");
//         console.log(error);
//     }

// }


import mongoose from "mongoose";

// const MONGODB_URL = process.env.MONGODB_URL!;
// const MONGODB_URL = "mongodb://new_mateen:Db12345@cluster0.cj64t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const MONGODB_URL = "mongodb://new_mateen:Db12345@cluster0.cj64t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const MONGODB_URL = "mongodb+srv://new_mateen:Db12345@cluster0.cj64t.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URL) {
    throw new Error("❌ MongoDB URL is missing in the .env file");
}

export async function connectDB() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("✅ Already connected to MongoDB");
            return;
        }

        console.log("🔄 Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URL, {
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout
            socketTimeoutMS: 60000, // 60 seconds socket timeout
        });

        console.log("✅ Successfully connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // Exit if connection fails
    }
}



// import mongoose from "mongoose";

// export async function connectDB() {
//     try {
//         if (!process.env.MONGODB_URL) {
//             console.log("MongoDB URL is missing in the .env file");
//             return;
//         }

//         // Use await to ensure the connection is established before proceeding
//         await mongoose.connect(process.env.MONGODB_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         } as mongoose.ConnectOptions);

//         const connection = mongoose.connection;

//         connection.on("connected", () => {
//             console.log("✅ Connected to MongoDB");
//         });

//         connection.on("error", (err) => {
//             console.log("❌ Error connecting to MongoDB:", err);
//         });
//     } catch (error) {
//         console.log("❌ Error connecting to database:", error);
//     }
// }


