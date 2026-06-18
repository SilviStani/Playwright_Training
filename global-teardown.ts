import { chromium } from '@playwright/test';

async function globalTeardown() {
  // Abre automáticamente el reporte HTML después de que terminen los tests
  const browser = await chromium.launch();
  const context = await browser.createContext();
  const page = await context.newPage();
  
  const reportPath = 'file://' + process.cwd().replace(/\\/g, '/') + '/playwright-report/index.html';
  
  await page.goto(reportPath);
  
  // Mantiene el navegador abierto (opcional)
  // Si quieres que se cierre automáticamente, descomenta la próxima línea
  // await browser.close();
}

export default globalTeardown;
