#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.italic.bold.greenBright(`\n|||||||||||||||||||||||||||||||||||||||||||||||||||
\n\t\tMSH CLI Bank Ltd.\n
\n\tPlease select your required option\n
\n|||||||||||||||||||||||||||||||||||||||||||||||||||\n`));
///customer
class Customer {
    fullName;
    age;
    gender;
    mobNumber;
    accoNumber;
    balance;
    constructor(a, b, c, d, e, f) {
        this.fullName = a;
        this.age = b;
        this.gender = c;
        this.mobNumber = d;
        this.accoNumber = e;
        this.balance = f;
    }
}
class myBank {
    customers = [];
    async createAcc() {
        const { fullName, Age, Gender, mobilenumber, accountNumber, Balance } = await inquirer.prompt([
            {
                name: "fullName",
                type: "input",
                message: chalk.italic.bold.blueBright("Enter your Full Name: "),
            },
            {
                name: "Age",
                type: "input",
                message: chalk.italic.bold.blueBright("Enter your Age: "),
            },
            {
                name: "Gender",
                type: "input",
                message: chalk.italic.bold.blueBright("Enter your Gender (M/F): "),
            },
            {
                name: "mobilenumber",
                type: "input",
                message: chalk.italic.bold.blueBright("Enter your Mobile Number: "),
            },
            {
                name: "accountNumber",
                type: "input",
                message: chalk.italic.bold.blueBright("Enter your Account Number: "),
            },
            {
                name: "Balance",
                type: "input",
                message: chalk.italic.bold.blueBright("Add Balance to your Account: "),
            },
        ]);
        const cus = new Customer(fullName, Age, Gender, mobilenumber, accountNumber, parseFloat(Balance));
        this.customers.push(cus);
        console.log(chalk.italic.bold.yellow(`\n Congratulations ${cus.fullName}, your account has been created successfully.\n`));
    }
    // Details //
    async details() {
        const { AccountNumber } = await inquirer.prompt({
            name: "AccountNumber",
            type: "input",
            message: "Enter your Account Number: ",
        });
        const cus = this.customers.find((x) => x.accoNumber == AccountNumber);
        if (cus) {
            console.log(chalk.italic.bold.yellowBright(`Account Details :
            Name: ${cus.fullName} 
            Age: ${cus.age}
            Gender: ${cus.gender}
            MobileNo: ${cus.mobNumber}
            AccountNumber: ${cus.accoNumber}
            Balance: ${cus.balance}`));
        }
        else {
            console.log(chalk.italic.bold.red("ACCOUNT NOT FOUND!"));
        }
    }
    // Deposit Amount //
    async debit() {
        const { accountNumber, amount } = await inquirer.prompt([
            {
                type: "input",
                name: "accountNumber",
                message: chalk.bold.magenta("Enter your Account Number:"),
            },
            {
                type: "input",
                name: "amount",
                message: chalk.bold.magenta("Enter Amount to Debit:"),
            },
        ]);
        const cus = this.customers.find((z) => z.accoNumber === accountNumber);
        if (cus) {
            if (cus.balance >= parseFloat(amount)) {
                cus.balance -= parseFloat(amount);
                console.log(chalk.bold.italic.green(`\nDebited ${amount} from Account # ${accountNumber}. New Account Balance: ${cus.balance}.\n`));
            }
            else {
                console.log(chalk.bold.red("Insufficient Funds"));
            }
        }
        else {
            console.log(chalk.red.bold("Account not found:"));
        }
    }
    //// Add Amount  ///
    async credit() {
        const { accountNumber, amount } = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "input",
                message: "Enter your account Number :",
            },
            {
                name: "amount",
                type: "input",
                message: "Enter amount to credit:",
            },
        ]);
        const cus = this.customers.find((z) => z.accoNumber == accountNumber);
        if (cus) {
            cus.balance += parseFloat(amount);
            console.log(chalk.bold.italic.magenta(`\n Credited ${amount} to account ${accountNumber}. New balance: ${cus.balance} \n`));
        }
        else {
            console.log(chalk.italic.bold.red("ACCOUNT NOT FOUND!"));
        }
    }
    async start() {
        while (true) {
            const { Choices } = await inquirer.prompt({
                name: "Choices",
                type: "list",
                message: "Select an option",
                choices: [
                    "Create New Account",
                    "View Account Details",
                    "Debit",
                    "Credit",
                    "Exit",
                ],
            });
            if (Choices === "Create New Account") {
                await this.createAcc();
            }
            else if (Choices === "View Account Details") {
                await this.details();
            }
            else if (Choices === "Debit") {
                await this.debit();
            }
            else if (Choices === "Credit") {
                await this.credit();
            }
            else if ("Exit") {
                console.log(chalk.magentaBright.bold.italic("Thank you for using MSH CLI Bank Ltd."));
                process.exit();
            }
        }
    }
}
const a = new myBank();
a.start();
