import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";
import { useMoreVideos } from "../context/MoreVideosContext";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState("");
  const { searchTerm } = useParams();

  const { loadMore, setLoadMore, lastElementRef } = useMoreVideos();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setVideos(data.items);
      setPage(data.nextPageToken);
    });
  }, [searchTerm]);

  useEffect(() => {
    if (loadMore) {
      fetchFromAPI(
        `search?pageToken=${page}&part=snippet&q=${searchTerm}`
      ).then((data) => {
        setVideos((prev) => [...prev, ...data.items]);
        setPage(data.nextPageToken);
        setLoadMore(false);
      });
    }
  }, [loadMore]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for:{" "}
        <span style={{ color: "rgba(238,69,255,255)" }}>{searchTerm}</span> videos
      </Typography>

      <Videos lastElementRef={lastElementRef} videos={videos} />
    </Box>
  );
};

export default SearchFeed;
