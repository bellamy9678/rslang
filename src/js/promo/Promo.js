const page = `<div class="wrapper promo">

<section class="promo__header">
	<h1 class="promo__text">About RSLang Application</h1>
	<img class="promo__img" src="./assets/images/promo/blogging.svg" alt="blogging">
</section>

<section class="promo__description">
	<h2 class="description__header">Here you can:</h2>
	<p class="meeting">improve your english</p>
	<img class="meeting" src="./assets/images/promo/meeting.svg" alt="meeting">
	<p class="build">customize your learning</p>
	<img class="build" src="./assets/images/promo/build.svg" alt="build">
	<p class="support">study online</p>
	<img class="support" src="./assets/images/promo/support.svg" alt="support">
	<p class="vision">check your progress</p>
	<img class="vision" src="./assets/images/promo/vision.svg" alt="vision">
	<p class="time">spend time playing games</p>
	<img class="time" src="./assets/images/promo/time.svg" alt="vision">
	<p class="special">And it is all for free!</p>
	<img class="special" src="./assets/images/promo/special.svg" alt="vision">
</section>


<section class="video">
	<h2 class="video__header">See our amazing video</h2>
	<iframe class="video__frame"
		src="https://www.youtube.com/embed/R3D-r4ogr7s?controls=1"
		frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
	></iframe>
</section>

<section class="interval-rules">
	<h2 class="interval-rules__header">Interval repetition rules:</h2>
	<p>
		Степень изученности от 1 (новое слово), до 5 (это слово вы уже выучили).
	</p>

	<p>
		Увеличить степень изученности слова можно угадав это слово от 1 до 4
		раз подряд (для перехода по степеням от 1 до 5 нужно угадать
		соотвтетсвенно от 1 до 4 раз подряд).
	</p>
	<p>Уменьшение изученности происходит при неправильном ответе.</p>
	<p>
		В настройках можно выбрать использование выученных слов, т.е. слов
		со степенью изученности 5. Если таких слов нет, игра начнется с 1 раунда 1
		уровня.
	</p>
	<p>
		Через сколько дней нужно будет показать изучаемое слово считаем по формуле,
		используемой в ANKI: (2 x n + 1) x coefficient, где n - количество
		часов, через сколько нужно будет показать это слово для повторения
		(для новых слов n = 0).
	</p>
	<p>
		В интервальном повторении используются следующие коэффициенты для кнопок:
		снова: coefficient = 0; легко: coefficient = 1.3; хорошо:
		coefficient = 1; трудно: coefficient = 0.8;
	</p>
	<p>
		Если нет кнопок легко-сложно, то считаем, что при правильном ответе
		coefficient = 1, при неправильном coefficient = 0.
	</p>
	<p>
		Т.е. при неправильном ответе возвращаем слово к изучению в самое
		начало, полагая, что это слово равносильно новому для пользователя.
	</p>
</section>
</div>`;

export default class Promo {
	static draw () {
		const div = document.createElement('div');
		div.innerHTML = page;
		document.body.append(div);
		return div;
	}
}
