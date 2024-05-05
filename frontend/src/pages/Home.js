import { useLocation } from "react-router-dom";
import ChallangeCard from "../components/Cards/ChallangeCard";
import NavBar from "../components/NavBar";
import ProblemTable from "../components/ProblemTable";
import { useGet } from "../hooks/useGet";
import { useEffect, useState } from "react";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Home() {
  const MIN_TABLE_WIDTH = 498;
  const MID_TABLE_WIDTH = 650;
  const MIN_CARD_WIDTH = 300;
  const MAX_CARD_WIDTH = 500;
  const MAX_TABLE_WIDTH = 1000;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCard, setShowCard] = useState(windowWidth >= MIN_CARD_WIDTH + MID_TABLE_WIDTH + (120));

  useEffect(() => {
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth >= MIN_CARD_WIDTH + MID_TABLE_WIDTH + (120)) {
        setShowCard(true);
      } else {
        setShowCard(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  

  let query = useQuery();
  const {
    data: problems,
    loading,
    error,
  } = useGet(`/api/problemset${query ? `?${query}` : ""}`);

  // For testing
  // import problem1 from "../to_delete.json"
  // const {
  //   data: problems,
  //   loading,
  //   error,
  // } = {
  //   data: problem1,
  //   loading: false,
  //   error: null,
  // };

  if (problems) {
    return (
      <div className="flex flex-col h-screen overflow-auto bg-dark-1 max-w-screen">
        <NavBar />
        <div className="flex justify-center w-full h-full px-9">
          <div className="flex flex-row justify-between flex-grow">
            <div
              style={{
                flex: "3 1 auto",
                minWidth: `${MIN_TABLE_WIDTH}px`,
                maxWidth: `${MAX_TABLE_WIDTH}px`,
              }}
            >
              <ProblemTable problems={problems} showDifficulty={windowWidth >= MIN_TABLE_WIDTH + 30} />
            </div>
            { showCard && (
              <div
                className="ml-5"
                style={{
                  flex: "1 1 auto",
                  minWidth: `${MIN_CARD_WIDTH}px`,
                  maxWidth: `${MAX_CARD_WIDTH}px`,
                  boxSizing: "border-box",
                }}
              >
                <ChallangeCard />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
}
