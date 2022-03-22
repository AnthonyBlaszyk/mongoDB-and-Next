import { GetServerSideProps } from "next";
import Link from "next/link";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();

  const games = await mongodb.db().collection("games").find().toArray();
  const gamesResult = JSON.parse(JSON.stringify(games));

  return {
    props: {
      games: gamesResult,
    },
  };
};

const home: React.FC<{ games }> = ({ games }) => {
  return (
    <>
      <div>
        {games.map((element, index) => {
          return (
            <Link href={`/games/${element.slug}`}>
              <p>{element.name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default home;
