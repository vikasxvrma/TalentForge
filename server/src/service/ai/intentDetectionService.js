const resumeKeywords = [
    "resume",
    "cv",
    "my experience",
    "my skills",
    "my education",
    "my projects",
    "my profile",
];

export function detectIntent(message) {
    const query = message.toLowerCase();

    const needsResume = resumeKeywords.some(keyword =>
        query.includes(keyword)
    );

    if (needsResume) {
        return "resume";
    }

    return "general";
}