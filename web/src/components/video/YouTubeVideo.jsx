import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

const YouTubeVideo = ({ videoUrl, width, height, onVideoProgress }) => {
  const videoOptions = {
    height: height || '500px',
    width: width || '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleStateChange = (event) => {
    const playerState = event.data;

    if (playerState === window.YT.PlayerState.ENDED) {
      console.log('O vídeo terminou!');
      onVideoProgress(); // Chama a função para marcar o conteúdo como concluído
    }
  };

  return (
    <YouTube
      videoId={extractVideoID(videoUrl)}
      opts={videoOptions}
      onStateChange={handleStateChange}
    />
  );
};

const extractVideoID = (url) => {
  const regex = /(?:v=)([^&]+)/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
};

YouTubeVideo.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  onVideoProgress: PropTypes.func.isRequired,
};

export default YouTubeVideo;
