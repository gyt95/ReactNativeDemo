const key = '1648651ec05b4599bd766969d43dbde8'
const cityLocation = '101280101'

export const baseRequest = async (url: string) => {
  try {
    const res = await (await fetch(url)).json()  // default method is GET request
    if (res.code === '200') return res;
    return null;
  } catch (err) {
    console.log('Fetch Error!', err);
  }
}

export const getCity = async () => {
  const url = `https://geoapi.qweather.com/v2/city/lookup?key=${key}&location=${cityLocation}`
  const res = await baseRequest(url);
  const { location }: any = res;
  return location;
}
export const getWeather = async () => {
  const url = `https://devapi.qweather.com/v7/weather/now?key=${key}&location=${cityLocation}`
  const res = await baseRequest(url);
  const weather: any = res;
  return weather;
}