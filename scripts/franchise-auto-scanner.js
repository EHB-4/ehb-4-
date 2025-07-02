#!/usr/bin/env node

/**
 * EHB Franchise Auto Scanner & Merger
 * Real-time franchise data monitoring and intelligent merging system
 * 
 * Features:
 * - Continuous file system monitoring
 * - Intelligent duplicate detection
 * - Data loss prevention merging
 * - Auto-backup before operations
 * - Real-time logging and reporting
 * - Performance optimization
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const crypto = require('crypto');
const { exec } = require('child_process');

class FranchiseAutoScanner {
  constructor() {
    this.config = {
      scanInterval: 5000, // 5 seconds
      backupInterval: 300000, // 5 minutes
      logFile: './logs/franchise-scanner.log',
      backupDir: './backups/franchise',
      mergeStrategy: 'intelligent', // intelligent, conservative, aggressive
      maxFileSize: 10 * 1024 * 1024, // 10MB
      excludedPatterns: [
        'node_modules/**',
        '.git/**',
        '*.log',
        '*.tmp',
        '*.cache'
      ],
      franchisePaths: [
        './app/franchise',
        './components/EHB-Franchise',
        './temp-backup/ehb-franchise',
        './types',
        './lib/utils'
      ]
    };

    this.scanResults = {
      totalFiles: 0,
      duplicates: [],
      merged: [],
      errors: [],
      lastScan: null,
      performance: {
        scanTime: 0,
        mergeTime: 0,
        backupTime: 0
      }
    };

    this.isRunning = false;
    this.watcher = null;
    this.backupTimer = null;
    this.scanTimer = null;
  }

  /**
   * Initialize the auto scanner
   */
  async initialize() {
    console.log('🚀 Initializing EHB Franchise Auto Scanner...');
    
    try {
      // Create necessary directories
      await this.createDirectories();
      
      // Initialize logging
      await this.initializeLogging();
      
      // Load existing scan data
      await this.loadScanData();
      
      // Start monitoring
      await this.startMonitoring();
      
      console.log('✅ Franchise Auto Scanner initialized successfully');
      this.log('INFO', 'Franchise Auto Scanner initialized successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize Franchise Auto Scanner:', error);
      this.log('ERROR', `Initialization failed: ${error.message}`);
    }
  }

  /**
   * Create necessary directories
   */
  async createDirectories() {
    const dirs = [
      './logs',
      this.config.backupDir,
      './temp/franchise-scan',
      './reports/franchise'
    ];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    }
  }

  /**
   * Initialize logging system
   */
  async initializeLogging() {
    const logDir = path.dirname(this.config.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Create log file if it doesn't exist
    if (!fs.existsSync(this.config.logFile)) {
      fs.writeFileSync(this.config.logFile, '');
    }
  }

  /**
   * Log messages with timestamp
   */
  log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    
    fs.appendFileSync(this.config.logFile, logEntry);
    
    // Also log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level}] ${message}`);
    }
  }

  /**
   * Load existing scan data
   */
  async loadScanData() {
    const dataFile = './temp/franchise-scan/scan-data.json';
    
    if (fs.existsSync(dataFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        this.scanResults = { ...this.scanResults, ...data };
        this.log('INFO', 'Loaded existing scan data');
      } catch (error) {
        this.log('WARN', `Failed to load scan data: ${error.message}`);
      }
    }
  }

  /**
   * Save scan data
   */
  async saveScanData() {
    const dataFile = './temp/franchise-scan/scan-data.json';
    
    try {
      fs.writeFileSync(dataFile, JSON.stringify(this.scanResults, null, 2));
    } catch (error) {
      this.log('ERROR', `Failed to save scan data: ${error.message}`);
    }
  }

  /**
   * Start file system monitoring
   */
  async startMonitoring() {
    console.log('👀 Starting file system monitoring...');
    
    // Start file watcher
    this.watcher = chokidar.watch(this.config.franchisePaths, {
      ignored: this.config.excludedPatterns,
      persistent: true,
      ignoreInitial: false,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
      }
    });

    // Watch for file changes
    this.watcher
      .on('add', (filePath) => this.handleFileChange('add', filePath))
      .on('change', (filePath) => this.handleFileChange('change', filePath))
      .on('unlink', (filePath) => this.handleFileChange('unlink', filePath))
      .on('error', (error) => this.log('ERROR', `Watcher error: ${error.message}`));

    // Start periodic scanning
    this.startPeriodicScanning();
    
    // Start periodic backup
    this.startPeriodicBackup();
    
    this.isRunning = true;
    this.log('INFO', 'File system monitoring started');
  }

  /**
   * Handle file changes
   */
  async handleFileChange(event, filePath) {
    this.log('INFO', `File ${event}: ${filePath}`);
    
    // Debounce rapid changes
    clearTimeout(this.changeTimer);
    this.changeTimer = setTimeout(() => {
      this.performQuickScan();
    }, 1000);
  }

  /**
   * Start periodic scanning
   */
  startPeriodicScanning() {
    this.scanTimer = setInterval(() => {
      this.performFullScan();
    }, this.config.scanInterval);
    
    this.log('INFO', `Periodic scanning started (${this.config.scanInterval}ms interval)`);
  }

  /**
   * Start periodic backup
   */
  startPeriodicBackup() {
    this.backupTimer = setInterval(() => {
      this.performBackup();
    }, this.config.backupInterval);
    
    this.log('INFO', `Periodic backup started (${this.config.backupInterval}ms interval)`);
  }

  /**
   * Perform quick scan for recent changes
   */
  async performQuickScan() {
    const startTime = Date.now();
    
    try {
      this.log('INFO', 'Performing quick scan...');
      
      // Scan only recently modified files
      const recentFiles = await this.getRecentFiles();
      const duplicates = await this.findDuplicates(recentFiles);
      
      if (duplicates.length > 0) {
        this.log('INFO', `Found ${duplicates.length} potential duplicates in quick scan`);
        await this.mergeDuplicates(duplicates);
      }
      
      this.scanResults.performance.scanTime = Date.now() - startTime;
      this.log('INFO', `Quick scan completed in ${this.scanResults.performance.scanTime}ms`);
      
    } catch (error) {
      this.log('ERROR', `Quick scan failed: ${error.message}`);
    }
  }

  /**
   * Perform full system scan
   */
  async performFullScan() {
    const startTime = Date.now();
    
    try {
      this.log('INFO', 'Performing full system scan...');
      
      // Get all franchise-related files
      const allFiles = await this.getAllFranchiseFiles();
      this.scanResults.totalFiles = allFiles.length;
      
      // Find duplicates
      const duplicates = await this.findDuplicates(allFiles);
      this.scanResults.duplicates = duplicates;
      
      // Merge duplicates if found
      if (duplicates.length > 0) {
        this.log('INFO', `Found ${duplicates.length} duplicate groups`);
        await this.mergeDuplicates(duplicates);
      }
      
      // Update scan results
      this.scanResults.lastScan = new Date().toISOString();
      this.scanResults.performance.scanTime = Date.now() - startTime;
      
      // Save scan data
      await this.saveScanData();
      
      // Generate report
      await this.generateReport();
      
      this.log('INFO', `Full scan completed in ${this.scanResults.performance.scanTime}ms`);
      
    } catch (error) {
      this.log('ERROR', `Full scan failed: ${error.message}`);
    }
  }

  /**
   * Get all franchise-related files
   */
  async getAllFranchiseFiles() {
    const files = [];
    
    for (const basePath of this.config.franchisePaths) {
      if (fs.existsSync(basePath)) {
        const foundFiles = await this.walkDirectory(basePath);
        files.push(...foundFiles);
      }
    }
    
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.js', '.jsx', '.ts', '.tsx', '.json', '.md'].includes(ext);
    });
  }

  /**
   * Walk directory recursively
   */
  async walkDirectory(dir) {
    const files = [];
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        const subFiles = await this.walkDirectory(fullPath);
        files.push(...subFiles);
      } else {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  /**
   * Get recently modified files
   */
  async getRecentFiles() {
    const allFiles = await this.getAllFranchiseFiles();
    const now = Date.now();
    const fiveMinutesAgo = now - (5 * 60 * 1000);
    
    return allFiles.filter(file => {
      try {
        const stats = fs.statSync(file);
        return stats.mtime.getTime() > fiveMinutesAgo;
      } catch (error) {
        return false;
      }
    });
  }

  /**
   * Find duplicate files based on content and structure
   */
  async findDuplicates(files) {
    const duplicates = [];
    const fileHashes = new Map();
    const contentHashes = new Map();
    
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const contentHash = crypto.createHash('md5').update(content).digest('hex');
        const fileName = path.basename(file);
        
        // Check for exact content duplicates
        if (contentHashes.has(contentHash)) {
          const existingFile = contentHashes.get(contentHash);
          duplicates.push({
            type: 'exact',
            files: [existingFile, file],
            hash: contentHash
          });
        } else {
          contentHashes.set(contentHash, file);
        }
        
        // Check for similar file names
        if (fileHashes.has(fileName)) {
          const existingFiles = fileHashes.get(fileName);
          existingFiles.push(file);
        } else {
          fileHashes.set(fileName, [file]);
        }
        
      } catch (error) {
        this.log('WARN', `Failed to process file ${file}: ${error.message}`);
      }
    }
    
    // Add similar named files to duplicates
    for (const [fileName, fileList] of fileHashes) {
      if (fileList.length > 1) {
        duplicates.push({
          type: 'similar_name',
          files: fileList,
          fileName: fileName
        });
      }
    }
    
    return duplicates;
  }

  /**
   * Merge duplicate files intelligently
   */
  async mergeDuplicates(duplicates) {
    const startTime = Date.now();
    
    for (const duplicate of duplicates) {
      try {
        await this.mergeDuplicateGroup(duplicate);
        this.scanResults.merged.push(duplicate);
      } catch (error) {
        this.log('ERROR', `Failed to merge duplicate group: ${error.message}`);
        this.scanResults.errors.push({
          type: 'merge_error',
          duplicate: duplicate,
          error: error.message
        });
      }
    }
    
    this.scanResults.performance.mergeTime = Date.now() - startTime;
    this.log('INFO', `Merged ${duplicates.length} duplicate groups in ${this.scanResults.performance.mergeTime}ms`);
  }

  /**
   * Merge a group of duplicate files
   */
  async mergeDuplicateGroup(duplicate) {
    this.log('INFO', `Merging duplicate group: ${duplicate.type}`);
    
    if (duplicate.type === 'exact') {
      await this.mergeExactDuplicates(duplicate);
    } else if (duplicate.type === 'similar_name') {
      await this.mergeSimilarNamedFiles(duplicate);
    }
  }

  /**
   * Merge exact content duplicates
   */
  async mergeExactDuplicates(duplicate) {
    const [primaryFile, ...duplicateFiles] = duplicate.files;
    
    // Keep the primary file, remove others
    for (const duplicateFile of duplicateFiles) {
      await this.safeDeleteFile(duplicateFile);
      this.log('INFO', `Removed exact duplicate: ${duplicateFile}`);
    }
  }

  /**
   * Merge similar named files
   */
  async mergeSimilarNamedFiles(duplicate) {
    const files = duplicate.files;
    
    // Analyze content to determine best merge strategy
    const fileContents = await Promise.all(
      files.map(async (file) => {
        try {
          const content = fs.readFileSync(file, 'utf8');
          return { file, content, size: content.length };
        } catch (error) {
          return { file, content: '', size: 0, error: error.message };
        }
      })
    );
    
    // Find the most complete file (largest size)
    const bestFile = fileContents.reduce((best, current) => 
      current.size > best.size ? current : best
    );
    
    // Merge content from other files if they have unique information
    const mergedContent = await this.mergeFileContents(fileContents, bestFile);
    
    // Write merged content to best file
    fs.writeFileSync(bestFile.file, mergedContent);
    
    // Remove other files
    for (const fileContent of fileContents) {
      if (fileContent.file !== bestFile.file) {
        await this.safeDeleteFile(fileContent.file);
        this.log('INFO', `Merged and removed: ${fileContent.file}`);
      }
    }
  }

  /**
   * Merge file contents intelligently
   */
  async mergeFileContents(fileContents, bestFile) {
    let mergedContent = bestFile.content;
    
    for (const fileContent of fileContents) {
      if (fileContent.file === bestFile.file) continue;
      
      // Extract unique functions, components, or sections
      const uniqueParts = this.extractUniqueContent(fileContent.content, mergedContent);
      
      if (uniqueParts.length > 0) {
        mergedContent += '\n\n' + uniqueParts.join('\n\n');
        this.log('INFO', `Added unique content from ${fileContent.file}`);
      }
    }
    
    return mergedContent;
  }

  /**
   * Extract unique content from a file
   */
  extractUniqueContent(newContent, existingContent) {
    const uniqueParts = [];
    
    // Split content into logical sections
    const newSections = this.splitIntoSections(newContent);
    const existingSections = this.splitIntoSections(existingContent);
    
    for (const section of newSections) {
      if (!this.sectionExists(section, existingSections)) {
        uniqueParts.push(section);
      }
    }
    
    return uniqueParts;
  }

  /**
   * Split content into logical sections
   */
  splitIntoSections(content) {
    // Split by function definitions, component definitions, etc.
    const sections = [];
    const lines = content.split('\n');
    let currentSection = '';
    
    for (const line of lines) {
      if (line.trim().startsWith('function ') || 
          line.trim().startsWith('const ') ||
          line.trim().startsWith('export ') ||
          line.trim().startsWith('import ') ||
          line.trim().startsWith('interface ') ||
          line.trim().startsWith('type ')) {
        
        if (currentSection.trim()) {
          sections.push(currentSection.trim());
        }
        currentSection = line;
      } else {
        currentSection += '\n' + line;
      }
    }
    
    if (currentSection.trim()) {
      sections.push(currentSection.trim());
    }
    
    return sections;
  }

  /**
   * Check if a section exists in existing sections
   */
  sectionExists(section, existingSections) {
    const sectionHash = crypto.createHash('md5').update(section).digest('hex');
    
    return existingSections.some(existing => {
      const existingHash = crypto.createHash('md5').update(existing).digest('hex');
      return sectionHash === existingHash;
    });
  }

  /**
   * Safely delete a file with backup
   */
  async safeDeleteFile(filePath) {
    try {
      // Create backup before deletion
      const backupPath = path.join(this.config.backupDir, path.basename(filePath) + '.backup');
      fs.copyFileSync(filePath, backupPath);
      
      // Delete the file
      fs.unlinkSync(filePath);
      
      this.log('INFO', `Safely deleted ${filePath} (backup: ${backupPath})`);
    } catch (error) {
      this.log('ERROR', `Failed to safely delete ${filePath}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Perform backup of franchise data
   */
  async performBackup() {
    const startTime = Date.now();
    
    try {
      this.log('INFO', 'Performing backup...');
      
      const backupPath = path.join(this.config.backupDir, `franchise-backup-${Date.now()}`);
      fs.mkdirSync(backupPath, { recursive: true });
      
      // Backup all franchise files
      for (const basePath of this.config.franchisePaths) {
        if (fs.existsSync(basePath)) {
          const targetPath = path.join(backupPath, path.basename(basePath));
          await this.copyDirectory(basePath, targetPath);
        }
      }
      
      // Backup scan data
      const scanDataPath = path.join(backupPath, 'scan-data.json');
      fs.writeFileSync(scanDataPath, JSON.stringify(this.scanResults, null, 2));
      
      this.scanResults.performance.backupTime = Date.now() - startTime;
      this.log('INFO', `Backup completed in ${this.scanResults.performance.backupTime}ms: ${backupPath}`);
      
    } catch (error) {
      this.log('ERROR', `Backup failed: ${error.message}`);
    }
  }

  /**
   * Copy directory recursively
   */
  async copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    
    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        await this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  /**
   * Generate scan report
   */
  async generateReport() {
    const reportPath = './reports/franchise/scan-report.json';
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.scanResults.totalFiles,
        duplicatesFound: this.scanResults.duplicates.length,
        filesMerged: this.scanResults.merged.length,
        errors: this.scanResults.errors.length
      },
      performance: this.scanResults.performance,
      details: {
        duplicates: this.scanResults.duplicates,
        merged: this.scanResults.merged,
        errors: this.scanResults.errors
      }
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.log('INFO', `Report generated: ${reportPath}`);
  }

  /**
   * Stop the auto scanner
   */
  async stop() {
    console.log('🛑 Stopping Franchise Auto Scanner...');
    
    this.isRunning = false;
    
    if (this.watcher) {
      await this.watcher.close();
    }
    
    if (this.scanTimer) {
      clearInterval(this.scanTimer);
    }
    
    if (this.backupTimer) {
      clearInterval(this.backupTimer);
    }
    
    await this.saveScanData();
    this.log('INFO', 'Franchise Auto Scanner stopped');
  }

  /**
   * Get scanner status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastScan: this.scanResults.lastScan,
      totalFiles: this.scanResults.totalFiles,
      duplicates: this.scanResults.duplicates.length,
      merged: this.scanResults.merged.length,
      errors: this.scanResults.errors.length,
      performance: this.scanResults.performance
    };
  }
}

// Auto-start the scanner
const scanner = new FranchiseAutoScanner();

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  await scanner.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  await scanner.stop();
  process.exit(0);
});

// Start the scanner
scanner.initialize().catch(error => {
  console.error('❌ Failed to start Franchise Auto Scanner:', error);
  process.exit(1);
});

// Export for use in other modules
module.exports = FranchiseAutoScanner; 