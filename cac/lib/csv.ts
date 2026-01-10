// lib/csv.ts

/**
 * Converts an array of objects to a CSV string.
 * @param data Array of objects to convert
 * @param filename Optional filename (not used in converting, but handy context)
 * @returns CSS string
 */
export function convertToCSV(data: any[]): string {
    if (!data || data.length === 0) {
        return "";
    }

    const header = Object.keys(data[0]);
    const headerRow = header.join(",");

    const rows = data.map((row) => {
        return header
            .map((fieldName) => {
                let value = row[fieldName] === null || row[fieldName] === undefined ? "" : row[fieldName];
                value = value.toString().replace(/"/g, '""'); // Escape double quotes
                // If value contains comma, newline or double quote, wrap in quotes
                if (/[",\n]/.test(value)) {
                    value = `"${value}"`;
                }
                return value;
            })
            .join(",");
    });

    return [headerRow, ...rows].join("\r\n");
}
