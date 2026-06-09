export type MachineryType = "excavator" | "dump_truck" | "aerial_lift" | "bulldozer" | "crane";

export interface MachineryItem {
  id: number;
  type: MachineryType;
  city: string;
  pricePerHour: number;
  phone: string;
  date: string;
  booked: boolean;
}

const STORAGE_KEY = "machineryList";

export function loadMachinery(): MachineryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMachinery(list: MachineryItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addMachinery(item: Omit<MachineryItem, "id" | "booked">): MachineryItem {
  const list = loadMachinery();
  const newItem: MachineryItem = { ...item, id: Date.now(), booked: false };
  list.push(newItem);
  saveMachinery(list);
  return newItem;
}

export function bookMachinery(id: number): void {
  const list = loadMachinery();
  const idx = list.findIndex((item) => item.id === id);
  if (idx !== -1) {
    list[idx].booked = true;
    saveMachinery(list);
  }
}
