const fs = require('fs');
try {
    // UTF-16LE is the correct encoding for PowerShell > redirection
    const content = fs.readFileSync('server_log.txt', 'utf16le');
    const lines = content.split(/\r?\n/);
    console.log(`Log lines: ${lines.length}`);

    lines.slice(80).forEach((line, idx) => {
        console.log(`[${80 + idx}] ${line.replace(/\0/g, '').trim()}`);
    });

} catch (e) {
    console.error("Reader Error:", e.message);
}
