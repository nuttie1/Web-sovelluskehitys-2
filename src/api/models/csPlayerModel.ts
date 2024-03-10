import mongoose from "mongoose";
import { csPlayer } from "../../types/DBTypes";
import exp from "constants";

const csPlayerModel = new mongoose.Schema<csPlayer>({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    total_winnings: {
        type: Number,
        required: true
    }
});

export default mongoose.model<csPlayer>("csPlayer", csPlayerModel);