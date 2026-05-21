import sanitizeHtml from "sanitize-html";

export const sanitizeContent = (dirtyString: string) => {
    return sanitizeHtml(dirtyString, {
        allowedTags : [],
        allowedAttributes: {}
    })
    .replace(/\s+/g, " ")
    .trim();
}