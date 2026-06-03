import { expect, test } from '@playwright/test'
import { downloadAndValidateFileName, loginToApplication } from '../../src/utils/Common'

import fs from 'fs'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

test('Validate downloaded PDF file content in playwright', async ({ page }) => {

    const DOWNLOADED_PDF_FILE = "./downloads/Downloaded_PDF_File.pdf"

    // Login to Testers Talk
    await loginToApplication(page);

    // Download XML file & validate downloaded file name
    await downloadAndValidateFileName(page, 'Download PDF', 'TestersTalk.pdf')

    // Read PDF file
    const rawData = new Uint8Array(fs.readFileSync(DOWNLOADED_PDF_FILE))
    const result = await getDocument(rawData).promise;

    // Iterate each page and save data
    let pdfText = "";
    for (let i = 1; i <= result.numPages; i++) {
        const page = await result.getPage(i);
        const content = await page.getTextContent();
        pdfText += content.items.map((item: any) => item.str).join(" ");
    }
    console.log('PDF text : ' + pdfText)

    // Assert Testers Talk youtube link
    expect(pdfText).toContain('YouTube Channel')
    expect(pdfText).toContain('https://www.youtube.com/@testerstalk')
})