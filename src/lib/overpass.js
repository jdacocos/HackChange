const OVERPASS_ENDPOINT = "https://overpass-api.de/api/interpreter";

const buildShelterQuery = (bounds) => {
  const south = bounds.getSouth();
  const north = bounds.getNorth();
  const west = bounds.getWest();
  const east = bounds.getEast();

  return `
    [out:json][timeout:25];
    (
      node["amenity"="shelter"](${south},${west},${north},${east});
      way["amenity"="shelter"](${south},${west},${north},${east});
      relation["amenity"="shelter"](${south},${west},${north},${east});
      node["social_facility"="shelter"](${south},${west},${north},${east});
      way["social_facility"="shelter"](${south},${west},${north},${east});
      relation["social_facility"="shelter"](${south},${west},${north},${east});
    );
    out center tags;
  `;
};

const normaliseElement = (element) => {
  const latitude = element.lat ?? element.center?.lat;
  const longitude = element.lon ?? element.center?.lon;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return null;
  }

  const tags = element.tags ?? {};

  return {
    id: element.id,
    latitude,
    longitude,
    name: tags.name || "Shelter",
    address:
      tags["addr:full"] ||
      [tags["addr:housenumber"], tags["addr:street"]]
        .filter(Boolean)
        .join(" ") ||
      tags["addr:street"],
    tags,
  };
};

export const fetchShelters = async (bounds, { signal } = {}) => {
  if (!bounds) {
    throw new Error("Bounds are required to query Overpass API");
  }

  const query = buildShelterQuery(bounds);

  const response = await fetch(OVERPASS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: query,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Overpass API request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data?.elements) {
    return [];
  }

  return data.elements
    .map(normaliseElement)
    .filter(Boolean);
};