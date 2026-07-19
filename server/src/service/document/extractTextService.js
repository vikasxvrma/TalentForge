import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractTextService = async (fileBuffer) => {
    const pdf = await getDocument({
        data: new Uint8Array(fileBuffer),
    }).promise;

    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        const content = await page.getTextContent();

        const pageText = content.items
            .map((item) => item.str)
            .join(" ");

        text += pageText + "\n";
    }

    return text.trim();
};