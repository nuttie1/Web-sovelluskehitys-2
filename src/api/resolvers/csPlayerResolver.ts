import csPlayerModel from "../models/csPlayerModel"
import { csPlayer } from "../../types/DBTypes";

/**
 * This is the resolver for the CS2 player
 * @param allCsPlayers: Get all the CS2 players
 * @param getCsPlayerById: Get a CS2 player by their ID
 * @param getCsPlayerByName: Get a CS2 player by their name
 * @param getRandomPlayer: Get a random CS2 player
 * @param getAllPlayerNames: Get all the names of the CS2 players
 * @param createCsPlayer: Create a CS2 player
 * @param deleteCsPlayer: Delete a CS2 player
 * @returns The resolver for the CS2 player
 */

const csPlayerResolver = {
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
        getAllPlayerNames: async () => {
            const players = await csPlayerModel.find({}, 'name');
            return players.map(player => player.name).sort(function(a, b) { 
                return a.toLowerCase().localeCompare(b.toLowerCase()); 
              }); ;
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

export default csPlayerResolver;
