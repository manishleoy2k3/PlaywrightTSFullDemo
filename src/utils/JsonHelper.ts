import fs from 'fs';
import path from 'path';
import { TestData } from '../interface/Module1TestData.interface';

/**
 * author Testers Talk
 */
export async function loadTestData() {
    const environment = `${process.env.TEST_EXECUTION_ENV}` || 'qa';
    const directoryPath = path.join(__dirname, `../../test-data/`, environment);

    const jsonData: TestData = {};
    fs.readdirSync(directoryPath).forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(directoryPath, file);
            const fileContent: TestData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            Object.assign(jsonData, fileContent); // Merge the content into a single object
        }
    });
    return jsonData;
}