const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '', // This is the default and can be omitted
});

async function callForHelp(prompt) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4",
    });
  
    console.log(completion.choices[0]);
  }
  
module.exports = {
    callForHelp
};
