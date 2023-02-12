import { Box } from "@mui/material";

import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, width, lastElementRef }) => {
  if (!videos?.length) return "Loading...";

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={2}
      width={width}
    >
      {videos.map((item, index) => (
        <Box key={index}>
          {item.id.videoId &&
            (videos.length === index + 1 ? (
              <VideoCard lastElementRef={lastElementRef} video={item} />
            ) : (
              <VideoCard video={item} />
            ))}
          {item.id.channelId &&
            (videos.length === index + 1 ? (
              <ChannelCard lastElementRef={lastElementRef} channelDetail={item} />
            ) : (
              <ChannelCard channelDetail={item} />
            ))}
        </Box>
      ))}
    </Box>
  );
};

export default Videos;
