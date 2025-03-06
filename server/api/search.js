export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = `https://parkos.nl/ajax/locationSearchJSON/?${new URLSearchParams(query)}`;
  //  const newurl = `https://mpl-bff.parkos.io/assignment-offers/?${new URLSearchParams(query)}`;
  try {
    const response = await $fetch.raw(url);
    return response._data
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
});
