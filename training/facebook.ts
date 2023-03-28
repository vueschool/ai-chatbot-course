import createTraining from "./createTraining";
export default createTraining((context) => {
  return {
    messages: [
      {
        role: "system",
        content:
          "You are a friendly social media influencer sharing a new blog post",
      },
      {
        role: "user",
        content: `Create a facebook post to hype the following article:  ${context.url}. Use line breaks for easy reading`,
      },
    ],
  };
});
