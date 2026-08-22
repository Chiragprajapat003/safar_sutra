// Safar-sutra Real AI Service (Google Gemini & OpenAI Integration)

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export function getStoredApiKey() {
  return (
    localStorage.getItem('safar_ai_api_key') ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.VITE_OPENAI_API_KEY ||
    ''
  );
}

export function setStoredApiKey(key) {
  if (key) {
    localStorage.setItem('safar_ai_api_key', key.trim());
  } else {
    localStorage.removeItem('safar_ai_api_key');
  }
}

/**
 * Chat with real AI using Gemini or OpenAI
 */
export async function chatWithSafarAI(userMessage, conversationHistory = []) {
  const apiKey = getStoredApiKey();

  // If no API key is provided, provide smart structured recommendation
  if (!apiKey) {
    return generateFallbackResponse(userMessage);
  }

  try {
    // Check if it's an OpenAI key (starts with sk-) or Gemini key
    if (apiKey.startsWith('sk-')) {
      const messages = [
        {
          role: 'system',
          content:
            'You are Safar AI, an expert spiritual, cultural, and global travel planner. You recommend day-wise itineraries, Aarti timings, temple corridors, hidden gems, and cost estimates. Keep your answers beautifully structured with markdown, bullet points, and emoji.',
        },
        ...conversationHistory.map((m) => ({
          role: m.sender === 'ai' ? 'assistant' : 'user',
          content: m.text,
        })),
        { role: 'user', content: userMessage },
      ];

      const res = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.7,
        }),
      });

      if (!res.ok) throw new Error(`OpenAI API error: ${res.statusText}`);
      const data = await res.json();
      return data.choices?.[0]?.message?.content || 'No response received.';
    } else {
      // Use Google Gemini API
      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: `You are Safar AI, the ultimate AI travel planner for Safar-sutra. You specialize in sacred yatras, heritage tours, authentic local dining, and global itineraries. Respond with structured day-by-day suggestions, costs in USD/INR, Aarti timings, and practical advice.\n\nUser Question: ${userMessage}`,
            },
          ],
        },
      ];

      const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });

      if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`);
      const data = await res.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Unable to parse AI response.'
      );
    }
  } catch (error) {
    console.warn('Real AI API call failed, falling back to smart engine:', error);
    return `${generateFallbackResponse(userMessage)}\n\n*(Note: Real API call failed (${error.message}). Please verify your API Key in Settings.)*`;
  }
}

/**
 * Generate a complete, structured Trip Object using Real AI
 */
export async function generateAITripPlan({ destination, days = 3, budget = 2500, interests = 'Spiritual, Heritage', travelers = 'Family' }) {
  const apiKey = getStoredApiKey();

  const prompt = `Generate a structured travel itinerary for a ${days}-day trip to ${destination} with a budget of $${budget} for ${travelers}. Interests: ${interests}.
Return ONLY valid JSON matching this exact structure:
{
  "name": "Title of Trip",
  "description": "2-3 sentences overview",
  "stops": ["City1", "City2"],
  "budget": ${budget},
  "days": [
    {
      "day": 1,
      "city": "${destination}",
      "activities": [
        {
          "name": "Activity title",
          "time": "08:00",
          "cost": 15,
          "category": "Spiritual",
          "notes": "Practical tip"
        }
      ]
    }
  ]
}`;

  if (apiKey) {
    try {
      if (apiKey.startsWith('sk-')) {
        const res = await fetch(OPENAI_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
          }),
        });
        const data = await res.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        return parsed;
      } else {
        const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        });
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return JSON.parse(text);
      }
    } catch (e) {
      console.warn('AI Trip generation error:', e);
    }
  }

  // Smart fallback generator if no API key is active
  return {
    name: `${destination} Yatra & Discovery`,
    description: `A customized ${days}-day itinerary to explore the grand temples, iconic heritage landmarks, and authentic cuisine of ${destination}.`,
    stops: [destination],
    budget: Number(budget) || 2500,
    days: Array.from({ length: Number(days) || 3 }, (_, i) => ({
      day: i + 1,
      city: destination,
      activities: [
        {
          name: i === 0 ? `Morning Darshan & Temple Corridor Walk` : `Cultural Heritage & Sightseeing Tour`,
          time: '08:30',
          cost: i === 0 ? 0 : 25,
          category: 'Spiritual',
          notes: 'Best experienced in the early morning peaceful hours.',
        },
        {
          name: `Authentic Local Thali & Regional Cuisine`,
          time: '13:00',
          cost: 20,
          category: 'Food & Dining',
          notes: 'Taste authentic satvik specialties.',
        },
        {
          name: `Sunset River Aarti & Panoramic Viewpoint`,
          time: '18:00',
          cost: 15,
          category: 'Culture',
          notes: 'Mesmerizing evening lamps and photography.',
        },
      ],
    })),
  };
}

function generateFallbackResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('ayodhya') || q.includes('varanasi') || q.includes('kashi')) {
    return `🪔 **Safar AI Ayodhya & Kashi Recommendation:**\n\n• **Day 1:** Morning Darshan at Shri Ram Janmabhoomi Mandir (Ayodhya). Afternoon at Hanuman Garhi. Evening Sarayu Aarti at Ram Ki Paidi.\n• **Day 2:** Travel to Varanasi (approx 4 hrs). Evening world-famous Dashashwamedh Ghat Ganga Aarti.\n• **Day 3:** Dawn boat ride from Assi Ghat to Manikarnika, followed by Darshan at Kashi Vishwanath Corridor.\n\n✨ *Enter your Gemini/OpenAI API key in Settings for infinite real-time custom plans!*`;
  }
  return `✨ **Safar AI Custom Plan for "${query}":**\n\n1. **Best Season:** October to March for pleasant temple visits and sightseeing.\n2. **Recommended Stay:** 3 to 5 days to cover all major sanctums, local bazaars, and heritage monuments without rush.\n3. **Estimated Budget:** ~$60 to $100 per day for comfortable 4-star stay, satvik meals, and private cab transfers.\n\n💡 *Tip: Add your Gemini or OpenAI API key in the chat settings above to unlock live generative travel AI!*`;
}
