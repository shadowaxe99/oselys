const dotenv = require('dotenv');
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_SECRET_KEY',
  mongoUri: process.env.MONGODB_URI || 
            process.env.MONGO_HOST || 
            'mongodb://localhost:27017/elysium',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  gpt4ApiKey: process.env.OPENAI_API_KEY,
  ethereumNodeUrl: process.env.ETHEREUM_NODE_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  azureAccountName: process.env.AZURE_ACCOUNT_NAME,
  azureAccountKey: process.env.AZURE_ACCOUNT_KEY,
  oauth2ClientId: process.env.OAUTH2_CLIENT_ID,
  oauth2ClientSecret: process.env.OAUTH2_CLIENT_SECRET,
  oauth2CallbackUrl: process.env.OAUTH2_CALLBACK_URL,
  gdprComplianceEnabled: process.env.GDPR_COMPLIANCE_ENABLED || false
};

module.exports = config;