import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["sw-species"], // The name of the query cache key
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam), // The initial url and callback for query urls
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    }
  });
  return <InfiniteScroll />;
}
