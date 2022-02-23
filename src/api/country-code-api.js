import { get } from "./http";

export async function getCountryCodes() {
  let data = await get("/json/country_codes.json");
  return mapCountryCodes(data);
}

function mapCountryCodes(countryCodes) {
  return countryCodes
    .map(({ name, dial_code: code }) => {
      return {
        name,
        code,
      };
    })
    .sort((a, b) => a.code > b.code);
}
