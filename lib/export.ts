// Export functionality for EMO system

export interface ExportOptions {
  format: 'csv' | 'excel' | 'json' | 'pdf';
  filename?: string;
  includeCharts?: boolean;
  compress?: boolean;
}

export interface ExportData {
  products?: any[];
  orders?: any[];
  complaints?: any[];
  analytics?: any;
}

// Export products
export const exportProducts = async (
  products: any[],
  format: ExportOptions['format'],
  options?: ExportOptions
) => {
  const filename = options?.filename || `emo-products-${new Date().toISOString().split('T')[0]}`;

  switch (format) {
    case 'csv':
      return exportToCSV(products, filename, 'products');
    case 'excel':
      return exportToExcel(products, filename, 'products');
    case 'json':
      return exportToJSON(products, filename);
    case 'pdf':
      return exportToPDF(products, filename, 'products');
    default:
      throw new Error('Unsupported format');
  }
};

// Export orders
export const exportOrders = async (
  orders: any[],
  format: ExportOptions['format'],
  options?: ExportOptions
) => {
  const filename = options?.filename || `emo-orders-${new Date().toISOString().split('T')[0]}`;

  switch (format) {
    case 'csv':
      return exportToCSV(orders, filename, 'orders');
    case 'excel':
      return exportToExcel(orders, filename, 'orders');
    case 'json':
      return exportToJSON(orders, filename);
    case 'pdf':
      return exportToPDF(orders, filename, 'orders');
    default:
      throw new Error('Unsupported format');
  }
};

// Export complaints
export const exportComplaints = async (
  complaints: any[],
  format: ExportOptions['format'],
  options?: ExportOptions
) => {
  const filename = options?.filename || `emo-complaints-${new Date().toISOString().split('T')[0]}`;

  switch (format) {
    case 'csv':
      return exportToCSV(complaints, filename, 'complaints');
    case 'excel':
      return exportToExcel(complaints, filename, 'complaints');
    case 'json':
      return exportToJSON(complaints, filename);
    case 'pdf':
      return exportToPDF(complaints, filename, 'complaints');
    default:
      throw new Error('Unsupported format');
  }
};

// Export analytics
export const exportAnalytics = async (
  analyticsData: any,
  format: ExportOptions['format'],
  options?: ExportOptions
) => {
  const filename = options?.filename || `emo-analytics-${new Date().toISOString().split('T')[0]}`;

  switch (format) {
    case 'csv':
      return exportToCSV(analyticsData, filename, 'analytics');
    case 'excel':
      return exportToExcel(analyticsData, filename, 'analytics');
    case 'json':
      return exportToJSON(analyticsData, filename);
    case 'pdf':
      return exportToPDF(analyticsData, filename, 'analytics');
    default:
      throw new Error('Unsupported format');
  }
};

// CSV Export
const exportToCSV = (data: any[], filename: string, type: string) => {
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers
        .map(header => {
          const value = row[header];
          // Escape commas and quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(',')
    ),
  ].join('\n');

  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
};

// Excel Export
const exportToExcel = (data: any[], filename: string, type: string) => {
  // For Excel export, we'll use a simple CSV format that Excel can open
  // In a real implementation, you'd use a library like xlsx
  exportToCSV(data, filename, type);
};

// JSON Export
const exportToJSON = (data: any, filename: string) => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
};

// PDF Export
const exportToPDF = (data: any, filename: string, type: string) => {
  // For PDF export, we'll create a simple HTML table and convert it
  // In a real implementation, you'd use a library like jsPDF or puppeteer

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>EMO ${type.charAt(0).toUpperCase() + type.slice(1)} Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h1 { color: #333; }
      </style>
    </head>
    <body>
      <h1>EMO ${type.charAt(0).toUpperCase() + type.slice(1)} Report</h1>
      <p>Generated on: ${new Date().toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            ${Object.keys(data[0] || {})
              .map(key => `<th>${key}</th>`)
              .join('')}
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              row =>
                `<tr>${Object.values(row)
                  .map(value => `<td>${value}</td>`)
                  .join('')}</tr>`
            )
            .join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  downloadFile(htmlContent, `${filename}.html`, 'text/html');
};

// Download file helper
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Bulk export multiple data types
export const bulkExport = async (
  data: ExportData,
  format: ExportOptions['format'],
  options?: ExportOptions
) => {
  const results = [];

  if (data.products) {
    try {
      await exportProducts(data.products, format, {
        ...options,
        filename: `${options?.filename || 'emo'}-products`,
      });
      results.push('Products exported successfully');
    } catch (error) {
      results.push(`Products export failed: ${error}`);
    }
  }

  if (data.orders) {
    try {
      await exportOrders(data.orders, format, {
        ...options,
        filename: `${options?.filename || 'emo'}-orders`,
      });
      results.push('Orders exported successfully');
    } catch (error) {
      results.push(`Orders export failed: ${error}`);
    }
  }

  if (data.complaints) {
    try {
      await exportComplaints(data.complaints, format, {
        ...options,
        filename: `${options?.filename || 'emo'}-complaints`,
      });
      results.push('Complaints exported successfully');
    } catch (error) {
      results.push(`Complaints export failed: ${error}`);
    }
  }

  if (data.analytics) {
    try {
      await exportAnalytics(data.analytics, format, {
        ...options,
        filename: `${options?.filename || 'emo'}-analytics`,
      });
      results.push('Analytics exported successfully');
    } catch (error) {
      results.push(`Analytics export failed: ${error}`);
    }
  }

  return results;
};

// Import functionality
export const importData = async (file: File, type: 'products' | 'orders' | 'complaints') => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = event => {
      try {
        const content = event.target?.result as string;
        let data;

        if (file.name.endsWith('.json')) {
          data = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          data = parseCSV(content);
        } else {
          reject(new Error('Unsupported file format'));
          return;
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));

    if (file.name.endsWith('.json')) {
      reader.readAsText(file);
    } else if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reject(new Error('Unsupported file format'));
    }
  });
};

// Parse CSV content
const parseCSV = (content: string) => {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: any = {};

      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      data.push(row);
    }
  }

  return data;
};
