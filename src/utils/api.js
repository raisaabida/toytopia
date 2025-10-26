import axios from "axios";

export const JSON_URL =
  "https://raw.githubusercontent.com/your-username/your-repo/main/src/data/toys.json"; // replace if hosted elsewhere

export const fetchToys = async () => {
  try {
    const res = await axios.get(JSON_URL);
    return res.data;
  } catch (err) {
    const local = await import("../data/toys.json");
    return local.default;
  }
};

export const fetchToyById = async (id) => {
  const toys = await fetchToys();
  return toys.find((t) => String(t.toyId) === String(id));
};
