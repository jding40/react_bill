import data from "../../server/data.json";

export default function handler(req, res) {
  res.status(200).json(data.ka);
}
