// Schools represented by the King and Vaughan Ward 1 trustee.
// Source: YRDSB King and Vaughan Ward 1 trustee page (www2.yrdsb.ca/node/1360), checked Oct 30, 2026.
// Plain TS (no imports) so node tests can import it.

export interface School {
  name: string;
  type: "elementary" | "secondary";
  url: string;
}

export const SCHOOLS: School[] = [
  { name: "Discovery P.S.", type: "elementary", url: "https://discovery-ps.yrdsb.ca/" },
  { name: "Joseph A. Gibson P.S.", type: "elementary", url: "https://josephagibson-ps.yrdsb.ca/" },
  { name: "Julliard P.S.", type: "elementary", url: "https://julliard-ps.yrdsb.ca/" },
  { name: "Kettleby P.S.", type: "elementary", url: "https://kettleby-ps.yrdsb.ca/" },
  { name: "King City P.S.", type: "elementary", url: "https://kingcity-ps.yrdsb.ca/" },
  { name: "Kleinburg P.S.", type: "elementary", url: "https://kleinburg-ps.yrdsb.ca/" },
  { name: "Mackenzie Glen P.S.", type: "elementary", url: "https://mackenzieglen-ps.yrdsb.ca/" },
  { name: "Maple Creek P.S.", type: "elementary", url: "https://maplecreek-ps.yrdsb.ca/" },
  { name: "Michael Cranny E.S.", type: "elementary", url: "https://michaelcranny-es.yrdsb.ca/" },
  { name: "Nobleton P.S.", type: "elementary", url: "https://nobleton-ps.yrdsb.ca/" },
  { name: "Schomberg P.S.", type: "elementary", url: "https://schomberg-ps.yrdsb.ca/" },
  { name: "Tanya Khan P.S.", type: "elementary", url: "https://tanyakhan-ps.yrdsb.ca/" },
  { name: "Teston Village P.S.", type: "elementary", url: "https://testonvillage-ps.yrdsb.ca/" },
  { name: "King City S.S.", type: "secondary", url: "https://kingcity-ss.yrdsb.ca/" },
  { name: "Maple H.S.", type: "secondary", url: "https://maple-hs.yrdsb.ca/" },
];

export const ELEMENTARY = SCHOOLS.filter((s) => s.type === "elementary");
export const SECONDARY = SCHOOLS.filter((s) => s.type === "secondary");
