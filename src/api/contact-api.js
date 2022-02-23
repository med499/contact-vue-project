import { get } from "./http";

export async function getPhoneAndAddressTypes() {
  let data = await get("/json/test_vuejs.json");
  return mapPhoneAndAddressTypes(data);
}

function mapPhoneAndAddressTypes({ tel_cat, address_cat: addressTypes }) {
  let phoneTypes = Object.keys(tel_cat).map((type) => ({
    id: tel_cat[type],
    label: type,
  }));
  return {
    phoneTypes,
    addressTypes,
  };
}
