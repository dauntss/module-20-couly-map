'use client';

import { comments } from '../lib/data';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Comment {
  id: string;
  userid: string;
  commenttext: string;
}

interface KingdomData {
    nickname: string;
}

interface sitesData {
    url: string;
}

const kingdomData: Record<string, KingdomData> = {
    "Baria": { nickname: "baria" },
    "Flok": { nickname: "flok" },
    "Grand Duchy of Marl": { nickname: "marl" },
    "Thetbia": { nickname: "thetbia" },
    "Principality of Bolia": { nickname: "bolia" },
    "Tuteshilese Empire": { nickname: "tut" },
    "Kingdom of Hinck": { nickname: "hinck" },
    "Kingdom of Berden": { nickname: "berden" },
    "Dominion of Westland": { nickname: "westland" },
    "Mil": { nickname: "mil" },
    "Principality of Car": { nickname: "car" },
    "Kingdom of God": { nickname: "god" },
    "Grand Duchy of Bet": { nickname: "bet" },
    "Amerish Empire": { nickname: "amer" },
};

const sitesData: Record<string, sitesData> = {
    "Shiresberg Holy Site": { url: "shiresberg" },
    "Former Claggish Empire": { url: "clag" },
    "Pickerketon Island": { url: "pickerketon" },
    "Lake Mergish": { url: "mergish" },
    "Jatarah Island": { url: "jatarah" }
};

export default function Page() {
  const kingdoms: string[] = Object.keys(kingdomData);
  const sites: string[] = Object.keys(sitesData);

  const [data, setData] = useState<Comment[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await comments() as Comment[];
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Conditionally render based on data */}
      {!data ? (
        <div>No Comments Yet.</div>
      ) : !Array.isArray(data) ? (
        <div>No Comments Available.</div>
      ) : (
        <main>
          <h1>Wiki</h1>
          <h2>Kingdoms</h2>
          {kingdoms.map((kingdom) => {
            const kingdomInfo = kingdomData[kingdom];
            const nickname = kingdomInfo ? kingdomInfo.nickname : 'default-nickname';

            return (
                <Link href={`/wiki/${nickname}`} key={kingdom}>
                    {kingdom}
                </Link>
            );
            })}
          <h2>Significant Sites</h2>
          {sites.map((site) => {
            const siteInfo = sitesData[site];
            const url = siteInfo ? siteInfo.url : 'default-url';

            return (
            <Link href={`/wiki/${url}`} key={site}>
                {site}
            </Link>
          )}
          )}
          <h2>Comments</h2>
          {data.map((comment) => (
            <div key={comment.id}>
              <h2>{comment.userid}</h2>
              <p>{comment.commenttext}</p>
            </div>
          ))}
        </main>
      )}
    </>
  );
}