export const normalizeTextService = (text) => {
    return text
        .replace(/\r\n/g, "\n")
        .replace(/\t/g, " ")
        .replace(/[ ]+/g, " ")
        .trim();
};