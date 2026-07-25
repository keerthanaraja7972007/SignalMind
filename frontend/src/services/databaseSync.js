import {
  getJunctions,
  updateJunction,
  saveNegotiation,
} from "../api/api";

export async function syncJunctions(junctions) {
  try {
    await Promise.all(
      junctions.map((junction) =>
        updateJunction(junction)
      )
    );
  } catch (err) {
    console.error(err);
  }
}

export async function refreshJunctions() {
  return await getJunctions();
}

export async function saveAINegotiation(data) {
  try {
    await saveNegotiation(data);
  } catch (err) {
    console.error(err);
  }
}