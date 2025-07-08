#!/usr/bin/env node

/**
 * AWS Deployment Script for EHB Platform
 * Deploys frontend, backend, admin panel, and portal to AWS
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class AWSDeployer {
  constructor() {
    this.config = {
      region: process.env.AWS_REGION || 'ap-south-1',
      stackName: 'ehb-platform',
      bucketName: process.env.AWS_S3_BUCKET || 'ehb-platform-assets',
      domain: 'ehb-platform.com',
      services: {
        frontend: { port: 3000, subdomain: 'app' },
        backend: { port: 5000, subdomain: 'api' },
        admin: { port: 8000, subdomain: 'admin' },
        portal: { port: 8080, subdomain: 'portal' }
      }
    };
  }

  async deploy() {
    console.log('🚀 Starting AWS Deployment for EHB Platform...');
    
    try {
      // Step 1: Validate AWS credentials
      await this.validateAWSCredentials();
      
      // Step 2: Create S3 bucket for assets
      await this.createS3Bucket();
      
      // Step 3: Deploy infrastructure with CloudFormation
      await this.deployInfrastructure();
      
      // Step 4: Build and deploy applications
      await this.buildAndDeployApps();
      
      // Step 5: Configure DNS and SSL
      await this.configureDNS();
      
      // Step 6: Run health checks
      await this.runHealthChecks();
      
      console.log('✅ AWS Deployment completed successfully!');
      this.printDeploymentInfo();
      
    } catch (error) {
      console.error('❌ Deployment failed:', error.message);
      process.exit(1);
    }
  }

  async validateAWSCredentials() {
    console.log('🔐 Validating AWS credentials...');
    
    try {
      execSync('aws sts get-caller-identity', { stdio: 'pipe' });
      console.log('✅ AWS credentials are valid');
    } catch (error) {
      throw new Error('AWS credentials not configured. Please run: aws configure');
    }
  }

  async createS3Bucket() {
    console.log('📦 Creating S3 bucket for assets...');
    
    try {
      execSync(`aws s3 mb s3://${this.config.bucketName} --region ${this.config.region}`, { stdio: 'pipe' });
      console.log(`✅ S3 bucket ${this.config.bucketName} created`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`ℹ️ S3 bucket ${this.config.bucketName} already exists`);
      } else {
        throw error;
      }
    }
  }

  async deployInfrastructure() {
    console.log('🏗️ Deploying infrastructure with CloudFormation...');
    
    const templatePath = path.join(__dirname, '../cloud-services/aws/infrastructure.yml');
    
    if (!fs.existsSync(templatePath)) {
      await this.createInfrastructureTemplate();
    }
    
    try {
      execSync(`aws cloudformation deploy \
        --template-file ${templatePath} \
        --stack-name ${this.config.stackName} \
        --parameter-overrides \
          DomainName=${this.config.domain} \
          Environment=production \
        --capabilities CAPABILITY_IAM \
        --region ${this.config.region}`, { stdio: 'inherit' });
      
      console.log('✅ Infrastructure deployed successfully');
    } catch (error) {
      throw new Error(`Infrastructure deployment failed: ${error.message}`);
    }
  }

  async createInfrastructureTemplate() {
    console.log('📝 Creating CloudFormation template...');
    
    const template = {
      AWSTemplateFormatVersion: '2010-09-09',
      Description: 'EHB Platform Infrastructure',
      
      Parameters: {
        DomainName: {
          Type: 'String',
          Description: 'Domain name for the application'
        },
        Environment: {
          Type: 'String',
          Default: 'production',
          Description: 'Environment name'
        }
      },
      
      Resources: {
        // VPC
        VPC: {
          Type: 'AWS::EC2::VPC',
          Properties: {
            CidrBlock: '10.0.0.0/16',
            EnableDnsHostnames: true,
            EnableDnsSupport: true,
            Tags: [{ Key: 'Name', Value: 'EHB-VPC' }]
          }
        },
        
        // ECS Cluster
        ECSCluster: {
          Type: 'AWS::ECS::Cluster',
          Properties: {
            ClusterName: 'ehb-cluster',
            CapacityProviders: ['FARGATE'],
            DefaultCapacityProviderStrategy: [{
              CapacityProvider: 'FARGATE',
              Weight: 1
            }]
          }
        },
        
        // Application Load Balancer
        ALB: {
          Type: 'AWS::ElasticLoadBalancingV2::LoadBalancer',
          Properties: {
            Name: 'ehb-alb',
            Scheme: 'internet-facing',
            Type: 'application',
            Subnets: { Ref: 'PublicSubnets' }
          }
        },
        
        // RDS Database
        Database: {
          Type: 'AWS::RDS::DBInstance',
          Properties: {
            DBInstanceIdentifier: 'ehb-database',
            DBInstanceClass: 'db.t3.micro',
            Engine: 'postgres',
            EngineVersion: '15.4',
            AllocatedStorage: '20',
            StorageType: 'gp2',
            MasterUsername: 'ehb_user',
            MasterUserPassword: 'secure_password',
            DBName: 'ehb_platform',
            VPCSecurityGroups: [{ Ref: 'DatabaseSecurityGroup' }],
            DBSubnetGroupName: { Ref: 'DBSubnetGroup' }
          }
        },
        
        // ElastiCache Redis
        Redis: {
          Type: 'AWS::ElastiCache::CacheCluster',
          Properties: {
            CacheNodeType: 'cache.t3.micro',
            Engine: 'redis',
            NumCacheNodes: 1,
            VpcSecurityGroupIds: [{ Ref: 'RedisSecurityGroup' }],
            CacheSubnetGroupName: { Ref: 'CacheSubnetGroup' }
          }
        }
      },
      
      Outputs: {
        ClusterName: {
          Description: 'ECS Cluster Name',
          Value: { Ref: 'ECSCluster' }
        },
        LoadBalancerDNS: {
          Description: 'Load Balancer DNS Name',
          Value: { 'Fn::GetAtt': ['ALB', 'DNSName'] }
        },
        DatabaseEndpoint: {
          Description: 'Database Endpoint',
          Value: { 'Fn::GetAtt': ['Database', 'Endpoint.Address'] }
        }
      }
    };
    
    const templatePath = path.join(__dirname, '../cloud-services/aws/infrastructure.yml');
    fs.writeFileSync(templatePath, JSON.stringify(template, null, 2));
    console.log('✅ CloudFormation template created');
  }

  async buildAndDeployApps() {
    console.log('🔨 Building and deploying applications...');
    
    // Build the application
    console.log('📦 Building Next.js application...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Deploy to ECS
    for (const [serviceName, serviceConfig] of Object.entries(this.config.services)) {
      console.log(`🚀 Deploying ${serviceName} service...`);
      await this.deployService(serviceName, serviceConfig);
    }
  }

  async deployService(serviceName, serviceConfig) {
    const taskDefinitionPath = path.join(__dirname, `../cloud-services/aws/task-definition-${serviceName}.json`);
    
    // Create task definition
    const taskDefinition = {
      family: `ehb-${serviceName}`,
      networkMode: 'awsvpc',
      requiresCompatibilities: ['FARGATE'],
      cpu: '256',
      memory: '512',
      executionRoleArn: 'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy',
      containerDefinitions: [{
        name: serviceName,
        image: `${this.config.bucketName}.dkr.ecr.${this.config.region}.amazonaws.com/ehb-${serviceName}:latest`,
        portMappings: [{
          containerPort: serviceConfig.port,
          protocol: 'tcp'
        }],
        environment: [
          { name: 'NODE_ENV', value: 'production' },
          { name: 'PORT', value: serviceConfig.port.toString() }
        ],
        logConfiguration: {
          logDriver: 'awslogs',
          options: {
            'awslogs-group': `/ecs/ehb-${serviceName}`,
            'awslogs-region': this.config.region,
            'awslogs-stream-prefix': 'ecs'
          }
        }
      }]
    };
    
    fs.writeFileSync(taskDefinitionPath, JSON.stringify(taskDefinition, null, 2));
    
    // Register task definition
    execSync(`aws ecs register-task-definition --cli-input-json file://${taskDefinitionPath}`, { stdio: 'pipe' });
    
    // Update service
    execSync(`aws ecs update-service --cluster ehb-cluster --service ehb-${serviceName} --task-definition ehb-${serviceName}`, { stdio: 'pipe' });
    
    console.log(`✅ ${serviceName} service deployed`);
  }

  async configureDNS() {
    console.log('🌐 Configuring DNS and SSL...');
    
    // Get ALB DNS name
    const albDns = execSync(`aws cloudformation describe-stacks --stack-name ${this.config.stackName} --query 'Stacks[0].Outputs[?OutputKey==\`LoadBalancerDNS\`].OutputValue' --output text`, { encoding: 'utf8' }).trim();
    
    // Create Route53 records
    for (const [serviceName, serviceConfig] of Object.entries(this.config.services)) {
      const subdomain = serviceConfig.subdomain;
      const domain = `${subdomain}.${this.config.domain}`;
      
      console.log(`📝 Creating DNS record for ${domain}...`);
      
      // Create A record pointing to ALB
      execSync(`aws route53 change-resource-record-sets \
        --hosted-zone-id $(aws route53 list-hosted-zones --query 'HostedZones[?Name==\`${this.config.domain}.\`].Id' --output text) \
        --change-batch '{
          "Changes": [{
            "Action": "UPSERT",
            "ResourceRecordSet": {
              "Name": "${domain}",
              "Type": "A",
              "AliasTarget": {
                "HostedZoneId": "Z35SXDOTRQ7X7K",
                "DNSName": "${albDns}",
                "EvaluateTargetHealth": true
              }
            }
          }]
        }'`, { stdio: 'pipe' });
    }
    
    console.log('✅ DNS configuration completed');
  }

  async runHealthChecks() {
    console.log('🏥 Running health checks...');
    
    const endpoints = [
      'https://app.ehb-platform.com/health',
      'https://api.ehb-platform.com/health',
      'https://admin.ehb-platform.com/health',
      'https://portal.ehb-platform.com/health'
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          console.log(`✅ ${endpoint} - Healthy`);
        } else {
          console.log(`⚠️ ${endpoint} - Unhealthy (${response.status})`);
        }
      } catch (error) {
        console.log(`❌ ${endpoint} - Unreachable`);
      }
    }
  }

  printDeploymentInfo() {
    console.log('\n🎉 Deployment Summary:');
    console.log('=====================');
    console.log(`Frontend: https://app.${this.config.domain}`);
    console.log(`Backend API: https://api.${this.config.domain}`);
    console.log(`Admin Panel: https://admin.${this.config.domain}`);
    console.log(`Dev Portal: https://portal.${this.config.domain}`);
    console.log(`AWS Region: ${this.config.region}`);
    console.log(`S3 Bucket: ${this.config.bucketName}`);
    console.log('\n📊 Monitor your deployment:');
    console.log(`CloudWatch: https://console.aws.amazon.com/cloudwatch/home?region=${this.config.region}`);
    console.log(`ECS Console: https://console.aws.amazon.com/ecs/home?region=${this.config.region}`);
  }
}

// Run deployment
if (require.main === module) {
  const deployer = new AWSDeployer();
  deployer.deploy().catch(console.error);
}

module.exports = AWSDeployer; 