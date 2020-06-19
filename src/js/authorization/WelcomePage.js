const app = document.querySelector('.app');

export default function showWelcomePage(username) {
    const welcomePage = document.createElement('div');
    welcomePage.className = 'welcome';
    welcomePage.innerHTML = `<div class="wrapper welcome__wrapper">
        <div class="welcome__content">
            <h1 class="welcome__title">Hello, ${username}! Let's start?</h1>
            <div class="welcome__buttons">
                <a class="link-button" href="#">
                    <span class="icon icon_settings"></span>
                    <span class="link-button__text">Go to settings</span>
                </a>
            </div>
        </div>
        <img src="./assets/images/welcome.svg" class="welcome__image" alt="Settings">
    </div>`
    app.innerHTML = '';
    app.append(welcomePage);
}

