export interface TestResult {
    title: string;
    status: string;
}

export interface Suite {
    title: string;
    file: string;
    specs: {
        title: string;
        tests: {
            results: {
                status: string;
            }[];
        }[];
    }[];
}

export interface TestReport {
    config: any; 
    suites: Suite[];
    errors: any[]; 
    stats: any; 
}