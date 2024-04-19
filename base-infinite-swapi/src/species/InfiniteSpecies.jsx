import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery, useIsFetching } from "@tanstack/react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["sw-species"], // The name of the query cache key
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam), // The initial url and callback for query urls
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    }
  });

  // Map over each person within mapped pages
  return <InfiniteScroll
    loadMore={() => {
      // prevent multi fetching
      if (!isFetching) {
        fetchNextPage();
      }
    }}
    hasMore={hasNextPage}
  >
    {data.pages.map((pageData) => {
      return pageData.results.map(species => {
        return <Species
          key={species.name}
          name={species.name}
          language={species.language}
          averageLifespan={species.averageLifespan}
        />
      })
    })}
  </InfiniteScroll>;
}
