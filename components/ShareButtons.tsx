"use client";
import * as React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
} from "react-share";
interface IShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FunctionComponent<IShareButtonsProps> = ({
  title,
  url,
}) => {
  return (
    <div className="flex flex-row gap-4">
      {/* <EmailShareButton url={url}>
        <EmailIcon size={32} round />
        <span className="sr-only">Share by Email</span>
      </EmailShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
        <span className="sr-only">Share on Facebook</span>
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
        <span className="sr-only">Share on LinkedIn</span>
      </LinkedinShareButton>
      <RedditShareButton url={url}>
        <RedditIcon size={32} round />
        <span className="sr-only">Share on Reddit</span>
      </RedditShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round />
        <span className="sr-only">Share on Twitter</span>
      </TwitterShareButton> */}
    </div>
  );
};

export default ShareButtons;
