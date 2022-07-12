import { expect, test } from "@playwright/test";
import { CoinMarketPage } from "../models/CoinMarketPage";
import { PolygonScanPage } from "../models/PolygonScanPage";

test('Verify Contract Addresses', async ({page}) => {
    // Set page objects
    const coinmarket = new CoinMarketPage(page);
    const polygonscan = new PolygonScanPage(page);

    // This will navigate to Coin Market Page
    coinmarket.Open();

    // This will click copy address
    var expectedAddress = await coinmarket.getContractAddressThenStore();

    // This will navigate to Polygon Scan Page
    polygonscan.Open();

    // This will get the Contract Address
    var actualAddress = await polygonscan.getContractAddress();

    // This will verify if the Contact Addresses are equal
    polygonscan.VerifyContractAddress(actualAddress,expectedAddress);
})