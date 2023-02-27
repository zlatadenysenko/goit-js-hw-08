import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector(`iframe`);
const player = new Player(iframe);
const LOCAL_STORAGE_KEY = `videoplayer-current-time`;

const onPlay = function (e) {
  localStorage.setItem(LOCAL_STORAGE_KEY, e.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = localStorage.getItem(LOCAL_STORAGE_KEY);

player.setCurrentTime(currentTime);
