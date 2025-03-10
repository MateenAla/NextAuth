import mongoose from "mongoose";

export async function connectDB() {

    try {
        mongoose.connect(process.env.MONGODB_URL!);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });

        connection.on("error", (err) => {
            console.log("Error connecting to MongoDB");
            console.log(err);
        });



    } catch (error) {
        console.log("Error connecting to database");
        console.log(error);
    }

}






