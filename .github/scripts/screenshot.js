const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const url = "https://profile-summary-for-github.com/user/Sigmanor";
  await page.goto(url, { waitUntil: "networkidle2" });

  const dirPath = path.join(__dirname, "../../assets");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, "profile-summary.png");
  await page.screenshot({ path: filePath, fullPage: true });

  await browser.close();
  console.log("✅ Screenshot saved:", filePath);
})();
