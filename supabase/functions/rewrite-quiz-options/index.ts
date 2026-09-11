const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OPTION_PROMPT = `Rebalance the answer options for these high school biomedical quiz questions.
For each item you get the question, the correct answer, and the current wrong options.
Rules:
- Keep the meaning of the correct answer, but rewrite it to be short and plain, roughly 4 to 9 words.
- Rewrite the three wrong options so each one is a realistic, tempting biology idea that a student could believe. No silly or obviously absurd choices.
- All four options must be within about three words of each other in length. The correct option must never be the longest.
- Never use hyphens or em dashes. Use commas or periods instead.
- Return the same ids, with "correct" holding the rewritten correct answer text and "wrong" holding exactly three rewritten wrong options.`;

const EXPLAIN_PROMPT = `Write a hint and an explanation for each high school biomedical quiz question.
For each item you get the question, all four options, and the index of the correct one.
Rules:
- The hint is one sentence that nudges without giving the answer away.
- The explanation is simple but in depth. It says why the correct option is right and briefly why each of the other three options is wrong, using the exact option wording given.
- Never use hyphens or em dashes. Use commas or periods instead.
- Return the same ids.`;

const REVIEW_PROMPT = `You are proofreading and fact checking high school biomedical quiz questions.
For each item you get the id, topic, question, four options, the index of the correct option, hint, and explanation.
Check for: factual accuracy, a single clearly correct answer, wrong options that are plausible but definitely wrong, correct grammar, spelling, capitalization, and clear wording.
Rules:
- If the item is already accurate and well written, return it with changed set to false and repeat the original fields.
- If anything is inaccurate, ambiguous, ungrammatical, or confusing, fix it and set changed to true.
- Keep the same subject matter and difficulty. Keep all four options within about three words of each other in length, and never make the correct option the longest.
- Questions end with a question mark. Options are short noun phrases or clauses, roughly 4 to 9 words, with consistent style and no trailing periods.
- The hint is one sentence that nudges without giving away the answer. The explanation says why the correct option is right and briefly why each other option is wrong.
- Never use hyphens or em dashes. Use commas or periods instead.
- Always return every id you were given.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, mode = "options" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI key missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const explain = mode === "explain";
    const review = mode === "review";
    const prompt = `${review ? REVIEW_PROMPT : explain ? EXPLAIN_PROMPT : OPTION_PROMPT}

Items:
${JSON.stringify(items)}`;

    const reviewSchema = {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              changed: { type: "boolean" },
              question: { type: "string" },
              options: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 },
              correct: { type: "integer", minimum: 0, maximum: 3 },
              hint: { type: "string" },
              explanation: { type: "string" },
              note: { type: "string" },
            },
            required: ["id", "changed", "question", "options", "correct", "hint", "explanation", "note"],
            additionalProperties: false,
          },
        },
      },
      required: ["items"],
      additionalProperties: false,
    };

    const schema = review
      ? reviewSchema
      : explain
      ? {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  hint: { type: "string" },
                  explanation: { type: "string" },
                },
                required: ["id", "hint", "explanation"],
                additionalProperties: false,
              },
            },
          },
          required: ["items"],
          additionalProperties: false,
        }
      : {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  correct: { type: "string" },
                  wrong: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 3 },
                },
                required: ["id", "correct", "wrong"],
                additionalProperties: false,
              },
            },
          },
          required: ["items"],
          additionalProperties: false,
        };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a precise quiz editor. Always call the tool." },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "emit_items",
              description: "Return the edited quiz fields",
              parameters: schema,
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "emit_items" } },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("AI gateway error", res.status, text);
      return new Response(JSON.stringify({ error: "ai_error", items: [] }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    const parsed = args ? JSON.parse(args) : { items: [] };
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("rewrite-quiz-options failed", e);
    return new Response(JSON.stringify({ error: "unexpected", items: [] }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
