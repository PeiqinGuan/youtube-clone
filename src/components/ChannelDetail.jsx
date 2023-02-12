import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { ChannelCard, Videos } from "./";
import { useMoreVideos } from "../context/MoreVideosContext";

import { Box } from "@mui/material";

const ChannelDetail = () => {
  const { id } = useParams();

  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const { loadMore, setLoadMore, lastElementRef } = useMoreVideos();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        setVideos(data?.items);
        setPage(data?.nextPageToken);
      }
    );
  }, [id]);

  useEffect(() => {
    if (loadMore && hasMore) {
      fetchFromAPI(
        `search?channelId=${id}&pageToken=${page}&part=snippet&order=date`
      ).then((data) => {
        setVideos((prev) => [...prev, ...data?.items]);
        !data?.nextPageToken ? setHasMore(false) : setPage(data?.nextPageToken);
        setLoadMore(false);
      });
    }
  }, [loadMore]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(0,189,255,1) 0%, rgba(236,71,252,1)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap={2}
          p={2}
        >
          <Videos lastElementRef={lastElementRef} videos={videos} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
