const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '..', 'public', 'error-report.json');

console.log('Starting project scan to generate error report...');

// Execute the ESLint command with a larger buffer
exec('npx eslint . --format json', { maxBuffer: 1024 * 5000 }, (error, stdout, stderr) => {
  if (error && error.code !== 1) {
    // error.code === 1 means linting errors were found, which is expected.
    // We only want to fail on other execution errors.
    console.error(`Error executing ESLint: ${error.message}`);
    return;
  }

  console.log('ESLint scan completed.');

  try {
    const lintResults = JSON.parse(stdout);

    // Filter out files with no errors or warnings
    const filesWithIssues = lintResults.filter(result => result.messages.length > 0);

    const summary = {
      totalFilesScanned: lintResults.length,
      filesWithIssues: filesWithIssues.length,
      totalErrors: filesWithIssues.reduce((acc, file) => acc + file.errorCount, 0),
      totalWarnings: filesWithIssues.reduce((acc, file) => acc + file.warningCount, 0),
      generatedAt: new Date().toISOString(),
      results: filesWithIssues.map(file => ({
        filePath: file.filePath.replace(process.cwd(), ''),
        errorCount: file.errorCount,
        warningCount: file.warningCount,
        messages: file.messages.map(msg => ({
          line: msg.line,
          column: msg.column,
          severity: msg.severity === 2 ? 'error' : 'warning',
          ruleId: msg.ruleId,
          message: msg.message,
        })),
      })),
    };

    fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
    console.log(`✅ Error report successfully generated at: ${reportPath}`);
  } catch (parseError) {
    console.error(
      'Error parsing ESLint output. There might be no linting issues or a different problem occurred.'
    );
    console.error(parseError);
    // Create an empty report if parsing fails
    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        {
          message: 'No linting issues found or an error occurred during generation.',
          generatedAt: new Date().toISOString(),
        },
        null,
        2
      )
    );
  }
});
