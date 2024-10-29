

export const convertFirstNameToLowerCase = (fullName: string) => {
    if (typeof fullName !== 'string') {
        throw new Error('Input must be a string');
    }

    const nameParts = fullName.split(' ');
    
    return  nameParts[0].toLowerCase();
}
