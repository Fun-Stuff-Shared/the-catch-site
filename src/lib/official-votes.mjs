import voteStore from "../data/votes/marco-rubio.json";

export const allRubioVotes = voteStore.rows;
export const voteStoreMeta = voteStore.meta;

export function votesForEpisode(episode) {
  const measures = new Set(episode.measures);
  return allRubioVotes.filter((vote) => vote.congress === episode.congress && vote.session === episode.session && measures.has(vote.measure));
}

export function keyVotesForEpisode(episode) {
  const rows = new Map(votesForEpisode(episode).map((vote) => [vote.rc, vote]));
  return episode.key_votes.map((key) => {
    const vote = rows.get(key.rc);
    if (!vote) throw new Error(`${episode.slug}: key roll call ${key.rc} is not on its derived measures`);
    return { ...vote, text: key.text };
  });
}
