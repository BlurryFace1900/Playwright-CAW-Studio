import * as fs from 'fs';

// Step 1: Extract data from the dynamic web table
export async function extractTableData(table): Promise<any[]> {


    // Get all rows in the table
    const rows = await table.locator('tr').all();
    const tableData: any[] = [];

    const heading = await rows[0].locator('th').all();
    // Loop through rows and extract cell data
    for (const row of rows.slice(1)) {
        const cells = await row.locator('td').all(); // Select all columns/cells
        const rowData: any = {};

        for (let i = 0; i < cells.length; i++) {
            const cellText = await cells[i].innerText(); // Extract cell text
            const parsedCellText = parseFloat(cellText);
            
            rowData[await heading[i].innerText()] = !isNaN(parsedCellText) ? parsedCellText : cellText;  // Save cell data as key-value pairs
        }
        tableData.push(rowData);
    }

    return tableData;
}