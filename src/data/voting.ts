// Voting facts for the 2026 municipal election, shared by the homepage and /vote.
// Sources (checked 2026-10-05):
//   King:    https://www.king.ca/voterinformation, https://www.king.ca/elections
//   Vaughan: https://www.vaughan.ca/council/elections, https://internetvoting.vaughan.ca/,
//            https://www.vaughanpl.info/civic-engagement/municipal-election
// Re-check against the official pages before changing any date, time or place.

export const ELECTION_DAY = {
  date: "Monday, October 26",
  hours: "10 a.m. to 8 p.m.",
};

export const VERIFIED_ON = "October 5, 2026";

export const VAUGHAN = {
  registerOnlineBy: "Thursday, October 15",
  onlineDates: "October 9–18",
  onlineWindow: "Friday, October 9 to Sunday, October 18",
  registerUrl: "https://internetvoting.vaughan.ca/",
  votersListUrl: "https://voterregistration.vaughan.ca/",
  infoUrl: "https://www.vaughan.ca/council/elections",
};

export const KING = {
  onlineDates: "October 13–23",
  onlineWindow: "Tuesday, October 13 at 10 a.m. to Friday, October 23 at 8 p.m.",
  voteUrl: "https://vote2026.king.ca",
  votersListUrl: "https://registertovote.king.ca/",
  votersListDeadline: "Friday, October 23 at 4:30 p.m.",
  infoUrl: "https://www.king.ca/elections",
  advanceDays: [
    {
      date: "Saturday, October 10",
      shortDate: "Oct 10",
      place: "Trisan Centre",
      address: "25 Dillane Drive, Schomberg",
    },
    {
      date: "Saturday, October 17",
      shortDate: "Oct 17",
      place: "Dr. William Laceby Nobleton Community Centre & Arena",
      address: "15 Old King Road, Nobleton",
    },
    {
      date: "Saturday, October 24",
      shortDate: "Oct 24",
      place: "Zancor Centre",
      address: "1600 15th Sideroad, King City",
    },
  ],
  advanceHours: "10 a.m. to 5 p.m.",
};
