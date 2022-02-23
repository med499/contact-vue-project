import axios from "axios";
import HttpException from "../exceptions/HttpException";

export async function get(url) {
  try {
    let result = await axios.get(url);
    return result.data;
  } catch (e) {
    throw new HttpException(e.message);
  }
}
