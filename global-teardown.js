const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function globalTeardown() {
  try {
    const reportPath = path.join(process.cwd(), 'playwright-report', 'index.html');
    
    // Espera a que el reporte se haya creado
    if (fs.existsSync(reportPath)) {
      // Abre el reporte usando el navegador predeterminado del sistema
      if (process.platform === 'win32') {
        execSync(`start "" "${reportPath}"`, { stdio: 'ignore' });
      } else if (process.platform === 'darwin') {
        execSync(`open "${reportPath}"`, { stdio: 'ignore' });
      } else {
        execSync(`xdg-open "${reportPath}"`, { stdio: 'ignore' });
      }
    }
  } catch (error) {
    // Silenciosamente falla si no se puede abrir
  }
}

module.exports = globalTeardown;
