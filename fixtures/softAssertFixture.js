import { test as base } from '@playwright/test';
import { ControlUtils } from '../Pages/ControlUtils';

export const test = base.extend({
  softAssert: async ({}, use, testInfo) => {
    let stepCounter = 0;
    await use(async (assertionFn, successMessage, failureMessage) => {
      stepCounter += 1;
      const scenario = testInfo && testInfo.scenario ? testInfo.scenario : undefined;
      const stepLabel = scenario ? `Step ${stepCounter}: ${scenario}` : `Step ${stepCounter}`;
      const attachStep = async (payload) => {
        await testInfo.attach('custom-message', {
          contentType: 'application/json',
          body: Buffer.from(JSON.stringify({ ...payload, scenario: stepLabel }), 'utf8'),
        });
      };
      try {
        await assertionFn();
        await attachStep({ message: successMessage, status: 'passed' });
        await ControlUtils.TakeScreenShot(successMessage, testInfo);
        console.log(`✔️ ${successMessage}`);
      } catch (error) {
        testInfo.status = 'failed';
        await attachStep({
          message: failureMessage,
          status: 'failed',
          error: error && error.message ? error.message : String(error),
        });
        await ControlUtils.TakeScreenShot(failureMessage, testInfo);
        console.error(`❌ ${failureMessage}`);
      }
    });
  },
});

export async function TestStatus(testInfo) {
  try {
    if (testInfo.status !== testInfo.expectedStatus) {
      console.error(`${testInfo.title} failed.`);
      console.error(testInfo.error?.message);
    } else {
      console.log(`${testInfo.title} passed.`);
    }
  } catch (err) {
    console.error('TestStatus: error while evaluating status for', testInfo.title, err);
  }
}
