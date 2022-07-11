import dotenv from 'dotenv';
dotenv.config();

const envStringVar = (name: string): string => {
    const value = process.env[name];
    if (value === undefined){
        throw new Error(`Missing environment variable ${name}`);
    }
    return value;
}

const envIntVar = (name:string):number => {
    const value = envStringVar(name);
    return parseInt(value);
}

export {envIntVar,envStringVar};