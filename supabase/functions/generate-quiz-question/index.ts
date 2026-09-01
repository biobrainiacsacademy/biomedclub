const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, lessonUrl, avoid = [], count = 3 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI key missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const n = Math.min(Math.max(Number(count) || 3, 1), 5);
    const avoidList = (Array.isArray(avoid) ? avoid : []).slice(-40);

    const prompt = `Write ${n} brand new multiple choice review questions for high school biomedical science students.
Lesson topic: "${topic}".
Rules:
- Each question is short and clear, with exactly 4 answer options.
- Exactly one option is correct, and the correct option index must vary across questions.
- Every wrong option must be realistic and genuinely tempting, a real biology idea that a student could believe.
- All four options must be about the same length, within a few words of each other. Never make the correct option the longest or the most detailed one. Do not pad the correct option with extra explanation.
- Keep every option short, roughly 4 to 9 words.
- Add a one sentence hint that nudges without giving the answer.
- Add a simple, in depth explanation that says why the right answer is right and why each wrong option is wrong.
- Never use hyphens or em dashes anywhere in the text. Use commas or periods instead.
- Do not repeat any of these already used questions: ${avoidList.join(" | ") || "none yet"}.`;


    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a precise biomedical science quiz writer. Always call the tool." },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "emit_questions",
              description: "Return the generated quiz questions",
              parameters: {
                type: "object",
                properties: {
                  questions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        question: { type: "string" },
                        options: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 },
                        correct: { type: "integer", minimum: 0, maximum: 3 },
                        hint: { type: "string" },
                        explanation: { type: "string" },
                      },
                      required: ["question", "options", "correct", "hint", "explanation"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["questions"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "emit_questions" } },
      }),
    });

    if (res.status === 429 || res.status === 402) {
      return new Response(JSON.stringify({ error: "rate_limited", questions: [] }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!res.ok) {
      const text = await res.text();
      console.error("AI gateway error", res.status, text);
      return new Response(JSON.stringify({ error: "ai_error", questions: [] }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    const parsed = args ? JSON.parse(args) : { questions: [] };
    const clean = (parsed.questions || [])
      .filter(
        (q: { options?: unknown[]; correct?: number }) =>
          Array.isArray(q.options) && q.options.length === 4 && typeof q.correct === "number",
      )
      .map((q: Record<string, unknown>, i: number) => ({
        id: `ai-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`,
        topic,
        lessonUrl,
        question: String(q.question),
        options: (q.options as string[]).map(String),
        correct: Math.min(Math.max(Number(q.correct), 0), 3),
        hint: String(q.hint ?? ""),
        explanation: String(q.explanation ?? ""),
      }));

    return new Response(JSON.stringify({ questions: clean }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-quiz-question failed", e);
    return new Response(JSON.stringify({ error: "unexpected", questions: [] }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
