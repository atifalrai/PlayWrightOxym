// const { TestCaseNames } = require('./Pages/TestCaseNames');
// const { Reporter } = require('@playwright/test/reporter');
// const fs = require('fs');
// const path = require('path');
 
 
// class CustomHtmlReporter {
//   constructor(options) {
//     this.options = options;
//     this.resultsMap = {};
//     this.overallStartTime = null;
//     this.overallEndTime = null;
//   }
 
//   onBegin(config, suite) {
//     this.resultsMap = {};
//     this.overallStartTime = new Date();
//   }
 
//   onTestBegin(test) {
//     console.log(`\n🧪 STARTED: ${test.title}`);
//   }
 
//   onStdOut(chunk, test) {
//     try {
//       const msg = typeof chunk === 'string' ? chunk : chunk.toString('utf8');
//       // Write worker stdout directly to main process stdout
//       process.stdout.write(msg);
//     } catch (e) {
//       // Fail silently; reporter should not throw
//     }
//   }
 
//   onStdErr(chunk, test) {
//     try {
//       const msg = typeof chunk === 'string' ? chunk : chunk.toString('utf8');
//       // Write worker stderr directly to main process stderr
//       process.stderr.write(msg);
//     } catch (e) {
//     }
//   }
 
//   onTestEnd(test, result) {
//     const statusIcon =
//     result.status === 'Passed' ? '✅' :
//     result.status === 'Failed' ? '❌' :
//     result.status === 'Skipped' ? '⏭️' :
//     'ℹ️';
//      console.log(`${statusIcon} FINISHED: ${test.title} → ${result.status.toUpperCase()}`);
//        if (result.status === 'failed' && result.error) {
//     const cleanError =
//       (result.error.message || String(result.error))
//         .replace(/[\u001b\x1b\033\e]\[[0-9;]*m/g, '');
 
//     console.error(`🚨 ERROR in ${test.title}`);
//     console.error(cleanError);
//   }
 
//     // Group messages by scenario if scenario metadata is present
//     const customMessages = result.attachments?.filter(a => a.name === 'custom-message') || [];
//     const screenshots = result.attachments?.filter(a => a.contentType === 'image/png') || [];
//     // Parse scenario and step info, and track if any scenario failed
//     let scenarioMap = {};
//     let scenarioStatus = {};
//     let anyScenarioFailed = false;
//     customMessages.forEach((m, i) => {
//       let msgObj;
//       if (Buffer.isBuffer(m.body)) {
//         try { msgObj = JSON.parse(m.body.toString('utf8')); } catch { msgObj = { message: m.body.toString('utf8'), status: 'unknown' }; }
//       } else if (typeof m.body === 'string') {
//         try { msgObj = JSON.parse(m.body); } catch { msgObj = { message: m.body, status: 'unknown' }; }
//       } else {
//         msgObj = { message: String(m.body), status: 'unknown' };
//       }
//       const scenario = msgObj.scenario || 'Default Scenario';
//       if (!scenarioMap[scenario]) scenarioMap[scenario] = [];
//       if (!scenarioStatus[scenario]) scenarioStatus[scenario] = 'passed';
//       if (msgObj.status === 'failed') scenarioStatus[scenario] = 'failed';
//       let icon = msgObj.status === 'passed' ? '✔️' : (msgObj.status === 'failed' ? '❌' : (msgObj.status === 'info' ? 'ℹ️' : ''));
//       let imgTag = '';
//       // Only show screenshot for info if status is info, or for assertion if status is passed/failed (not both)
//       if ((msgObj.status === 'info' && screenshots[i] && Buffer.isBuffer(screenshots[i].body))) {
//         const base64 = screenshots[i].body.toString('base64');
//         imgTag = `<br><img src=\"data:image/png;base64,${base64}\" alt=\"screenshot\" class=\"thumbnail\" style=\"max-width:120px; border:1px solid #888; margin-top:4px; cursor:pointer;\" data-base64=\"${base64}\"/>`;
//       } else if ((msgObj.status === 'passed' || msgObj.status === 'failed') && screenshots[i] && Buffer.isBuffer(screenshots[i].body)) {
//         // Only show screenshot for assertion steps
//         const base64 = screenshots[i].body.toString('base64');
//         imgTag = `<br><img src=\"data:image/png;base64,${base64}\" alt=\"screenshot\" class=\"thumbnail\" style=\"max-width:120px; border:1px solid #888; margin-top:4px; cursor:pointer;\" data-base64=\"${base64}\"/>`;
//       }
//       let errorLink = '';
//       if (msgObj.status === 'failed' && msgObj.error) {
//         anyScenarioFailed = true;
//         const errorId = `error-details-${test.title.replace(/\\W/g, '')}-${i}`;
//         // Remove ANSI codes and escape HTML for error message
//         const cleanError = msgObj.error.replace(/[\u001b\x1b\033\e]\[[0-9;]*m/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//         errorLink = ` <a href=\"#\" class=\"error-link\" data-errorid=\"${errorId}\" style=\"color:#d9534f;text-decoration:underline;font-size:0.95em;\">Show Exception</a><div class=\"error-details\" id=\"${errorId}\" style=\"display:none; background:#fff0f0; color:#a94442; border:1px solid #d9534f; border-radius:4px; margin:6px 0; padding:6px 12px; font-size:0.97em;\"><pre>${cleanError}</pre></div>`;
//         scenarioMap[scenario].push(`<li>${icon} ${msgObj.message}${imgTag}${errorLink}</li>`);
//       } else {
//         scenarioMap[scenario].push(`<li>${icon} ${msgObj.message}${imgTag}</li>`);
//       }
//     });
//     // Always overwrite by test.title (last result wins, so only one per test case)
//     // For failed tests, ensure every scenario with error steps is shown, including 'Test End' or 'Exception'.
//     if (result.status === 'failed') {
//       // Remove ANSI color codes from error messages
//       let errorMsg = result.error ? (result.error.message || String(result.error)) : 'Test failed abruptly (no log messages).';
//       if (typeof errorMsg === 'string') {
//         errorMsg = errorMsg.replace(/[\u001b\x1b\033\e]\[[0-9;]*m/g, '');
//       }
//       let hasNonEmpty = false;
//       const scenarioKeys = Object.keys(scenarioMap);
//       for (const scenario of scenarioKeys) {
//         if (scenarioMap[scenario] && scenarioMap[scenario].length > 0) {
//           hasNonEmpty = true;
//         }
//       }
//       // If no scenario has steps, add an 'Exception' scenario
//       if (!hasNonEmpty) {
//         const scenario = 'Exception';
//         scenarioMap[scenario] = [
//           `<li>❌ <span style='color:#d32f2f;'>Test failed: ${errorMsg.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span></li>`
//         ];
//         scenarioStatus[scenario] = 'failed';
//       }
//       // If there is a 'Test End' or 'Exception' scenario with error steps, ensure it is always shown and labeled as 'Exception' for clarity
//       if (scenarioMap['Test End'] && scenarioMap['Test End'].length > 0) {
//         scenarioMap['Exception'] = scenarioMap['Test End'];
//         scenarioStatus['Exception'] = 'failed';
//         delete scenarioMap['Test End'];
//         delete scenarioStatus['Test End'];
//       }
//     }
//     this.resultsMap[test.title] = {
//       title: test.title,
//       status: Object.values(scenarioStatus).includes('failed') ? 'failed' : result.status,
//       scenarioMap,
//       scenarioStatus,
//       startTime: result.startTime ? new Date(result.startTime) : null,
//       endTime: result.endTime ? new Date(result.endTime) : null
//     };
//   }
 
//   async onEnd(result) {
//     this.overallEndTime = new Date();
//     // Convert resultsMap to array for reporting
//     const resultsArr = Object.values(this.resultsMap);
//     // Calculate summary stats
//     const total = resultsArr.length;
//     const passed = resultsArr.filter(r => r.status === 'passed').length;
//     const failed = resultsArr.filter(r => r.status === 'failed').length;
//     const passPct = total ? Math.round((passed / total) * 100) : 0;
//     const failPct = total ? Math.round((failed / total) * 100) : 0;
 
//     // Generate two-pane HTML report
//     // Helper to render test case detail HTML (for initial load)
//     function renderTestDetail(r, idx) {
//       if (!r) return '<div>No test case selected.</div>';
//       var html = '<div class="test-block">';
//       html += '<div class="status ' + r.status + ' test-header" data-idx="' + idx + '" style="display:flex; align-items:center;">';
//       html += (r.status === 'passed') ? '<span class="scenario-icon pass" style="margin-right:10px;">✔️</span>' : '<span class="scenario-icon fail" style="margin-right:10px;">❌</span>';
//         html += '<span style="margin-left:6px; font-size:1.15em;">' + r.title + '</span>';
//       html += '</div>';
//       html += '<div class="test-details" id="test-details-' + idx + '" style="display:block;">';
//       var scenarios = Object.entries(r.scenarioMap);
//       if (scenarios.length === 0 && r.status === 'failed') {
//         html += '<div class="scenario-block">';
//         html += '<div class="scenario-header" data-sidx="' + idx + '-0" style="cursor:pointer;user-select:none; font-weight:bold; margin-top:0; display:flex; align-items:center;">';
//         html += '<span class="expand-icon" id="expand-icon-scenario-' + idx + '-0" style="font-size:1.1em; margin-right:6px;">▶</span>';
//         html += '<span class="scenario-icon fail">❌</span>';
//         html += '<span style="margin-left:8px;">Exception</span>';
//         html += '</div>';
//         html += '<div class="scenario-details" id="scenario-details-' + idx + '-0" style="display:none;">';
//         html += '<ul><li>❌ <span style="color:#d32f2f;">Test failed abruptly (no log messages).</span></li></ul>';
//         html += '</div></div>';
//       }
//       for (var s = 0; s < scenarios.length; s++) {
//         var scenario = scenarios[s][0];
//         var steps = scenarios[s][1];
//         var status = r.scenarioStatus && r.scenarioStatus[scenario] ? r.scenarioStatus[scenario] : 'unknown';
//         var icon = status === 'passed' ? '<span class="scenario-icon pass">✔️</span>' : (status === 'failed' ? '<span class="scenario-icon fail">❌</span>' : '');
//         html += '<div class="scenario-block">';
//         html += '<div class="scenario-header" data-sidx="' + idx + '-' + s + '" style="cursor:pointer;user-select:none; font-weight:bold; margin-top:0; display:flex; align-items:center;">';
//         html += '<span class="expand-icon" id="expand-icon-scenario-' + idx + '-' + s + '" style="font-size:1.1em; margin-right:6px;">▶</span>';
//         html += icon;
//   html += '<span style="margin-left:8px;">' + scenario + '</span>';
//         html += '</div>';
//         html += '<div class="scenario-details" id="scenario-details-' + idx + '-' + s + '" style="display:none;">';
//         html += '<ul>';
//         for (var st = 0; st < steps.length; st++) {
//           html += steps[st];
//         }
//         html += '</ul>';
//         html += '</div></div>';
//       }
//       html += '</div></div>';
//       return html;
//     }
 
//     const resultsArrForHtml = resultsArr;
//     const initialDetailHtml = resultsArrForHtml.length > 0 ? renderTestDetail(resultsArrForHtml[0], 0) : '<div>No test cases found.</div>';
 
//     const now = new Date();
//     const dateTimeString = now.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
//     const overallStart = this.overallStartTime ? this.overallStartTime.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-';
//     const overallEnd = this.overallEndTime ? this.overallEndTime.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-';
//     // Calculate elapsed time in h-m-s
//     let elapsedStr = '-';
//     if (this.overallStartTime && this.overallEndTime) {
//       let ms = this.overallEndTime - this.overallStartTime;
//       let sec = Math.floor(ms / 1000);
//       let hrs = Math.floor(sec / 3600);
//       sec = sec % 3600;
//       let min = Math.floor(sec / 60);
//       sec = sec % 60;
//       elapsedStr = `${hrs}h ${min}m ${sec}s`;
//     }
//     // ...existing code...
//     const html = `<!DOCTYPE html><html><head><title>ADR Automation Report</title>
//       <style>
//         /* .report-groupbox removed */
//         .report-groupbox {
//           border: 2.5px solid #b3c6e7;
//           border-radius: 0 0 16px 16px;
//           background: #fafdff;
//           margin: 0 0 2.5em 0;
//           width: 100vw;
//           max-width: 100vw;
//           box-shadow: 0 4px 24px #b3c6e733;
//           padding: 1.5em 2.5em 2.5em 2.5em;
//           box-sizing: border-box;
//         }
//         body { font-family: Arial, sans-serif; margin: 0; }
//         .report-title { text-align: center; font-size: 2.5em; font-weight: bold; margin: 1.2em 0 0.2em 0; color: #000; }
//         .summary-block { text-align: center; margin-bottom: 2em; font-size: 1.2em; }
//         .summary-block .count { font-weight: bold; }
//         .summary-block .pass { color: green; }
//         .summary-block .fail { color: red; }
//         .main-flex { display: flex; height: 80vh; min-height: 500px; }
//         .left-pane {
//           width: 470px;
//           min-width: 320px;
//           max-width: 600px;
//           background: #f5f7fa;
//           border-right: 2px solid #b3c6e7;
//           overflow-y: auto;
//           height: 100%;
//           max-height: 80vh;
//           padding: 1.5em 0.5em 1.5em 1.5em;
//         }
//         .right-pane {
//           flex: 1;
//           padding: 2em 2.5em 2em 2.5em;
//           overflow-y: auto;
//           height: 100%;
//           max-height: 80vh;
//           font-size: 0.93em;
//         }
//         .testcase-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//         }
//         .testcase-list li {
//           padding: 0.6em 1em 0.6em 0.5em;
//           margin-bottom: 0.15em;
//           border-radius: 6px;
//           cursor: pointer;
//           font-size: 0.95em;
//           display: flex;
//           align-items: center;
//           transition: background 0.15s;
//         }
//         .testcase-list li.selected, .testcase-list li:hover {
//           background: #e3eaf6;
//         }
//         .testcase-status-icon {
//           margin-right: 8px;
//           font-size: 1.2em;
//         }
//         .test-block { border: 1px solid #ccc; border-radius: 8px; margin-bottom: 2em; padding: 1em; }
//         .scenario-block {
//           border: 2px solid #b3c6e7;
//           border-radius: 8px;
//           background: #f7faff;
//           margin: 1em 0;
//           box-shadow: 0 2px 8px #e0e7ef33;
//         }
//         .scenario-header { padding: 0.5em 1em; }
//         .scenario-details { padding: 0.5em 2em 1em 2em; }
//         .status { font-weight: bold; }
//         .test-header, .scenario-header { transition: background 0.2s; border-radius: 4px; display: flex; align-items: center; }
//         .test-header { position: relative; }
//         .test-header:hover, .scenario-header:hover { background: #f0f0f0; }
//         .expand-icon { font-size: 1.2em; margin-right: 8px; transition: transform 0.2s; color: #555; }
//         .status.passed { color: green; }
//         .status.failed { color: red; }
//         .scenario { margin-top: 1em; }
//         .messages { margin-top: 1em; }
//         img.thumbnail { display: inline-block; margin-top: 4px; }
//         /* Modal styles */
//         .modal { display: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100vw; height: 100vh; overflow: auto; background: rgba(0,0,0,0.8); }
//         .modal-content { margin: 5% auto; display: block; max-width: 90vw; max-height: 80vh; border: 4px solid #fff; border-radius: 8px; box-shadow: 0 0 20px #000; }
//         .modal-close { position: absolute; top: 30px; right: 50px; color: #fff; font-size: 2.5em; font-weight: bold; cursor: pointer; z-index: 10000; }
//         .scenario-icon.pass {
//           color: #1e7e34;
//           font-size: 1.3em;
//           margin-right: 2px;
//         }
//         .scenario-icon.fail {
//           color: #d32f2f;
//           font-size: 1.3em;
//           margin-right: 2px;
//         }
//       </style>
//     </head><body>
//     <div class="report-title" style="position: relative; margin-top: 0;">
//       ADR Automation Report
//       <span id="report-timestamp" style="position: absolute; top: 0; right: 0; font-size: 0.30em; color: #1976d2; font-weight: normal; padding: 0.2em 0.8em;">${dateTimeString}</span>
//       <div style="font-size:0.30em; color:#333; font-weight:normal; position:absolute; top:1.8em; right:0; text-align:right; padding:0 0.8em;">
//         <table style="border-collapse:separate; border-spacing:0 0.2em; margin-left:auto;">
//           <tr>
//             <td style="text-align:right; padding-right:0.5em;"><b>Start Time:</b></td>
//             <td style="text-align:left;"><span style="font-weight:normal;">${overallStart}</span></td>
//           </tr>
//           <tr>
//             <td style="text-align:right; padding-right:0.5em;"><b>End Time:</b></td>
//             <td style="text-align:left;"><span style="font-weight:normal;">${overallEnd}</span></td>
//           </tr>
//           <tr>
//             <td style="text-align:right; padding-right:0.5em;"><b>Elapsed Time:</b></td>
//             <td style="text-align:left;"><span style="font-weight:normal;">${elapsedStr}</span></td>
//           </tr>
//         </table>
//       </div>
//     </div>
//     <div class="summary-block" style="margin-bottom: 2em;">
//       <span class="count">Total Test Cases: ${total}</span> &nbsp; | &nbsp;
//       <span class="count pass">Passed: ${passed}</span> &nbsp; | &nbsp;
//       <span class="count fail">Failed: ${failed}</span>
//     </div>
//     <div style="width: 320px; margin: 0 auto 2.5em auto;">
//       <canvas id="summaryPie" width="320" height="220"></canvas>
//     </div>
//     <div id="modal" class="modal"><span class="modal-close" id="modal-close">&times;</span><img class="modal-content" id="modal-img" src="" alt="Screenshot"/></div>
//     <div class="main-flex">
//       <div class="left-pane">
//         <ul class="testcase-list" id="testcase-list">
//           ${resultsArrForHtml.map((r, idx) => {
//             let testDate = '';
//             let elapsed = '';
//             if (r && r.title) {
//               // Use per-test start time if available
//               if (r.startTime && !isNaN(new Date(r.startTime).getTime())) {
//                 testDate = new Date(r.startTime).toLocaleString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
//               } else {
//                 const now = new Date();
//                 testDate = now.toLocaleString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
//               }
//               // Show elapsed time only if both startTime and endTime exist for this test
//               if (r.startTime && r.endTime) {
//                 let ms = new Date(r.endTime) - new Date(r.startTime);
//                 let sec = Math.floor(ms / 1000);
//                 let hrs = Math.floor(sec / 3600);
//                 sec = sec % 3600;
//                 let min = Math.floor(sec / 60);
//                 sec = sec % 60;
//                 let msRem = ms % 1000;
//                 elapsed = `${hrs}h ${min}m ${sec}s ${msRem}ms`;
//               } else {
//                 elapsed = '-';
//               }
//             }
//             return `
//               <li data-idx="${idx}" class="${idx === 0 ? 'selected' : ''}">
//                 <span class="testcase-status-icon">${r.status === 'passed' ? '✔️' : '❌'}</span>
//                 ${(function() {
//                   const match = r.title.match(/ADR-TC-(\d+)/);
//                   if (match) {
//                     const num = match[1].padStart(2, '0');
//                     const key = 'ADR-TC-' + num;
//                     return '<span>' + (TestCaseNames[key] ? key : r.title) + '</span>';
//                   }
//                   return '<span>' + r.title + '</span>';
//                 })()}
               
//               </li>
//             `;
//           }).join('')}
//         </ul>
//       </div>
//       <div class="right-pane">
//         <div id="testcase-detail-pane">
//           ${initialDetailHtml}
//         </div>
//       </div>
//     </div>
//     <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"…
//     <script>
//       // Pie chart for pass/fail with percentage labels
//       document.addEventListener('DOMContentLoaded', function() {
//         const ctx = document.getElementById('summaryPie').getContext('2d');
//         const total = ${passed} + ${failed};
//         const passPct = total ? Math.round((${passed} / total) * 100) : 0;
//         const failPct = total ? Math.round((${failed} / total) * 100) : 0;
//         new Chart(ctx, {
//           type: 'pie',
//           data: {
//             labels: [
//               'Passed (' + passPct + '%)',
//               'Failed (' + failPct + '%)'
//             ],
//             datasets: [{
//               data: [${passed}, ${failed}],
//               backgroundColor: ['#4caf50', '#e53935'],
//               borderColor: ['#388e3c', '#b71c1c'],
//               borderWidth: 2
//             }]
//           },
//           options: {
//             plugins: {
//               legend: { display: true, position: 'bottom', labels: { font: { size: 16 } } },
//               tooltip: { enabled: true },
//               datalabels: {
//                 color: '#fff',
//                 font: { weight: 'bold', size: 16 },
//                 formatter: function(value, context) {
//                   const pct = total ? Math.round((value / total) * 100) : 0;
//                   return pct + '%';
//                 }
//               }
//             },
//             responsive: false,
//             maintainAspectRatio: false
//           },
//           plugins: [ChartDataLabels]
//         });
//       });
 
//       // Expose overall elapsed time for use in left panel (if needed)
//       window.reportElapsedMs = ${this.overallEndTime && this.overallStartTime ? this.overallEndTime.getTime() - this.overallStartTime.getTime() : 0};
//       window.reportStart = ${this.overallStartTime ? `new Date(${this.overallStartTime.getTime()})` : 'null'};
//       window.reportEnd = ${this.overallEndTime ? `new Date(${this.overallEndTime.getTime()})` : 'null'};
//       window.reportElapsedStr = '${elapsedStr}';
//       // Render test case detail HTML (client-side, using pre-rendered data)
//       const testDetailsData = ${JSON.stringify(resultsArrForHtml)};
//       function renderTestDetail(r, idx) {
//         if (!r) return '<div>No test case selected.</div>';
//         var html = '<div class="test-block">';
//         html += '<div class="status ' + r.status + ' test-header" data-idx="' + idx + '" style="display:flex; align-items:center;">';
//         html += (r.status === 'passed')
//           ? '<span class="scenario-icon pass" style="margin-right:10px;">✔️</span>'
//           : '<span class="scenario-icon fail" style="margin-right:10px;">❌</span>';
//   var testCaseName = r.title;
//   var match = r.title.match(/ADR-TC-(\d+)/);
//   if (match) {
//     var num = match[1].padStart(2, '0');
//     var key = 'ADR-TC-' + num;
//     if (TestCaseNames[key]) {
//       testCaseName = TestCaseNames[key];
//     }
//   }
//   html += '<span style="margin-left:6px; font-size:1.15em;">' + testCaseName + '</span></div>';
//         html += '<div class="test-details" id="test-details-' + idx + '" style="display:block;">';
//         var scenarios = Object.entries(r.scenarioMap);
//         for (var s = 0; s < scenarios.length; s++) {
//           var scenario = scenarios[s][0];
//           var steps = scenarios[s][1];
//           var status = r.scenarioStatus && r.scenarioStatus[scenario] ? r.scenarioStatus[scenario] : 'unknown';
//           var icon = status === 'passed'
//             ? '<span class="scenario-icon pass">✔️</span>'
//             : (status === 'failed' ? '<span class="scenario-icon fail">❌</span>' : '');
//           html += '<div class="scenario-block">';
//           html += '<div class="scenario-header" data-sidx="' + idx + '-' + s + '" style="cursor:pointer;user-select:none; font-weight:bold; margin-top:0; display:flex; align-items:center;">';
//           html += '<span class="expand-icon" id="expand-icon-scenario-' + idx + '-' + s + '" style="font-size:1.1em; margin-right:6px;">▶</span>';
//           html += icon;
//           html += '<span style="margin-left:8px;">' + scenario + '</span>';
//           html += '</div>';
//           html += '<div class="scenario-details" id="scenario-details-' + idx + '-' + s + '" style="display:none;">';
//           html += '<ul>' + steps.join('') + '</ul>';
//           html += '</div></div>';
//         }
//         html += '</div></div>';
//         return html;
//       }
 
//       // Handle test case selection
//       document.addEventListener('DOMContentLoaded', function() {
//         const list = document.getElementById('testcase-list');
//         const detailPane = document.getElementById('testcase-detail-pane');
//         if (list && detailPane) {
//           list.addEventListener('click', function(e) {
//             let li = e.target;
//             while (li && li.tagName !== 'LI') li = li.parentElement;
//             if (!li) return;
//             const idx = parseInt(li.getAttribute('data-idx'));
//             if (isNaN(idx)) return;
//             // Update selected
//             list.querySelectorAll('li').forEach(el => el.classList.remove('selected'));
//             li.classList.add('selected');
//             // Render detail
//             detailPane.innerHTML = renderTestDetail(testDetailsData[idx], idx);
//             // Re-attach scenario expand/collapse
//             attachScenarioExpand();
//             // Re-attach modal logic for screenshots
//             attachModalLogic();
//             // Re-attach error expand/collapse
//             attachErrorExpand();
//           });
//         }
//         // Attach for initial detail
//         attachScenarioExpand();
//         attachModalLogic();
//         attachErrorExpand();
//       });
 
//       // Scenario expand/collapse logic
//       function attachScenarioExpand() {
//         document.querySelectorAll('.scenario-header').forEach(header => {
//           header.addEventListener('click', function() {
//             const sidx = header.getAttribute('data-sidx');
//             const details = document.getElementById('scenario-details-' + sidx);
//             const icon = document.getElementById('expand-icon-scenario-' + sidx);
//             if (details && details.style.display === 'none') {
//               details.style.display = 'block';
//               if (icon) icon.textContent = '▼';
//             } else if (details) {
//               details.style.display = 'none';
//               if (icon) icon.textContent = '▶';
//             }
//           });
//         });
//       }
 
//       // Modal logic for screenshots
//       function attachModalLogic() {
//         const modal = document.getElementById('modal');
//         const modalImg = document.getElementById('modal-img');
//         const closeBtn = document.getElementById('modal-close');
//         document.querySelectorAll('img.thumbnail').forEach(img => {
//           img.addEventListener('click', function() {
//             modal.style.display = 'block';
//             modalImg.src = 'data:image/png;base64,' + img.getAttribute('data-base64');
//           });
//         });
//         closeBtn.onclick = function() { modal.style.display = 'none'; modalImg.src = ''; };
//         modal.onclick = function(e) { if (e.target === modal) { modal.style.display = 'none'; modalImg.src = ''; } };
//       }
 
//       // Error expand/collapse logic
//       function attachErrorExpand() {
//         document.querySelectorAll('.error-link').forEach(link => {
//           link.addEventListener('click', function(e) {
//             e.preventDefault();
//             const errorId = link.getAttribute('data-errorid');
//             const details = document.getElementById(errorId);
//             if (details && details.style.display === 'none') {
//               details.style.display = 'block';
//               link.textContent = 'Hide Exception';
//             } else if (details) {
//               details.style.display = 'none';
//               link.textContent = 'Show Exception';
//             }
//           });
//         });
//       }
//     </script>
//     </body></html>`;
//     const outputDir = this.options?.outputDir || 'custom-report';
//     fs.mkdirSync(outputDir, { recursive: true });
//     fs.writeFileSync(path.join(outputDir, 'index.html'), html);
//   }
// }
 
// module.exports = CustomHtmlReporter;
 
const { TestCaseNames } = require('./Pages/TestCaseNames');
const { Reporter } = require('@playwright/test/reporter');
const fs = require('fs');
const path = require('path');


class CustomHtmlReporter {
  constructor(options) {
    this.options = options;
    this.resultsMap = {};
    this.overallStartTime = null;
    this.overallEndTime = null;
  }

  onBegin(config, suite) {
    this.resultsMap = {};
    this.overallStartTime = new Date();
  }

  onTestBegin(test) {
    console.log(`\n⏭️ STARTED: ${test.title}`);
  }

onTestEnd(test, result) {
  const status = result.status.toLowerCase();

  const statusIcon =
    status === 'passed' ? '✅' :
    status === 'failed' ? '❌' :
    status === 'skipped' ? '⏭️' :
    status === 'timedout' ? '⏰' :
    'ℹ️';

  console.log(`${statusIcon} FINISHED: ${test.title} → ${status.toUpperCase()}`);

  if (status === 'failed' && result.error) {
    const cleanError =
      (result.error.message || String(result.error))
        .replace(/[\u001b\x1b\033\e]\[[0-9;]*m/g, '');

    console.error(`🚨 ERROR in ${test.title}`);
    console.error(cleanError);
  }



    // Group messages by step — one scenario block per softAssert attachment
    const attachments = result.attachments || [];
    let scenarioMap = {};
    let scenarioStatus = {};
    let stepNum = 0;

    const findScreenshotAfter = (startIndex) => {
      for (let j = startIndex + 1; j < attachments.length; j++) {
        const next = attachments[j];
        if (next.name === 'custom-message') break;
        if (next.contentType === 'image/png' && Buffer.isBuffer(next.body)) {
          return next.body.toString('base64');
        }
      }
      return null;
    };

    attachments.forEach((m, i) => {
      if (m.name !== 'custom-message') return;
      stepNum += 1;
      let msgObj;
      if (Buffer.isBuffer(m.body)) {
        try { msgObj = JSON.parse(m.body.toString('utf8')); } catch { msgObj = { message: m.body.toString('utf8'), status: 'unknown' }; }
      } else if (typeof m.body === 'string') {
        try { msgObj = JSON.parse(m.body); } catch { msgObj = { message: m.body, status: 'unknown' }; }
      } else {
        msgObj = { message: String(m.body), status: 'unknown' };
      }
      const scenario = msgObj.scenario || `Step ${stepNum}`;
      if (!scenarioMap[scenario]) scenarioMap[scenario] = [];
      if (!scenarioStatus[scenario]) scenarioStatus[scenario] = 'passed';
      if (msgObj.status === 'failed') scenarioStatus[scenario] = 'failed';
      const icon = msgObj.status === 'passed' ? '✔️' : (msgObj.status === 'failed' ? '❌' : (msgObj.status === 'info' ? 'ℹ️' : ''));
      let imgTag = '';
      const base64 = findScreenshotAfter(i);
      if (base64 && (msgObj.status === 'passed' || msgObj.status === 'failed' || msgObj.status === 'info')) {
        imgTag = `<br><img src=\"data:image/png;base64,${base64}\" alt=\"screenshot\" class=\"thumbnail\" style=\"max-width:120px; border:1px solid #888; margin-top:4px; cursor:pointer;\" data-base64=\"${base64}\"/>`;
      }
      let errorLink = '';
      if (msgObj.status === 'failed' && msgObj.error) {
        const errorId = `error-details-${test.title.replace(/\\W/g, '')}-${i}`;
        const cleanError = msgObj.error.replace(/[\u001b\x1b\033\e]\[[0-9;]*m/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        errorLink = ` <a href=\"#\" class=\"error-link\" data-errorid=\"${errorId}\" style=\"color:#d9534f;text-decoration:underline;font-size:0.95em;\">Show Exception</a><div class=\"error-details\" id=\"${errorId}\" style=\"display:none; background:#fff0f0; color:#a94442; border:1px solid #d9534f; border-radius:4px; margin:6px 0; padding:6px 12px; font-size:0.97em;\"><pre>${cleanError}</pre></div>`;
        scenarioMap[scenario].push(`<li>${icon} ${msgObj.message}${imgTag}${errorLink}</li>`);
      } else {
        scenarioMap[scenario].push(`<li>${icon} ${msgObj.message}${imgTag}</li>`);
      }
    });
    // Always overwrite by test.title (last result wins, so only one per test case)
    // For failed/interrupted tests, ensure every scenario with error steps is shown, including 'Test End' or 'Exception'.
    if (status === 'failed' || status === 'interrupted') {
      // Remove ANSI color codes from error messages
      let errorMsg = result.error ? (result.error.message || String(result.error)) : 'Test failed abruptly (no log messages).';
      if (typeof errorMsg === 'string') {
        errorMsg = errorMsg.replace(/[\u001b\x1b\033\e]\[[0-9;]*m/g, '');
      }
      let hasNonEmpty = false;
      const scenarioKeys = Object.keys(scenarioMap);
      for (const scenario of scenarioKeys) {
        if (scenarioMap[scenario] && scenarioMap[scenario].length > 0) {
          hasNonEmpty = true;
        }
      }
      // If no scenario has steps, add an 'Exception' scenario
      if (!hasNonEmpty) {
        const scenario = status === 'interrupted' ? 'Interrupted' : 'Exception';
        const defaultMsg =
          status === 'interrupted'
            ? 'Test was interrupted before completion (no step logs were recorded).'
            : `Test failed: ${errorMsg.replace(/</g, '&lt;').replace(/>/g, '&gt;')}`;
        scenarioMap[scenario] = [
          `<li>❌ <span style='color:#d32f2f;'>${defaultMsg}</span></li>`
        ];
        scenarioStatus[scenario] = 'failed';
      }
      // If there is a 'Test End' or 'Exception' scenario with error steps, ensure it is always shown and labeled as 'Exception' for clarity
      if (scenarioMap['Test End'] && scenarioMap['Test End'].length > 0) {
        scenarioMap['Exception'] = scenarioMap['Test End'];
        scenarioStatus['Exception'] = 'failed';
        delete scenarioMap['Test End'];
        delete scenarioStatus['Test End'];
      }
    }
    this.resultsMap[test.title] = {
      title: test.title,
      status: Object.values(scenarioStatus).includes('failed') ? 'failed' : result.status,
      scenarioMap,
      scenarioStatus,
      startTime: result.startTime ? new Date(result.startTime) : null,
      endTime: result.endTime ? new Date(result.endTime) : null
    };
  }

  async onEnd(result) {
    this.overallEndTime = new Date();
    // Convert resultsMap to array for reporting
    const resultsArr = Object.values(this.resultsMap);
    // Calculate summary stats
    const total = resultsArr.length;
    const passed = resultsArr.filter(r => r.status === 'passed').length;
    const failed = resultsArr.filter(r => r.status === 'failed').length;
    const passPct = total ? Math.round((passed / total) * 100) : 0;
    const failPct = total ? Math.round((failed / total) * 100) : 0;

    // Generate two-pane HTML report
    // Helper to render test case detail HTML (for initial load)
    function renderTestDetail(r, idx) {
      if (!r) return '<div>No test case selected.</div>';
      var html = '<div class="test-block">';
      html += '<div class="status ' + r.status + ' test-header" data-idx="' + idx + '" style="display:flex; align-items:center;">';
      html += (r.status === 'passed') ? '<span class="scenario-icon pass" style="margin-right:10px;">✔️</span>' : '<span class="scenario-icon fail" style="margin-right:10px;">❌</span>';
        html += '<span style="margin-left:6px; font-size:1.15em;">' + r.title + '</span>';
      html += '</div>';
      html += '<div class="test-details" id="test-details-' + idx + '" style="display:block;">';
      var scenarios = Object.entries(r.scenarioMap);
      if (scenarios.length === 0 && r.status === 'failed') {
        html += '<div class="scenario-block">';
        html += '<div class="scenario-header" data-sidx="' + idx + '-0" style="cursor:pointer;user-select:none; font-weight:bold; margin-top:0; display:flex; align-items:center;">';
        html += '<span class="expand-icon" id="expand-icon-scenario-' + idx + '-0" style="font-size:1.1em; margin-right:6px;">▶</span>';
        html += '<span class="scenario-icon fail">❌</span>';
        html += '<span style="margin-left:8px;">Exception</span>';
        html += '</div>';
        html += '<div class="scenario-details" id="scenario-details-' + idx + '-0" style="display:none;">';
        html += '<ul><li>❌ <span style="color:#d32f2f;">Test failed abruptly (no log messages).</span></li></ul>';
        html += '</div></div>';
      }
      for (var s = 0; s < scenarios.length; s++) {
        var scenario = scenarios[s][0];
        var steps = scenarios[s][1];
        var status = r.scenarioStatus && r.scenarioStatus[scenario] ? r.scenarioStatus[scenario] : 'unknown';
        var icon = status === 'passed' ? '<span class="scenario-icon pass">✔️</span>' : (status === 'failed' ? '<span class="scenario-icon fail">❌</span>' : '');
        html += '<div class="scenario-block">';
        html += '<div class="scenario-header" data-sidx="' + idx + '-' + s + '" style="cursor:pointer;user-select:none; font-weight:bold; margin-top:0; display:flex; align-items:center;">';
        html += '<span class="expand-icon" id="expand-icon-scenario-' + idx + '-' + s + '" style="font-size:1.1em; margin-right:6px;">▶</span>';
        html += icon;
  html += '<span style="margin-left:8px;">' + scenario + '</span>';
        html += '</div>';
        html += '<div class="scenario-details" id="scenario-details-' + idx + '-' + s + '" style="display:none;">';
        html += '<ul>';
        for (var st = 0; st < steps.length; st++) {
          html += steps[st];
        }
        html += '</ul>';
        html += '</div></div>';
      }
      html += '</div></div>';
      return html;
    }

    const resultsArrForHtml = resultsArr;
    const initialDetailHtml = resultsArrForHtml.length > 0 ? renderTestDetail(resultsArrForHtml[0], 0) : '<div>No test cases found.</div>';

    const now = new Date();
    const dateTimeString = now.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const overallStart = this.overallStartTime ? this.overallStartTime.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-';
    const overallEnd = this.overallEndTime ? this.overallEndTime.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-';
    // Calculate elapsed time in h-m-s
    let elapsedStr = '-';
    if (this.overallStartTime && this.overallEndTime) {
      let ms = this.overallEndTime - this.overallStartTime;
      let sec = Math.floor(ms / 1000);
      let hrs = Math.floor(sec / 3600);
      sec = sec % 3600;
      let min = Math.floor(sec / 60);
      sec = sec % 60;
      elapsedStr = `${hrs}h ${min}m ${sec}s`;
    }
    // ...existing code...
    const html = `<!DOCTYPE html><html><head><title>OXYM Automation Report</title>
      <style>
        /* .report-groupbox removed */
        .report-groupbox {
          border: 2.5px solid #b3c6e7;
          border-radius: 0 0 16px 16px;
          background: #fafdff;
          margin: 0 0 2.5em 0;
          width: 100vw;
          max-width: 100vw;
          box-shadow: 0 4px 24px #b3c6e733;
          padding: 1.5em 2.5em 2.5em 2.5em;
          box-sizing: border-box;
        }
        body { font-family: Arial, sans-serif; margin: 0; }
        .report-title { text-align: center; font-size: 2.5em; font-weight: bold; margin: 1.2em 0 0.2em 0; color: #000; }
        .summary-block { text-align: center; margin-bottom: 2em; font-size: 1.2em; }
        .summary-block .count { font-weight: bold; }
        .summary-block .pass { color: green; }
        .summary-block .fail { color: red; }
        .main-flex { display: flex; height: 80vh; min-height: 500px; }
        .left-pane {
          width: 470px;
          min-width: 320px;
          max-width: 600px;
          background: #f5f7fa;
          border-right: 2px solid #b3c6e7;
          overflow-y: auto;
          height: 100%;
          max-height: 80vh;
          padding: 1.5em 0.5em 1.5em 1.5em;
        }
        .right-pane {
          flex: 1;
          padding: 2em 2.5em 2em 2.5em;
          overflow-y: auto;
          height: 100%;
          max-height: 80vh;
          font-size: 0.93em;
        }
        .testcase-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .testcase-list li {
          padding: 0.6em 1em 0.6em 0.5em;
          margin-bottom: 0.15em;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95em;
          display: flex;
          align-items: center;
          transition: background 0.15s;
        }
        .testcase-list li.selected, .testcase-list li:hover {
          background: #e3eaf6;
        }
        .testcase-status-icon {
          margin-right: 8px;
          font-size: 1.2em;
        }
        .test-block { border: 1px solid #ccc; border-radius: 8px; margin-bottom: 2em; padding: 1em; }
        .scenario-block {
          border: 2px solid #b3c6e7;
          border-radius: 8px;
          background: #f7faff;
          margin: 1em 0;
          box-shadow: 0 2px 8px #e0e7ef33;
        }
        .scenario-header { padding: 0.5em 1em; }
        .scenario-details { padding: 0.5em 2em 1em 2em; }
        .status { font-weight: bold; }
        .test-header, .scenario-header { transition: background 0.2s; border-radius: 4px; display: flex; align-items: center; }
        .test-header { position: relative; }
        .test-header:hover, .scenario-header:hover { background: #f0f0f0; }
        .expand-icon { font-size: 1.2em; margin-right: 8px; transition: transform 0.2s; color: #555; }
        .status.passed { color: green; }
        .status.failed { color: red; }
        .scenario { margin-top: 1em; }
        .messages { margin-top: 1em; }
        img.thumbnail { display: inline-block; margin-top: 4px; }
        /* Modal styles */
        .modal { display: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100vw; height: 100vh; overflow: auto; background: rgba(0,0,0,0.8); }
        .modal-content { margin: 5% auto; display: block; max-width: 90vw; max-height: 80vh; border: 4px solid #fff; border-radius: 8px; box-shadow: 0 0 20px #000; }
        .modal-close { position: absolute; top: 30px; right: 50px; color: #fff; font-size: 2.5em; font-weight: bold; cursor: pointer; z-index: 10000; }
        .scenario-icon.pass {
          color: #1e7e34;
          font-size: 1.3em;
          margin-right: 2px;
        }
        .scenario-icon.fail {
          color: #d32f2f;
          font-size: 1.3em;
          margin-right: 2px;
        }
      </style>
    </head><body>
    <div class="report-title" style="position: relative; margin-top: 0;">
      OXYM Automation Report
      <span id="report-timestamp" style="position: absolute; top: 0; right: 0; font-size: 0.30em; color: #1976d2; font-weight: normal; padding: 0.2em 0.8em;">${dateTimeString}</span>
      <div style="font-size:0.30em; color:#333; font-weight:normal; position:absolute; top:1.8em; right:0; text-align:right; padding:0 0.8em;">
        <table style="border-collapse:separate; border-spacing:0 0.2em; margin-left:auto;">
          <tr>
            <td style="text-align:right; padding-right:0.5em;"><b>Start Time:</b></td>
            <td style="text-align:left;"><span style="font-weight:normal;">${overallStart}</span></td>
          </tr>
          <tr>
            <td style="text-align:right; padding-right:0.5em;"><b>End Time:</b></td>
            <td style="text-align:left;"><span style="font-weight:normal;">${overallEnd}</span></td>
          </tr>
          <tr>
            <td style="text-align:right; padding-right:0.5em;"><b>Elapsed Time:</b></td>
            <td style="text-align:left;"><span style="font-weight:normal;">${elapsedStr}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="summary-block" style="margin-bottom: 2em;">
      <span class="count">Total Test Cases: ${total}</span> &nbsp; | &nbsp;
      <span class="count pass">Passed: ${passed}</span> &nbsp; | &nbsp;
      <span class="count fail">Failed: ${failed}</span>
    </div>
    <div style="width: 320px; margin: 0 auto 2.5em auto;">
      <canvas id="summaryPie" width="320" height="220"></canvas>
    </div>
    <div id="modal" class="modal"><span class="modal-close" id="modal-close">&times;</span><img class="modal-content" id="modal-img" src="" alt="Screenshot"/></div>
    <div class="main-flex">
      <div class="left-pane">
        <ul class="testcase-list" id="testcase-list">
          ${resultsArrForHtml.map((r, idx) => {
            let testDate = '';
            let elapsed = '';
            if (r && r.title) {
              // Use per-test start time if available
              if (r.startTime && !isNaN(new Date(r.startTime).getTime())) {
                testDate = new Date(r.startTime).toLocaleString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
              } else {
                const now = new Date();
                testDate = now.toLocaleString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
              }
              // Show elapsed time only if both startTime and endTime exist for this test
              if (r.startTime && r.endTime) {
                let ms = new Date(r.endTime) - new Date(r.startTime);
                let sec = Math.floor(ms / 1000);
                let hrs = Math.floor(sec / 3600);
                sec = sec % 3600;
                let min = Math.floor(sec / 60);
                sec = sec % 60;
                let msRem = ms % 1000;
                elapsed = `${hrs}h ${min}m ${sec}s ${msRem}ms`;
              } else {
                elapsed = '-';
              }
            }
            return `
              <li data-idx="${idx}" class="${idx === 0 ? 'selected' : ''}">
                <span class="testcase-status-icon">${r.status === 'passed' ? '✔️' : '❌'}</span>
                ${(function() {
                  const match = r.title.match(/ADR-TC-(\d+)/);
                  if (match) {
                    const num = match[1].padStart(2, '0');
                    const key = 'ADR-TC-' + num;
                    return '<span>' + (TestCaseNames[key] ? key : r.title) + '</span>';
                  }
                  return '<span>' + r.title + '</span>';
                })()}
                
              </li>
            `;
          }).join('')}
        </ul>
      </div>
      <div class="right-pane">
        <div id="testcase-detail-pane">
          ${initialDetailHtml}
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
    <script>
      // Pie chart for pass/fail with percentage labels
      document.addEventListener('DOMContentLoaded', function() {
        const ctx = document.getElementById('summaryPie').getContext('2d');
        const total = ${passed} + ${failed};
        const passPct = total ? Math.round((${passed} / total) * 100) : 0;
        const failPct = total ? Math.round((${failed} / total) * 100) : 0;
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: [
              'Passed (' + passPct + '%)',
              'Failed (' + failPct + '%)'
            ],
            datasets: [{
              data: [${passed}, ${failed}],
              backgroundColor: ['#4caf50', '#e53935'],
              borderColor: ['#388e3c', '#b71c1c'],
              borderWidth: 2
            }]
          },
          options: {
            plugins: {
              legend: { display: true, position: 'bottom', labels: { font: { size: 16 } } },
              tooltip: { enabled: true },
              datalabels: {
                color: '#fff',
                font: { weight: 'bold', size: 16 },
                formatter: function(value, context) {
                  const pct = total ? Math.round((value / total) * 100) : 0;
                  return pct + '%';
                }
              }
            },
            responsive: false,
            maintainAspectRatio: false
          },
          plugins: [ChartDataLabels]
        });
      });

      // Expose overall elapsed time for use in left panel (if needed)
      window.reportElapsedMs = ${this.overallEndTime && this.overallStartTime ? this.overallEndTime.getTime() - this.overallStartTime.getTime() : 0};
      window.reportStart = ${this.overallStartTime ? `new Date(${this.overallStartTime.getTime()})` : 'null'};
      window.reportEnd = ${this.overallEndTime ? `new Date(${this.overallEndTime.getTime()})` : 'null'};
      window.reportElapsedStr = '${elapsedStr}';
      // Render test case detail HTML (client-side, using pre-rendered data)
      const testDetailsData = ${JSON.stringify(resultsArrForHtml)};
      function renderTestDetail(r, idx) {
        if (!r) return '<div>No test case selected.</div>';
        var html = '<div class="test-block">';
        html += '<div class="status ' + r.status + ' test-header" data-idx="' + idx + '" style="display:flex; align-items:center;">';
        html += (r.status === 'passed')
          ? '<span class="scenario-icon pass" style="margin-right:10px;">✔️</span>'
          : '<span class="scenario-icon fail" style="margin-right:10px;">❌</span>';
  var testCaseName = r.title;
  var match = r.title.match(/ADR-TC-(\d+)/);
  if (match) {
    var num = match[1].padStart(2, '0');
    var key = 'ADR-TC-' + num;
    if (TestCaseNames[key]) {
      testCaseName = TestCaseNames[key];
    }
  }
  html += '<span style="margin-left:6px; font-size:1.15em;">' + testCaseName + '</span></div>';
        html += '<div class="test-details" id="test-details-' + idx + '" style="display:block;">';
        var scenarios = Object.entries(r.scenarioMap);
        for (var s = 0; s < scenarios.length; s++) {
          var scenario = scenarios[s][0];
          var steps = scenarios[s][1];
          var status = r.scenarioStatus && r.scenarioStatus[scenario] ? r.scenarioStatus[scenario] : 'unknown';
          var icon = status === 'passed'
            ? '<span class="scenario-icon pass">✔️</span>'
            : (status === 'failed' ? '<span class="scenario-icon fail">❌</span>' : '');
          html += '<div class="scenario-block">';
          html += '<div class="scenario-header" data-sidx="' + idx + '-' + s + '" style="cursor:pointer;user-select:none; font-weight:bold; margin-top:0; display:flex; align-items:center;">';
          html += '<span class="expand-icon" id="expand-icon-scenario-' + idx + '-' + s + '" style="font-size:1.1em; margin-right:6px;">▶</span>';
          html += icon;
          html += '<span style="margin-left:8px;">' + scenario + '</span>';
          html += '</div>';
          html += '<div class="scenario-details" id="scenario-details-' + idx + '-' + s + '" style="display:none;">';
          html += '<ul>' + steps.join('') + '</ul>';
          html += '</div></div>';
        }
        html += '</div></div>';
        return html;
      }

      // Handle test case selection
      document.addEventListener('DOMContentLoaded', function() {
        const list = document.getElementById('testcase-list');
        const detailPane = document.getElementById('testcase-detail-pane');
        if (list && detailPane) {
          list.addEventListener('click', function(e) {
            let li = e.target;
            while (li && li.tagName !== 'LI') li = li.parentElement;
            if (!li) return;
            const idx = parseInt(li.getAttribute('data-idx'));
            if (isNaN(idx)) return;
            // Update selected
            list.querySelectorAll('li').forEach(el => el.classList.remove('selected'));
            li.classList.add('selected');
            // Render detail
            detailPane.innerHTML = renderTestDetail(testDetailsData[idx], idx);
            // Re-attach scenario expand/collapse
            attachScenarioExpand();
            // Re-attach modal logic for screenshots
            attachModalLogic();
            // Re-attach error expand/collapse
            attachErrorExpand();
          });
        }
        // Attach for initial detail
        attachScenarioExpand();
        attachModalLogic();
        attachErrorExpand();
      });

      // Scenario expand/collapse logic
      function attachScenarioExpand() {
        document.querySelectorAll('.scenario-header').forEach(header => {
          header.addEventListener('click', function() {
            const sidx = header.getAttribute('data-sidx');
            const details = document.getElementById('scenario-details-' + sidx);
            const icon = document.getElementById('expand-icon-scenario-' + sidx);
            if (details && details.style.display === 'none') {
              details.style.display = 'block';
              if (icon) icon.textContent = '▼';
            } else if (details) {
              details.style.display = 'none';
              if (icon) icon.textContent = '▶';
            }
          });
        });
      }

      // Modal logic for screenshots
      function attachModalLogic() {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-img');
        const closeBtn = document.getElementById('modal-close');
        document.querySelectorAll('img.thumbnail').forEach(img => {
          img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = 'data:image/png;base64,' + img.getAttribute('data-base64');
          });
        });
        closeBtn.onclick = function() { modal.style.display = 'none'; modalImg.src = ''; };
        modal.onclick = function(e) { if (e.target === modal) { modal.style.display = 'none'; modalImg.src = ''; } };
      }

      // Error expand/collapse logic
      function attachErrorExpand() {
        document.querySelectorAll('.error-link').forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const errorId = link.getAttribute('data-errorid');
            const details = document.getElementById(errorId);
            if (details && details.style.display === 'none') {
              details.style.display = 'block';
              link.textContent = 'Hide Exception';
            } else if (details) {
              details.style.display = 'none';
              link.textContent = 'Show Exception';
            }
          });
        });
      }
    </script>
    </body></html>`;
    const outputDir = this.options?.outputDir || 'custom-report';
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'customreport.html'), html);
  }
}

module.exports = CustomHtmlReporter;
