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

export async function connectDB() {
    try {
        if (!process.env.MONGODB_URL) {
            console.log("MongoDB URL is missing in the .env file");
            return;
        }

        // Use await to ensure the connection is established before proceeding
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("✅ Connected to MongoDB");
        });

        connection.on("error", (err) => {
            console.log("❌ Error connecting to MongoDB:", err);
        });
    } catch (error) {
        console.log("❌ Error connecting to database:", error);
    }
}


