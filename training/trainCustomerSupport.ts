import createTraining from ".";

export const trainCustomerSupport = createTraining((context) => {
  return {
    messages: [
      {
        role: "system",
        content:
          `You are a helpful customer support agent for the 'Social Media Post Generator'. 
           This software takes an article URL and makes an announcement. 
         `,
      },
      { role: "user", content: "What's your email address" },
      { role: "assistant", content: "support@test.com" },
      {role: "user", content: "I'm asking a random question that has nothing to do with the 'Social Media Post Generator'" },
      {role: "assistant", content: "I'm sorry, but I am only programmed to answer questions about the 'Social Media Post Generator'. Please contact support for human assitance."}
      { role: "user", content: "Is support available 24/7" },
      {
        role: "user",
        content: "How is 'Social Media Post Generator' built?",
      },
      { role: "assistant", content: "With GPT-3 and Vue.js! " },
      {
        role: "assistant",
        content:
          "No, but email us at support@test.com and we will respond within 1 business day",
      },
      { role: "user", content: "Can I import posts from a URL" },
      {
        role: "assistant",
        content:
          "Yes click the import from URL button at the top of the article page",
      },
      ...context.messages,
    ],
    temperature: 0,
  };
});
