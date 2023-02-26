import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector(`iframe`);
const player = new Player(iframe);
const localStorageKey = `videoplayer-current-time`;

const onPlay = function (e) {
  localStorage.setItem(localStorageKey, e.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = localStorage.getItem(localStorageKey);

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
