const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class PostmanIntegration {
  constructor() {
    this.projectRoot = process.cwd();
    this.apiEndpoints = [];
    this.postmanCollection = {
      info: {
        name: 'EHB API Collection',
        description: 'Auto-generated API collection for EHB project',
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
      },
      item: [],
    };
  }

  async initialize() {
    console.log('📮 Postman Integration Initializing...');

    // Scan for API endpoints
    await this.scanAPIEndpoints();

    // Create Postman collection
    await this.createPostmanCollection();

    // Start monitoring for new APIs
    await this.startAPIMonitoring();
  }

  async scanAPIEndpoints() {
    console.log('🔍 Scanning API Endpoints...');

    const apiDirs = ['app/api', 'pages/api', 'api'];

    for (const dir of apiDirs) {
      if (fs.existsSync(dir)) {
        const endpoints = this.findAPIEndpoints(dir);
        this.apiEndpoints.push(...endpoints);
      }
    }
  }

  findAPIEndpoints(dirPath, basePath = '') {
    const endpoints = [];
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Handle dynamic routes like [id]
        if (file.startsWith('[') && file.endsWith(']')) {
          const paramName = file.slice(1, -1);
          const subEndpoints = this.findAPIEndpoints(fullPath, `${basePath}/{${paramName}}`);
          endpoints.push(...subEndpoints);
        } else {
          const subEndpoints = this.findAPIEndpoints(fullPath, `${basePath}/${file}`);
          endpoints.push(...subEndpoints);
        }
      } else if (file === 'route.ts' || file === 'route.js') {
        // Next.js 13+ App Router API route
        const endpoint = this.parseAppRouterEndpoint(dirPath, basePath);
        if (endpoint) {
          endpoints.push(endpoint);
        }
      } else if (file.endsWith('.ts') || file.endsWith('.js')) {
        // Pages Router API route
        const endpoint = this.parsePagesRouterEndpoint(dirPath, file, basePath);
        if (endpoint) {
          endpoints.push(endpoint);
        }
      }
    });

    return endpoints;
  }

  parseAppRouterEndpoint(dirPath, basePath) {
    let routeFile = path.join(dirPath, 'route.ts');
    if (!fs.existsSync(routeFile)) {
      routeFile = path.join(dirPath, 'route.js');
    }

    if (fs.existsSync(routeFile)) {
      const content = fs.readFileSync(routeFile, 'utf8');
      const methods = this.extractHTTPMethods(content);

      return {
        path: basePath || '/',
        methods: methods,
        file: routeFile,
        type: 'app-router',
      };
    }

    return null;
  }

  parsePagesRouterEndpoint(dirPath, file, basePath) {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const methods = this.extractHTTPMethods(content);

    if (methods.length > 0) {
      return {
        path: `${basePath}/${file.replace(/\.(ts|js)$/, '')}`,
        methods: methods,
        file: path.join(dirPath, file),
        type: 'pages-router',
      };
    }

    return null;
  }

  extractHTTPMethods(content) {
    const methods = [];
    const methodPatterns = [
      { pattern: /export async function GET/, method: 'GET' },
      { pattern: /export async function POST/, method: 'POST' },
      { pattern: /export async function PUT/, method: 'PUT' },
      { pattern: /export async function DELETE/, method: 'DELETE' },
      { pattern: /export async function PATCH/, method: 'PATCH' },
      { pattern: /export default function handler/, method: 'ALL' },
    ];

    for (const { pattern, method } of methodPatterns) {
      if (pattern.test(content)) {
        methods.push(method);
      }
    }

    return methods;
  }

  async createPostmanCollection() {
    console.log('📋 Creating Postman Collection...');

    for (const endpoint of this.apiEndpoints) {
      const postmanItem = this.createPostmanItem(endpoint);
      this.postmanCollection.item.push(postmanItem);
    }

    // Save collection
    const collectionPath = path.join(this.projectRoot, 'postman', 'ehb-api-collection.json');
    fs.mkdirSync(path.dirname(collectionPath), { recursive: true });
    fs.writeFileSync(collectionPath, JSON.stringify(this.postmanCollection, null, 2));

    console.log(`✅ Postman collection created with ${this.apiEndpoints.length} endpoints`);
  }

  createPostmanItem(endpoint) {
    const item = {
      name: endpoint.path,
      request: {
        method: endpoint.methods[0] || 'GET',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        url: {
          raw: `{{baseUrl}}${endpoint.path}`,
          host: ['{{baseUrl}}'],
          path: endpoint.path.split('/').filter(p => p),
        },
      },
    };

    // Add different methods as separate requests
    if (endpoint.methods.length > 1) {
      const folder = {
        name: endpoint.path,
        item: [],
      };

      for (const method of endpoint.methods) {
        const methodItem = {
          name: `${method} ${endpoint.path}`,
          request: {
            method: method,
            header: [
              {
                key: 'Content-Type',
                value: 'application/json',
              },
            ],
            url: {
              raw: `{{baseUrl}}${endpoint.path}`,
              host: ['{{baseUrl}}'],
              path: endpoint.path.split('/').filter(p => p),
            },
          },
        };

        // Add body for POST/PUT/PATCH methods
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
          methodItem.request.body = {
            mode: 'raw',
            raw: '{\n  \n}',
            options: {
              raw: {
                language: 'json',
              },
            },
          };
        }

        folder.item.push(methodItem);
      }

      return folder;
    }

    return item;
  }

  async startAPIMonitoring() {
    console.log('👀 Starting API Monitoring...');

    setInterval(async () => {
      await this.checkForNewAPIs();
    }, 10000); // Check every 10 seconds
  }

  async checkForNewAPIs() {
    const currentEndpoints = [...this.apiEndpoints];
    await this.scanAPIEndpoints();

    const newEndpoints = this.apiEndpoints.filter(
      endpoint =>
        !currentEndpoints.find(
          current => current.path === endpoint.path && current.file === endpoint.file
        )
    );

    if (newEndpoints.length > 0) {
      console.log(`🆕 Found ${newEndpoints.length} new API endpoints`);
      await this.addNewEndpointsToCollection(newEndpoints);
    }
  }

  async addNewEndpointsToCollection(newEndpoints) {
    for (const endpoint of newEndpoints) {
      const postmanItem = this.createPostmanItem(endpoint);
      this.postmanCollection.item.push(postmanItem);
    }

    // Update collection file
    const collectionPath = path.join(this.projectRoot, 'postman', 'ehb-api-collection.json');
    fs.writeFileSync(collectionPath, JSON.stringify(this.postmanCollection, null, 2));

    console.log(`✅ Added ${newEndpoints.length} new endpoints to Postman collection`);
  }

  async exportToPostman() {
    console.log('📤 Exporting to Postman...');

    try {
      // Check if Newman is installed (Postman CLI)
      await execAsync('newman --version');

      // Import collection to Postman
      const collectionPath = path.join(this.projectRoot, 'postman', 'ehb-api-collection.json');
      await execAsync(`newman run "${collectionPath}"`);

      console.log('✅ Collection exported to Postman');
    } catch (error) {
      console.log('⚠️ Newman not found. Please install: npm install -g newman');
      console.log('📋 Collection file saved to: postman/ehb-api-collection.json');
    }
  }

  async createEnvironment() {
    const environment = {
      id: 'ehb-environment',
      name: 'EHB Development Environment',
      values: [
        {
          key: 'baseUrl',
          value: 'http://localhost:3000',
          type: 'default',
          enabled: true,
        },
        {
          key: 'apiKey',
          value: 'your-api-key-here',
          type: 'secret',
          enabled: true,
        },
      ],
    };

    const envPath = path.join(this.projectRoot, 'postman', 'ehb-environment.json');
    fs.writeFileSync(envPath, JSON.stringify(environment, null, 2));

    console.log('✅ Postman environment created');
  }

  getAPIInfo() {
    return {
      totalEndpoints: this.apiEndpoints.length,
      endpoints: this.apiEndpoints.map(ep => ({
        path: ep.path,
        methods: ep.methods,
        type: ep.type,
      })),
      collectionPath: 'postman/ehb-api-collection.json',
    };
  }
}

module.exports = PostmanIntegration;
