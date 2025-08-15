export interface LeaderShipMember{
  name: string;
  position: string;
  about: string;
}

export interface pgData{
  name: string;
  gender: "boy" | "girl";
  ratings: number;
}

export interface Locations{
  location_name: string;
  Distance: number;
}

export interface aboutCmritData{
  overview: string;
  LeaderShip: LeaderShipMember[];
  address: string;
  important_geolocations: Locations[];
  how_to_reach: string;
  palces_to_visit_near: string[]
  near_by_pg: pgData[];
};