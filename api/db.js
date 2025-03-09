import fs from "fs";
import path from "path";
import data from "../server/data.json";

const filePath = path.join(process.cwd(), "server", "data.json");

export default function handler(req, res) {
  // 设置 CORS 头
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 处理 OPTIONS 请求
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(data.ka);
  }

  if (req.method === "POST") {
    try {
      const { type, money, date, useFor } = req.body;

      if (!type || !money || !date || !useFor) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // 生成新 ID
      //const newId = data.ka.length ? data.ka[data.ka.length - 1].id + 1 : 1;
      const newId =
        data.ka.reduce((cum, cur) => (cur.id > cum ? cur.id : cum), 0) + 1;
      const newRecord = { id: newId, type, money, date, useFor };

      // 更新数据
      data.ka.push(newRecord);

      // **写入文件 (Vercel 不能修改文件，需用数据库)**
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return res.status(201).json(newRecord);
    } catch (error) {
      return res.status(500).json({ error: "Failed to save data" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
