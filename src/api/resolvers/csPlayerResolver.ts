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