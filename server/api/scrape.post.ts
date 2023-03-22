export default defineEventHandler(async (event) => {
  const { url } = await readBody(event);
  const page = await $fetch(url);
  return {
    page,
  };
});
