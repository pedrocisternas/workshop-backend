import express from "express";
import generateRecipe from "./ai.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://congenial-space-carnival-p6q4xxg96qq3r676-3000.app.github.dev',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

app.post("/recipes", async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Los ingredientes deben ser una lista" });
    }
    const recipe = await generateRecipe(ingredients);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/", (req, res) => {
  res.send("Todo funcionando");
});

app.listen(port, () => {
  console.log(`App corriendo en el puerto ${port}`);
});
