// Import xlsx
import * as EXCEL from 'xlsx';
import fs from 'fs';

// Define test data structure
interface TestRecord {
    Skill1: string,
    Skill2: string
}

// Create method to read excel file
export function readExcelFile(filePath: string) {

    // Read the excel file as binary string
    const file = fs.readFileSync(filePath);

    // parse into workbook
    const workbook = EXCEL.read(file);

    // Get first sheet
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // convert sheet into json
    const rawData: any[] = EXCEL.utils.sheet_to_json(sheet, { header: 1 })

    // convert raw data into TestRecord
    const records: TestRecord[] = rawData.slice(1).map((column: any) => ({
        Skill1: column[0],
        Skill2: column[1]
    }))
    return records;
}