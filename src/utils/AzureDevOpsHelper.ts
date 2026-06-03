import { request, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const credentials = Buffer.from(`${process.env.AZURE_DEVOPS_USER}:${process.env.AZURE_DEVOPS_PASS}`).toString('base64');

/**
 * Testers Talk
 */
class AzureDevOps {
    constructor() { }

    /**
     * Testers Talk
     */
    async updateTestCaseStatus(testCaseId: string, testCaseStatus: string): Promise<void> {
        try {
            const testPlanId = process.env.TEST_PLAN_ID as string;
            const testSuiteId = process.env.TEST_SUITE_ID as string;

            const testPointId = await this.getTestPoint(testPlanId, testSuiteId, testCaseId);
            await this.updateTestPointStatus(testPlanId, testSuiteId, testPointId, testCaseStatus.charAt(0).toUpperCase() + testCaseStatus.slice(1));

            console.log(`Updated Test Case ID - ${testCaseId} as ${testCaseStatus} in test plan`);
        } catch (error) {
            console.error('Error in updating test case status:', error);
        }
    }

    /**
     * Testers Talk
     */
    async getTestPoint(testPlanId: string, testSuiteId: string, testCaseId: string): Promise<string> {
        const values = [testPlanId, testSuiteId, testCaseId];
        const URL = process.env.TEST_PLAN_GET_API!.replace(/{(\d+)}/g, (match, number) => values[number] || match);
        const getTestPointResponse = await axios.get(URL, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${credentials}`
            },
        });

        const jsonResponse = await getTestPointResponse.data;
        expect(getTestPointResponse.status).toBe(200);
        return jsonResponse.value[0].id;
    }

    /**
     * Testers Talk
     */
    async updateTestPointStatus(testPlanId: string, testSuiteId: string, testPointId: string, testCaseStatus: string): Promise<void> {
        const values = [testPlanId, testSuiteId, testPointId];
        const URL = process.env.TEST_PLAN_PATCH_API!.replace(/{(\d+)}/g, (match, number) => values[number] || match);

        const requestBody = {
            "outcome": testCaseStatus // Passed, Failed, Blocked, etc.
        };

        try {
            const patchAPIResponse = await axios.patch(URL, requestBody, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Basic ${credentials}`
                }
            });
            expect(patchAPIResponse.status).toBe(200);
        } catch (error: any) {
            console.error('Error occurred during API request:', error.message);
            console.error('Stack trace:', error.stack);
        }
    }
}

export default AzureDevOps;