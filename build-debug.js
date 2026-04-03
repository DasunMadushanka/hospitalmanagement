const { execSync } = require('child_process');
const fs = require('fs');

try {
    console.log('Starting build...');
    const output = execSync('npm run build', { encoding: 'utf8', stdio: 'pipe' });
    fs.writeFileSync('build-success.log', output);
    console.log('Build succeeded!');
} catch (error) {
    console.error('Build failed!');
    fs.writeFileSync('build-error.log', error.stdout + '\n' + error.stderr);
    process.exit(1);
}
