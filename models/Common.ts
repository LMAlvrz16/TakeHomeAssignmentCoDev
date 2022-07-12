import { ElementHandle, Page } from "@playwright/test";
import { errors } from "@playwright/test";

export class Common{
    readonly page: Page

    constructor(page: Page){
        this.page = page;
    }

    // This will navigate to the specified URL.
    async GoTo(url: string, pageName: string){
        try{
            await this.page.goto(url);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to load the " + pageName+ ".\nMessage: " + e.message);
            }
        }
    }

    // Set thread sleep.
    async sleep(ms: number){
        const promise = await new Promise(resolve => setTimeout(resolve, ms));
        return promise;
    }
    
    async waitForElement(locator: string, locatorName: string, timeOut: number = 0){
        try{
            if(timeOut > 0){
                await this.page.waitForSelector(locator, {state: "visible", timeout: timeOut});
            }
            else{
                await this.page.waitForSelector(locator, {state: "visible", timeout: 90000});
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to find " + locatorName + ".\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to find " + locatorName + ".\nMessage: " + e.message);
            }
        }
    }

    // Find a particular element.
    async findElement(locator: string, locatorName: string){
        try{
            var currentValue = await this.page.$(locator);
            console.log(locatorName + " was found.");
            if(currentValue!=null){
                var elementValue =currentValue;
                return elementValue;
            }
            else{
                throw new Error("Unable to find " + locatorName + " as element is null.");
            }

        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to find " + locatorName + ".\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to find " + locatorName + ".\nMessage: " + e.message);
            }
        }
    }

    // Check if element exists
    async elementExist(locator: string, timeout: number = 0){
        var isExist = true;
        try{
            if(timeout > 0){
                await this.page.waitForSelector(locator, {state: "visible", timeout: timeout});
            }
            else{
                await this.page.waitForSelector(locator, {state: "visible", timeout: 90000});
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                isExist = false;
            }
            else{
                isExist = false;
            }
        }
        return isExist
    }

    // Click element.
    async click(locator: string, locatorName: string){
        try{
            await this.page.click(locator);
            console.log(locatorName + " was clicked.");
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to click " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to click " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Click existing element.
    async clickElement(element: ElementHandle, locatorName: string){
        try{
            await element.click();
            console.log(locatorName + " was clicked.");
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to click " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to click " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Fill up the value into the element.
    async fillUpValue(locator: string, inputValue: string, locatorName: string){
        try{
            await this.page.fill(locator, inputValue);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to fill " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to fill " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Type the value in the element.
    async typeValue(locator: string, inputValue: string, locatorName: string){
        try{
            await this.page.type(locator, inputValue);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to type " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to type " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Enter the value in the element.
    async enterValue(locator: string, inputValue: string, locatorName: string){
        try{
            await this.click(locator, locatorName);
            await this.fillUpValue(locator, "", locatorName);
            await this.typeValue(locator, inputValue, locatorName);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to enter " + inputValue + " in " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to enter " + inputValue + " in " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Select from dropdown.
    async selectFromDropdown(locator: string, selectType: string, selectValue: string, locatorName: string){
        try{
            if(selectType.toLowerCase()=="text"){
                await this.page.selectOption(locator, {label: selectValue});
            }
            else if(selectType.toLowerCase()=="value"){
                await this.page.selectOption(locator, {value: selectValue});
            }
            else{
                await this.page.selectOption(locator, {index: parseInt(selectValue)});
            }
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
                throw new Error("Unable to select " + selectValue + " from " + locatorName + "\nMessage: " + e.message);
            }
            else{
                throw new Error("Unable to enter " + selectValue + " from " + locatorName + "\nMessage: " + e.message);
            }
        }
    }

    // Get element value via HTML element
    async getElementTextviaHTML(locator: string, locatorName: string){
        try{
          var textValue = await this.page.$eval<string, HTMLSelectElement>(locator, ele => ele.value); 
          console.log(locatorName + " value: " + textValue);
        }
        catch(e){
          if(e instanceof errors.TimeoutError){
            throw new Error ("Unable to find " + locatorName + ".\nMessage: " + e);
          }
          else{
            throw new Error ("Unable to find " + locatorName + ".\nMessage: " + e);
          }
        }
  
        return textValue.toString().trim();
    }

    // Get label value.
    async getElementText(locator: string, locatorName: string){
        var textValue:any;
        try{
            var currentValue = await this.page.innerText(locator);

            if(currentValue!=null){
                textValue = currentValue.toString().trim();
            }
            console.log(locatorName + " value: " + textValue);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
            throw new Error ("Unable to find " + locatorName + ".\nMessage: " + e);
            }
            else{
            throw new Error ("Unable to find " + locatorName + ".\nMessage: " + e);
            }
        }
        return textValue.toString().trim();
    }

    // Get Attribute value.
    async getAttributeValue(locator: string, attributeName: string){
        var textValue:any;
        try{
            var currentValue = await this.page.getAttribute(locator, attributeName);

            if(currentValue!=null){
                textValue = currentValue.toString().trim();
            }
            console.log(attributeName + " value: " + textValue);
        }
        catch(e){
            if(e instanceof errors.TimeoutError){
            throw new Error ("Unable to find " + attributeName + ".\nMessage: " + e);
            }
            else{
            throw new Error ("Unable to find " + attributeName + ".\nMessage: " + e);
            }
        }
        return textValue.toString().trim();
    }
}