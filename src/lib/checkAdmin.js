import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function checkIsAdmin(uid) {
  if (!uid) return false;

  try {
    const ref = doc(db, "admins", uid);
    const snap = await getDoc(ref);
    return snap.exists();
  } catch (err) {
    console.error("Admin check error:", err);
    return false;
  }
}