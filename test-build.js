const { exec } = require('child_process');

console.log('Testing build...');
exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error(`Build failed: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Build stderr: ${stderr}`);
  }
  console.log(`Build stdout: ${stdout}`);
  console.log('Build completed successfully!');
});
