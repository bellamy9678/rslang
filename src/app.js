import './sass/style.scss';

import './js/authorization/NewUser';
import './js/authorization/StartPage';
import './js/authorization/WindowOnload';
import APIMethods from './js/words_service/APIMethods';

APIMethods.getNewWordsArray(1, 1);
