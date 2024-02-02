import { useEffect, useState } from "react";

type JobDetails = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

const PAGE_SIZE = 6;
export default function JobBoard() {
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [page, setPage] = useState(0);
  const [fetchingJobDetails, setFetchingJobDetails] = useState(false);

  useEffect(() => {
    fetchJobs(page);
  }, []);

  async function fetchJobs(currPage: number) {
    const jobIdsForPage = await fetchJobIds(currPage); // first function

    setFetchingJobDetails(true);

    // learn to do this - use Promise.all to fetch all data at once and then set state
    const jobsForPage = await Promise.all(
      jobIdsForPage.map((jobId) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`).then(
          (res) => res.json()
        )
      )
    );
    setJobs([...jobs, ...jobsForPage]);

    setFetchingJobDetails(false);
  }

  async function fetchJobIds(currPage: number) {
    let ids = jobIds;

    if (!jobs) {
      //if job state is empty array
      await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
        .then((res) => res.json())
        .then((data) => {
          ids = data; // put all ids inside local array jobs
          setJobIds(data); // JobIds state to have all ids
        });
    }

    // when jobs is not empty, get 6 ids from jobs array
    const start = currPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return ids.slice(start, end);
  }

  return (
    <div>
      <h1> Hacker News Job Board</h1>
      <ul>
        {}
        <li>
          <a></a>
        </li>
      </ul>
      {/* <button onClick={}>Load More</button> */}
    </div>
  );
}

// steps:
// 1. make GET request using useEffect and fetch and show the data in the console
// 2. only take first 6 ids

// learnings:
// - await fetch(url).then((res) => res.json()) returns a promise, resolve it one more time using .then((data) => console.log(data))
// - intuition: the goal is to save cost in number of API requests and size of data transfered over network
// - if you want to append an array to another array, use the spread operator or concat, never push
// - to learn: setJobIds([...jobs: , ...six]); doesn't work, why?
// - use map instead of forEach because map return a value, forEach doesn't
// - avoid using useEffect to set state, instead use callback function. Don't forget to wrap your function around useCallback hook so it won't be recreated every re render. it should only do things that can't be done in any other way: subscribing to services and events, fetching data on component mount etc. Else it just gets complicated and hard to follow/maintain.
// - useEffect can be used to monitor a state
