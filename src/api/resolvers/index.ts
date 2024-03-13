import csPlayerResolver from "./csPlayerResolver";
import userResolver from "./userResolver";

/**
 * This is the main resolver file that will be used to combine all the resolvers
 * @param userResolver: The resolver for the user
 * @param csPlayerResolver: The resolver for the CS2 player
 * @returns The main resolver file
 */

export default [userResolver, csPlayerResolver];