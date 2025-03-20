import { RaceResultsInputs } from "@/components/race/RaceResultForm";

export const adjustRacePlacements = (ranks: RaceResultsInputs["ranks"]) => {
  let newOrder = 0;
  const adjustedRanks = [];

  for (const rank of ranks) {
    if (rank.studentIds.length > 0) {
      adjustedRanks.push({
        order: newOrder,
        studentIds: rank.studentIds,
      });
      newOrder++; // Increment order only for non-empty ranks
    }
  }

  return adjustedRanks;
};
