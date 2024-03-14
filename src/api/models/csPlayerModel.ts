import mongoose from "mongoose";
import { csPlayer } from "../../types/DBTypes";
import exp from "constants";

/**
 * This is the model for the CS2 player
 * @param name: The name of the player
 * @param team: The team the player is on
 * @param country: The country the player is from
 * @param age: The age of the player
 * @param role: The role of the player
 * @param total_winnings: The total winnings of the player
 * @returns The model for the CS2 player
 */

const csPlayerModel = new mongoose.Schema<csPlayer>({
    name: {
        type: String,
        required: true,
        unique: true
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