import { useEffect, useState, useRef, useCallback } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos } from "./";
import { useMoreVideos } from "../context/MoreVideosContext";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState("");

  const { loadMore, setLoadMore, lastElementRef } = useMoreVideos();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
      setPage(data.nextPageToken);
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (loadMore) {
      fetchFromAPI(
        `search?pageToken=${page}&part=snippet&q=${selectedCategory}`
      ).then((data) => {
        setVideos((prev) => [...prev, ...data.items]);
        setPage(data.nextPageToken);
        setLoadMore(false);
      });
    }
  }, [loadMore]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        ></Sidebar>
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff", display: { xs: "none", md: "block" } }}
        >
          Copyright 2023 UToBe
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "rgba(238,69,255,255)" }}>videos</span>
        </Typography>

        <Videos lastElementRef={lastElementRef} videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
