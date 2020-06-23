import './sass/style.scss';
import './js/authorization/CreateUser';
import './js/authorization/StartPage';
import 'normalize.css';
import { initEnglishPuzzle, startPuzzleGame } from './js/english_puzzle/main';
import { wrapper } from './js/english_puzzle/constants';


wrapper.innerHTML = '';
initEnglishPuzzle();
startPuzzleGame();
