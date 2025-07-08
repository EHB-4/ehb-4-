# EHB Cloud Failover System

A dual cloud failover system that automatically switches between Google Cloud and AWS services.

## Setup Instructions

1. **Environment Variables**
   Create a `.env` file with the following variables:

   ```
   GCP_DB_API=https://gcp-api.ehb.com
   AWS_DB_API=https://aws-api.ehb.com
   CLOUD_LOG_LEVEL=info
   CLOUD_LOG_FILE=logs/cloud-failover.log
   ```

2. **Dependencies**
   Install required dependencies:

   ```bash
   npm install axios winston dotenv
   ```

3. **Health Check**
   - `/api/google-health` - Checks Google Cloud service status
   - `/api/aws-health` - Checks AWS service status

4. **Failover API**
   Use the `/api/data/:endpoint` endpoint which will:
   1. Try Google Cloud first
   2. Fall back to AWS if Google Cloud fails
   3. Log which service was used

## Usage

### Frontend Example

```typescript
// Example API call
async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`/api/data/${endpoint}`);
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('API Error:', error);
  }
}
```

### Health Monitoring

```typescript
// Check cloud health
async function checkHealth() {
  const [googleHealth, awsHealth] = await Promise.all([
    fetch('/api/google-health'),
    fetch('/api/aws-health'),
  ]);

  return {
    google: await googleHealth.json(),
    aws: await awsHealth.json(),
  };
}
```

## Logging

All cloud operations are logged to `logs/cloud-failover.log` with:

- Request timestamps
- Which cloud provider was used
- Any errors that occurred
- Response times

## Error Handling

The system will automatically:

1. Try the primary cloud (Google)
2. Fall back to secondary cloud (AWS) on failure
3. Retry failed requests up to 3 times
4. Log all errors and fallbacks

## Monitoring

The system provides health check endpoints that can be used with monitoring tools like:

- Cloudflare
- AWS Route53
- New Relic
- Datadog

## Security

- All API endpoints are HTTPS only
- Environment variables are used for sensitive configurations
- Error messages are sanitized before being sent to clients
