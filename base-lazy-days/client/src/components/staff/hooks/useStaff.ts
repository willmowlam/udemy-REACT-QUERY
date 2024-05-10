import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Staff } from "@shared/types";

// import { filterByTreatment } from "../utils";
import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  // Set a default empty staff array
  const fallback: Staff[] = [];

  // Get data from server via useQuery (renaming data to staff and provide fallback)
  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff], // Set queryKey to constant
    queryFn: getStaff, // Set the query function 
  });

  return { staff, filter, setFilter };
}
