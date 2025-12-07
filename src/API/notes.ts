import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useNotes = () => {
  return useQuery(["notes"], async () => {
    const { data } = await axios.get("/api/entries");
    return data;
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (note: { title: string; synopsis: string; content: string }) => {
      const { data } = await axios.post("/api/entries", note);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["notes"]),
    }
  );
};
