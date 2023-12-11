const { driver, createSession, deleteSession } = require('appium');

async function main() {
  await createSession({
    capabilities: {
      platformName: 'Android',
      deviceName: 'POCO X3 Pro',
      app: '/path/to/your/app.apk',
    },
  });

  await driver.startActivity({
    appPackage: 'com.miui.calculator',
    appActivity: 'com.miui.calculator.cal.CalculatorActivity',
  });

  // Dodajte svoje testne korake ovdje

  await driver.quit();
  await deleteSession();
}

main();