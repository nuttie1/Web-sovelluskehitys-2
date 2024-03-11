import csPlayerModel from "../models/csPlayerModel"
import { csPlayer } from "../../types/DBTypes";

export default {
    Query: {
        allCsPlayers: async () => {
            return await csPlayerModel.find();
        },
        getCsPlayerById: async (_parent: undefined, args: {id: string}) => {
            return await csPlayerModel.findById(args.id);
        },
        getCsPlayerByName: async (_parent: undefined, args: {name: string}) => {
            return await csPlayerModel.findOne({name: args.name});
        },
        getRandomPlayer: async () => {
            const count = await csPlayerModel.countDocuments();
            const random = Math.floor(Math.random() * count);
            const randomPlayer = await csPlayerModel.findOne().skip(random);
            return randomPlayer;
        },
    },
    Mutation: {
        createCsPlayer: async (_parent: undefined, args: {input: Omit<csPlayer, 'id'>}) => {
            return await csPlayerModel.create(args.input);
        },
        deleteCsPlayer: async (_parent: undefined, args: {id: string}) => {
            return await csPlayerModel.findByIdAndDelete(args.id);
        },
    },
};