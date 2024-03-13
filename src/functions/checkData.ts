import Filter from 'bad-words';

/**
 * Function to check if the username is valid
 * By checking if it is empty, contains profanity, or contains invalid characters
 * @param username The username to check
 * @returns The validity of the username and a message if it is invalid
 */
const checkUsername = (username: string) => {
    const usernamePattern = new RegExp('^[a-zA-Z0-9](_(?!(.|_))|.(?!(_|.))|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$');
    
    if (username === "" || username === undefined || username === null) {
        return {valid: false, message: "Username cannot be empty!"};
    }
    const filter = new Filter();
    if (filter.isProfane(username)) {
        return {valid: false, message: "Username contains profanity!"};
    }
    if (!usernamePattern.test(username)) {
        return {valid: false, message: "Username is too long/short or contains invalid characters!"};
    }
    return {valid: true, message: ""};
};

/**
 * Function to check if the password is valid
 * By checking if it is empty
 * @param password The password to check
 * @returns The validity of the password and a message if it is invalid
 */
const checkPassword = (password: string) => {
    if (password === "" || password === undefined || password === null) {
        return {valid: false, message: "Password cannot be empty!"}
    }
    return {valid: true, message: ""};
};

export { checkUsername, checkPassword };