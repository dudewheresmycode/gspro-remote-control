const path = require('node:path');
const { spawn } = require('node:child_process');

const POWERSHELL_EXE = 'powershell.exe';

function runPowershell(scriptName, ...args) {
  if (process.platform !== 'win32') {
    throw new Error(`Unable to run powershell script on platform "${process.platform}"`);
  }
  const scriptPath = path.resolve(__dirname, `${scriptName}.ps1`);

  const command = [scriptPath, ...args.map(arg => `'${arg}'`)];
  console.log('Running powershell script: ', command.join(' '));
  return new Promise((resolve, reject) => {

    const child = spawn(POWERSHELL_EXE, command, { windowsVerbatimArguments: true });

    child.stdout.on("data", (data) => {
      console.log(`Powershell Data: ${data}`);
    });
    child.stderr.on("data", (data) => {
      console.log(`Powershell Errors: ${data}`);
    });
    child.on("exit", () => {
      console.log("Powershell finished!");
      resolve();
    });
    child.stdin.end(); //end input
  });
}

module.exports = runPowershell;