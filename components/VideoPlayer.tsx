"use client";
import * as React from 'react';
import ReactPlayer from 'react-player'

interface IAppProps {
  url: string
}

const VideoPlayer: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <ReactPlayer
      url={props.url}
      width="640"
      height="360"
      className="aspect-video mx-auto"
    />
  );
};

export default VideoPlayer;
