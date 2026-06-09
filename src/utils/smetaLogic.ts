export type ObjectType = "house" | "banya" | "garage" | "extension";
export type WallType = "brick" | "gasblock" | "wood" | "monolith";

export interface SmetaInput {
  objectType: ObjectType;
  area: number;
  city: string;
  wallType: WallType;
}

export interface SmetaResult {
  materials: number;
  labor: number;
  logistics: number;
  markup: number;
  total: number;
}

const basePricePerSqm: Record<WallType, number> = {
  brick: 45000,
  gasblock: 30000,
  wood: 25000,
  monolith: 50000,
};

const objectCoefficient: Record<ObjectType, number> = {
  house: 1.0,
  banya: 0.85,
  garage: 0.65,
  extension: 0.75,
};

function getCityCoefficient(city: string): number {
  const cityLower = city.trim().toLowerCase();
  if (cityLower.includes("москв") || cityLower.includes("moscow")) return 1.4;
  if (cityLower.includes("петербург") || cityLower.includes("питер") || cityLower.includes("спб")) return 1.3;
  if (cityLower.includes("тюмен")) return 1.0;
  if (cityLower.includes("новосибирск")) return 1.1;
  if (cityLower.includes("краснодар")) return 1.15;
  if (cityLower.includes("екатеринбург")) return 1.2;
  if (cityLower.includes("владивосток")) return 1.5;
  if (cityLower.includes("сочи")) return 1.35;
  return 1.15;
}

export function calculateSmeta(input: SmetaInput): SmetaResult {
  const basePrice = basePricePerSqm[input.wallType];
  const objCoef = objectCoefficient[input.objectType];
  const cityCoef = getCityCoefficient(input.city);

  const totalBase = basePrice * input.area * objCoef * cityCoef;

  const materials = Math.round(totalBase * 0.55);
  const labor = Math.round(totalBase * 0.45);
  const logistics = Math.round(materials * 0.05);
  const markup = Math.round((materials + labor + logistics) * 0.2);
  const total = materials + labor + logistics + markup;

  return { materials, labor, logistics, markup, total };
}

export function formatMoney(value: number): string {
  return value.toLocaleString("ru-RU") + " ₽";
}
