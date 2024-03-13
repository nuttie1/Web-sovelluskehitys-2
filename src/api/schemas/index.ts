import path from 'path';
import {loadFilesSync} from '@graphql-tools/load-files';
import {mergeTypeDefs} from '@graphql-tools/merge';

/**
 * Load all the .graphql files in the current directory and merge them into a single typeDefs object
 * @type {string}
 * @returns The merged typeDefs object
 */

const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'));
const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;
