import { expect, test } from "@playwright/test";
import { CoinMarketPage } from "../models/CoinMarketPage";
import { PolygonScanPage } from "../models/PolygonScanPage";

test('Verify Max Supply', async ({page}) => {
    // Set page objects
    const polygonscan = new PolygonScanPage(page);

    // This will navigate to Polygon Scan Page
    await polygonscan.Open();

    // This will click the Contracts Tab
    await polygonscan.ClickContractTab();

    // This will verify the Max Supply
    var maxSupply = await polygonscan.VerifyMaxSupply();
    console.log(maxSupply);
})