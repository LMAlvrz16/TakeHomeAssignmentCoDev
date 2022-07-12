import { errors, Page } from "@playwright/test";
import { Common } from "./Common";
import { URL } from "../data/users";

export class CoinMarketPage extends Common{
    readonly page: Page
  
    constructor(page: Page){
        super(page);
        this.page = page;
    }

    public contractAddress="//div[@class='content']//a";
    
    async Open(){
        try{
            await this.GoTo(URL.CoinMarketPage, "Coin Market Page");
        }catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error(e.stack);
            }
        }
    }

    async getContractAddressThenStore(){
        var initialAttributeValue = await this.getAttributeValue(this.contractAddress, "href");
        var attributeValue = initialAttributeValue.replace("https://polygonscan.com/token/","")
        console.log("Contract Address: "+attributeValue);
        return attributeValue;
    }
}