import { errors, expect, Page } from "@playwright/test";
import { Common } from "./Common";
import { URL } from "../data/users";

export class PolygonScanPage extends Common{
    readonly page: Page
  
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    public contractAddress="//a[@class='text-truncate d-block mr-2']";
    public maxSupply = "//div[@id='readCollapse6']//div//form//div[@class='form-group']//a";
    public contractsTab = "//a[@href='#contracts']";
    
    async Open(){
        try{
            await this.GoTo(URL.PolygonScanPage, "Polygon Scan Page");
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }
        }
    }

    async getContractAddress(){
        const contractAddress = await this.getElementText(this.contractAddress,"Contract Address");
        return contractAddress;
    }

    async VerifyContractAddress(actual: string, expected: string){
        console.log("ACTUAL ADDRESS: "+actual);
        console.log("EXPECTED ADDRESS: "+expected);
        if(actual != expected){
            throw new Error ("Actual Adrress "+actual+"IS NOT EQUAL to Expected contract address "+expected)
        }
    }

    async VerifyMaxSupply(){
        var initialAttributeValue = await this.getAttributeValue(this.maxSupply, "href");
        var attributeValue = initialAttributeValue.replace("https://polygonscan.com/unitconverter?wei=","")
        console.log("Max Supply: "+attributeValue);
    }

    async ClickContractTab(){
        await this.click(this.contractsTab,"Contract Tab");
    }
}