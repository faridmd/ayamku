import { getAuth } from "firebase/auth";
import konpik from "./config/configuration";

export const auth = getAuth(konpik);
