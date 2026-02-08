import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function droneController(req, res){
    try {
        const filePath = path.join(__dirname, "../data/products.json");
        const raw = fs.readFileSync(filePath, "utf-8");
        const drones = JSON.parse(raw);

        res.json({ items: drones})
    } catch (error) {
        res.status(500).json({ error: "Failed to load the droens data"});
    }
};