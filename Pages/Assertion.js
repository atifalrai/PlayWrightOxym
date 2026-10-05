
// import { ControlUtils } from '../Pages/ControlUtils';

// async function softAssert(testObj, testInfo, assertionFn, successMessage, failureMessage) {
//   const scenario = testInfo && testInfo.scenario ? testInfo.scenario : undefined;
//   try {
//     await testObj.step(successMessage, async () => {
//       await assertionFn();
//       await testInfo.attachments.push({
//         name: 'custom-message',
//         contentType: 'application/json',
//         body: Buffer.from(JSON.stringify({ message: successMessage, status: 'passed', scenario }), 'utf8')
//       });
//     });
//     await testObj.step(`Screenshot: ${successMessage}`, async () => {
//       await ControlUtils.TakeScreenShot(successMessage, testInfo);
//     });
//   } catch (error) {
//     if (testInfo && typeof testInfo.status === 'string') {
//       testInfo.status = 'failed';
//     } else {
//       testInfo.status = 'failed';
//     }
//     await testObj.step(failureMessage, async () => {
//       await ControlUtils.TakeScreenShot(failureMessage, testInfo);
//       testInfo.attachments.push({
//         name: 'custom-message',
//         contentType: 'application/json',
//         body: Buffer.from(JSON.stringify({ message: failureMessage, status: 'failed', scenario, error: error && error.message ? error.message : String(error) }), 'utf8')
//       });
//     });
//   }
// }

// export {
//   softAssert
// }import { ControlUtils } from '../Pages/ControlUtils';

 

async function softAssert(testObj, testInfo, assertionFn, successMessage, failureMessage) {
  const scenario = testInfo && testInfo.scenario ? testInfo.scenario : undefined;
  try {
    await testObj.step(successMessage, async () => {
      await assertionFn();
      await testInfo.attachments.push({
        name: 'custom-message',
        contentType: 'application/json',
        body: Buffer.from(JSON.stringify({ message: successMessage, status: 'passed', scenario }), 'utf8')
      });
    });
    await testObj.step(`Screenshot: ${successMessage}`, async () => {
      await ControlUtils.TakeScreenShot(successMessage, testInfo);
    });
  } catch (error) {
    if (testInfo && typeof testInfo.status === 'string') {
      testInfo.status = 'failed';
    } else {
      testInfo.status = 'failed';
    }
    await testObj.step(failureMessage, async () => {
      await ControlUtils.TakeScreenShot(failureMessage, testInfo);
      testInfo.attachments.push({
        name: 'custom-message',
        contentType: 'application/json',
        body: Buffer.from(JSON.stringify({ message: failureMessage, status: 'failed', scenario, error: error && error.message ? error.message : String(error) }), 'utf8')
      });
    });
  }
}

 

export {
  softAssert
}