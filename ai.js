import openai from './config/openai.js';

const generateRecipe = async (ingredients) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Eres un chef que crea recetas sanas y nutritivas. Proporciona recetas breves en texto plano, máximo 100 palabras, sin formato especial."
      },
      {
        role: "user", 
        content: `Genera una receta breve usando: ${ingredients.join(", ")}`
      }
    ]
  });

  return response.choices[0].message.content;
};

export default generateRecipe;