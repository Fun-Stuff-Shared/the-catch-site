// EU-Greenland partnership package, September 2026.
// Figures from pinned Commission IP/26/1800, STATEMENT/26/1803, STATEMENT/26/1804,
// Council Decision (EU) 2021/1764, ECB eurofxref 2026-09-08, and the Danish
// government copy of the joint declaration.

export const event = {
  slug: "greenland/september-2026",
  title: "The Commission named a 200 million euro Greenland package and signed a joint declaration in Nuuk",
  dek: "Denmark announced the visit on September 1. On September 7 the European Commission, Greenland, and Denmark signed a declaration that says it creates no legal or financial obligations. The Commission press release, not that declaration, named a €200 million Global Gateway package for this year and next.",
  name: "Greenland EU package",
  span: "September 1 to September 7, 2026",
  date: "2026-09-07",
  updated: "2026-09-08",
  kpis: [
    { value: "€200", unit: "million", label: "Global Gateway package, this year and next" },
    { value: "€225", unit: "million", label: "EU seven-year grant envelope, 2021-2027" },
    { value: "€530", unit: "million", label: "Commission proposal for 2028-2034, presented 3 September 2025" },
    { value: "$232.28", unit: "million", label: "€200 million at the ECB dollar rate, September 8" },
  ],
};

// IP/26/1800 and STATEMENT/26/1803.
export const packageEur = 200;
export const doagEur = 225;
export const mffProposedEur = 530;
export const fisheriesAnnualEuro = 17296857;
export const fisheriesAnnualEur = 17.296857;
export const fisheriesSectoralEur = 3.2;
export const satelliteEuEur = 9.1;
export const satelliteDkDkkMillion = 15; // DR: Denmark co-finances with 15 million kroner
export const malmbjergAddedValueEur = 90;
export const mipUpperSecondary2019 = 47.9; // mip-2021-greenland.txt
export const mipUpperSecondary2027 = 60;
export const mipRenewable2020 = 70;
export const mipRenewable2027 = 90;
export const mffProposalDate = "3 September 2025"; // ec-greenland-country.html
export const doagEducationShare = 0.9;
export const doagGreenGrowthShare = 0.1;

// ECB eurofxref daily, Cube time 2026-09-08.
export const ecb = {
  date: "2026-09-08",
  usdPerEur: 1.1614,
  dkkPerEur: 7.4748,
};

export const computed = {
  packageUsd: 232.28, // 200 * 1.1614
  mffProposedUsd: 615.54, // 530 * 1.1614
  mffRatio: 2.3556, // 530 / 225
  doagEducationEur: 202.5, // 225 * 0.9
  doagGreenGrowthEur: 22.5, // 225 * 0.1
  packageDkkMillion: 1494.96, // 200 * 7.4748
};
