import mysql from "mysql2";
import { config } from "./config";

const pool = mysql.createPool(config).promise();

export default pool;
