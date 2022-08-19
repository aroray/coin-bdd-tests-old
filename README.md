# Job Interview Framework
This framework is developed for purpose of completing task in Job Interview

## Table of Contents
1, [Getting set up](#Getting set up)<br />
    1.1 [Installing node](#Installing node)<br />
    1.2 [Pulling the latest copy of the repo](#Pulling the latest copy of the repo)<br />
    1.3 [Installing `npm` packages](#installing-npm-packages)<br />
    1.4 [Add folders](#Add folders)<br />
2, [Running the framework](#Running the framework)<br />

## Using the Framework

### Getting set up
Before you dive into running the framework, make sure you follow below steps to make sure system is set up correctly

#### Installing node
To run this framework, you will need to be running at least version 17 of node. 

#### Pulling the latest copy of the repo
Repo is available Publicly on GitHub. Link is provided in email

#### Installing `npm` packages
Once the repo has been downloaded onto your machine, in your CLI application change directory into 'coin-bdd-tests' 
and run 'npm install'. All of necessary packages needed to run the framework will be installed onto your machine

#### Add folders 
Some files are not committed to repo and only used to store temp file when running tests locally. For example 'errorShots' 
folder will save screenshots in event test fails
Add below files/folder to root of project -
- errorShots

#### Running the framework
Once all of the above steps have been performed, issue the below command to run the framework:

``````
npm run test

``````

Please note that 'test' is name of script 'npx wdio configs/main@conf.ts' therefore you don't need to copy entire command
to run tests with config file 'main@conf.ts' (located in 'configs' folder). 
Please see 'scripts' section in 'package.json'


