import Filter from 'bad-words';

const checkUsername = (username: string) => {
    const usernamePattern = new RegExp('^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$');
    
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

const checkPassword = (password: string) => {
    if (password === "" || password === undefined || password === null) {
        return {valid: false, message: "Password cannot be empty!"}
    }
    return {valid: true, message: ""};
};

export { checkUsername, checkPassword };