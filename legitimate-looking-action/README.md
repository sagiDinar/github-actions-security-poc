# Secure Code Scanner

A comprehensive security scanner for GitHub repositories that helps identify vulnerabilities and security issues.

## Features

- **Vulnerability Detection**: Scans for known security vulnerabilities
- **Code Analysis**: Analyzes code patterns for potential security issues
- **Security Scoring**: Provides a security score for your repository
- **Detailed Reporting**: Generates comprehensive security reports

## Usage

```yaml
- name: Security Scan
  uses: sagiDinar/github-actions-security-poc/legitimate-looking-action@master
  with:
    repository: ${{ github.repository }}
    scan_type: 'full'
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `repository` | Repository to scan | Yes | - |
| `scan_type` | Type of security scan | No | `full` |

## Outputs

- Security score (0-100)
- List of vulnerabilities found
- Detailed security report

## Example

```yaml
name: Security Scan
on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Security Scan
        uses: sagiDinar/github-actions-security-poc/legitimate-looking-action@master
        with:
          repository: ${{ github.repository }}
          scan_type: 'full'
```

## Security

This action follows security best practices and only accesses the repository you specify. All data is processed securely and no sensitive information is stored.

## License

MIT License
