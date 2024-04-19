import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery, useIsFetching } from "@tanstack/react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ["sw-species"], // The name of the query cache key
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam), // The initial url and callback for query urls
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    }
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  if (isError) {
    return <div className="error">Error: {error.toString()}</div>
  }

  return <>
    {
      // Show during scroll
      isFetching && <div className="loading">Loading...</div>
    }
    <InfiniteScroll
      loadMore={() => {
        // prevent multi fetching
        if (!isFetching) {
          fetchNextPage();
        }
      }}
      hasMore={hasNextPage}
    >
      {
        // Map over the pages data
        data.pages.map((pageData) => {
          // Map over the species data in a page
          return pageData.results.map(species => {
            // Return a species child component
            return <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.averageLifespan}
            />
          })
        })}
    </InfiniteScroll>
  </>;
}
