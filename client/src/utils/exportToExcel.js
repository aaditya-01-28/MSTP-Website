/**
 * Export JSON array data to a downloadable CSV / Excel file.
 * Includes UTF-8 BOM (\uFEFF) so Microsoft Excel opens it directly with proper column formatting.
 * @param {Array<Object>} data Array of objects to export
 * @param {string} filename Output file name without extension
 * @param {Array<string>} fields Optional list of keys to include as columns
 */
export const exportToExcel = (data, filename = 'export', fields = null) => {
  if (!data || !data.length) {
    alert('No data available to export.');
    return;
  }

  // Determine headers
  const headers = fields || Object.keys(data[0]).filter(k => k !== '__v' && k !== '_id');

  // Build CSV rows
  const csvRows = [];
  
  // Header row
  csvRows.push(headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(','));

  // Data rows
  data.forEach(row => {
    const values = headers.map(header => {
      let val = row[header];
      if (val === undefined || val === null) {
        val = '';
      } else if (typeof val === 'object') {
        val = JSON.stringify(val);
      } else if (typeof val === 'string' && val.startsWith('data:image')) {
        val = '[Image Data]';
      }
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  });

  // Create Blob with UTF-8 BOM so Excel displays unicode characters cleanly
  const csvContent = '\uFEFF' + csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
