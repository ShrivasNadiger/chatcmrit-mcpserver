import fs from 'fs';
import path from "path";
import { aboutCmritData } from "../types/aboutCmritDataTypes.js";


function loadData():aboutCmritData {
  const filePath = path.join(__dirname, "./resources/aboutCmrit.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return data;
}

export function getInfoCmrit<k extends keyof aboutCmritData>(key: k): aboutCmritData[k] | string{
  const loadedData:aboutCmritData= loadData();
  return loadedData[key]?loadedData[key]:`No Data Found in this tool about the ${key}`;
}