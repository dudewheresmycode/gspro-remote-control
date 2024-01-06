const path = require('node:path');
const { spawn } = require('node:child_process');

function runPowershell(scriptName, args = []) {
  const scriptPath = path.resolve(__dirname, `${scriptName}.ps1`);
  console.log(scriptPath);
  console.log(args);

  // return new Promise((resolve, reject) => {
  //   const child = spawn("powershell.exe", [scriptPath, ...args]);
  //   child.stdout.on("data", (data) => {
  //     console.log("Powershell Data: " + data);
  //   });
  //   child.stderr.on("data", (data) => {
  //     console.log("Powershell Errors: " + data);
  //   });
  //   child.on("exit", () => {
  //     console.log("Powershell Script finished!");
  //     resolve();
  //   });
  //   child.stdin.end(); //end input
  // });
}

module.exports = runPowershell;