# Case description
Consider that a customer approached you with a need to better manage the sales occurring in
his company/department. In the present day, this customer has to gather information from
several excel spreadsheets, rank and consolidate it in one of his own every week, so he can
pay bonuses according to sales rank. To begin tackling the problem, he suggests that the main
priorities to him are:

1. To have an easy and standardized way for sellers to register their sales (avoiding his
tedious work every week)
2. To have access to a Main Sales List where everyone using the app can see all the sales
registered and ranked by the seller with the highest amount sold.
3. The ability to edit or remove a specific sale that might eventually be added with wrong
data.

## 1. Logic prototyping
Considering that scenario, build a script, implementing the seller's ranking logic, where the user,
from the terminal, inputs a Sale item and the output is printed as an updated list of all sales
registered, sorted by sellers with the highest to lowest amount sold.
Premises:
- A Sale item must have at least the following attributes: (Seller Name, Customer Name,
Date of Sale, Sale Item Name, Sale Value)
- Five Sellers should be registered and no Sale Item can be registered with a different
seller name other than the five available.
- Script must run in the terminal only
- Script should be delivered as a Git repository hosted in GitHub/GitLab/BitBucket with
instructions on how to execute it.

## 2. Development Planning
Considering the three main priorities previously described in Case description, prepare two or
three slide (to be delivered in pdf or Google Presentation) pages answering the following:
- What technologies you would use for the front-end, back-end and database and why did
you choose them to build this prototype?
- How much time would you estimate for building this prototype, considering you're the
only developer working on it?

# How to run 

## 1. Using the binary 

You can run the program using the binaries for you system (Mac, Windows, Linux) located in the [latest release of this repository](https://github.com/SouzaGabrielC/shopee-tech-test/releases/latest).

Make sure you have the /json folder at the same level as you binary.

Enter the terminal 

Linux: 
```bash
$ ./sales-app
```

Windows: 
```bash
$ .\sales-app.exe
```

Mac: 
```bash
$ ./sales-app
```

## 2. Using local installed NodeJS 

First make sure you have the NodeJS 14.17.6 version installed.

1. Run the `npm install` or `yarn install` to install all dependencies needed for the project to run.
2. Run `npm start` or `yarn start`


