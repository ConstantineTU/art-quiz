import Questions from './components/questions'; // eslint-disable-line
import Sound from '../settings/components/sound';
import Settings from '../settings/settings'; // eslint-disable-line
import routingPages from './components/routing-pages';

class Routing {
  constructor() {
    this.main = document.querySelector('#main-container');
    this.header = document.getElementById('header');
    this.body = document.querySelector('body');
    this.isTimeGame = document.querySelector('.settings-main_timegame');
    this.countTime = document.querySelector('.settings-main_amount');

    this.audioCorrect = new Audio();
    this.audioUncorrect = new Audio();
    this.audioEnd = new Audio();
    this.audioClick = new Audio();
    this.audioClick.src = './assets/sounds/click.mp3';
    this.audioCorrect.src = './assets/sounds/correct.mp3';
    this.audioUncorrect.src = './assets/sounds/uncorrect.mp3';
    this.audioEnd.src = './assets/sounds/end.mp3';

    this.Question = new Questions();
    this.Sound = new Sound([this.audioCorrect, this.audioUncorrect, this.audioEnd, this.audioClick]);
    this.Settings = new Settings();
    this.Settings = new Settings();

    this.modalExit = document.getElementById('modalExit');
    this.modalCorrect = document.getElementById('modalCorrect');
    this.modalEnd = document.getElementById('modalEnd');
    this.modalOverlay = document.getElementById('modalOverlay');
    this.modalButtons = document.querySelectorAll('.modal-button');
    this.modalPicture = document.querySelector('.modal-correct-picture');
    this.modalNamePicture = document.querySelector('.modal-correct-name');
    this.modalAuthorPicture = document.querySelector('.modal-correct-author');
    this.modalYearPicture = document.querySelector('.modal-correct-year');
    this.modalIconPicture = document.querySelector('.modal-correct-icon');
    this.modalButtonNextQuiz = document.querySelector('.modal-button-plus');
    this.modalButtonCategories = document.querySelector('.modal-button-categories');
    this.modalEndResult = document.querySelector('.modal-end-title-result');

    this.buttonsClick = document.querySelectorAll('.click');

    [
      this.artistCategories,
      this.picturesCategories,
      this.mainHtml,
      this.mainHeader,
      this.QuestionAuthorHeader,
      this.QuestionPictureHeader,
    ] = routingPages();
    this.questionNumber = 0;
    this.isCategoriesLoad = false;
    window.addEventListener('load', () => {
      this.onLocationChange();
    });
    window.addEventListener('hashchange', () => {
      this.onLocationChange();
    });
    this.buttonsClick.forEach((buttonClick) => {
      const click = buttonClick;
      click.onclick = () => this.Sound.playSound(this.audioClick);
    });
  }

  async onLocationChange() {
    const location = window.location.hash;
    if (location) {
      if (location.includes('#/artist-question-')) {
        this.questionNumber = location.split('-', 3)[2].split('/', 1) * 10;
      }
      this.locationResolver(location);
    }
  }

  async locationResolver(location, info) {
    if (this.modalEnd.classList.contains('show')) {
      this.modalEnd.classList.remove('show');
      setTimeout(() => {
        this.modalOverlay.classList.remove('show');
      }, 1000);
    } else {
      this.modalExit.classList.remove('show');
      this.modalCorrect.classList.remove('show');
      this.modalOverlay.classList.remove('show');
    }

    if (!info && location.includes('#/artist-question-')) {
      await this.Question.loadAuthorPictures(this.questionNumber);
      return;
    }
    if (!info && location.includes('#/picture-question-')) {
      this.questionNumber = location.split('-', 3)[2].split('/', 1) * 10;
      await this.Question.loadAuthorPictures(this.questionNumber);
      return;
    }
    if (info) {
      [
        this.picture,
        this.pictureMini,
        this.randomPictures,
        this.author,
        this.randomAuthors,
        this.imageNum,
        this.name,
        this.year,
        this.qustionCounter,
      ] = info;
    }
    if (document.getElementById('categories-artist')) {
      this.categoriesArtist = document.getElementById('categories-artist');
      this.categoriesPictures = document.getElementById('categories-pictures');
    }
    if (document.getElementById('main-menu-categories')) {
      this.mainMenuCategories = document.getElementById('main-menu-categories');
      this.mainMenuHome = document.getElementById('main-menu-home');
    }
    if (location === '#/artist/') {
      this.header.classList.add('active');
      this.body.style.background = `rgba(0, 0, 0, 1) url("") no-repeat scroll center center /cover`;
      this.header.innerHTML = this.mainHeader;
      this.categoriesName = document.getElementById('headerCategoriesName');
      this.categoriesName.innerHTML = 'Artists';
      this.anoutherCategory = document.getElementById('anouther-category');
      this.anoutherCategory.innerHTML = 'Pictures categories';
      console.log(this.anoutherCategory);

      this.buttonsClick.forEach((clickBtn) => {
        const click = clickBtn;
        click.onclick = () => this.Sound.playSound(this.audioClick);
      });
      this.main.innerHTML = this.artistCategories;
      this.artistItemImg = document.querySelectorAll('.artist_item-img');
      this.artistItemImg.forEach((artist) => {
        artist.parentElement.parentElement.addEventListener('click', function viewedAuthorСategory() {
          localStorage.setItem(`artist.id${this.id}`, this.id);
        });
      });
      this.artistItemImg.forEach((artist) => {
        for (let i = 0; i < 12; i += 1) {
          if (artist.parentElement.parentElement.id === localStorage.getItem(`artist.id${i}`)) {
            artist.parentElement.classList.add('active');
            artist.classList.add('active');
          }
        }
      });
      this.Settings = new Settings();
      this.questionNumber = 0;
    } else if (location === '#/pictures/') {
      this.header.classList.add('active');
      this.body.style.background = `rgba(0, 0, 0) url("") no-repeat scroll center center /cover`;
      this.header.innerHTML = this.mainHeader;
      this.anoutherCategory = document.getElementById('anouther-category');
      this.anoutherCategoryLink = document.getElementById('anouther-category-link');
      this.anoutherCategoryLink.href = '#/artist/';
      this.anoutherCategoryLink.dataset.href = '#/artist/';
      this.anoutherCategory.innerHTML = 'Artists categories';
      this.buttonsClick.forEach((clickBtn) => {
        const click = clickBtn;
        click.onclick = () => {
          this.Sound.playSound(this.audioClick);
        };
      });
      this.main.innerHTML = this.picturesCategories;
      this.picturesItemImg = document.querySelectorAll('.pictures_item-img');
      this.picturesItemImg.forEach((picture) => {
        picture.parentElement.parentElement.addEventListener('click', function viewedPictureСategory() {
          localStorage.setItem(`picture.id${this.id}`, this.id);
        });
      });
      this.picturesItemImg.forEach((picture) => {
        for (let i = 12; i < 24; i += 1) {
          if (picture.parentElement.parentElement.id === localStorage.getItem(`picture.id${i}`)) {
            picture.parentElement.classList.add('active');
            picture.classList.add('active');
          }
        }
      });
      this.questionNumber = 0;
      this.Settings = new Settings();
    } else if (location.includes('#/artist-question-')) {
      if (+location.split('-', 3)[2].split('/', 1) + 1 < 12) {
        this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
        };
      } else {
        this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${1}/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${1}/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${1}/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${1}/`;
        };
      }
      this.modalButtons.forEach((buttonBtn) => {
        const button = buttonBtn;
        button.onclick = () => {
          button.parentElement.href = `#/artist-question-${location.split('-', 3)[2].split('/', 1)}/`;
          button.parentElement.dataset.href = `#/artist-question-${location.split('-', 3)[2].split('/', 1)}/`;
          this.Question.loadAuthorPictures(this.questionNumber);
          this.modalCorrect.style.zIndex = -1;
        };
      });
      this.body.style.background = `rgba(0, 0, 0) url("") no-repeat scroll center center /cover`;
      this.header.classList.remove('active');
      this.header.innerHTML = this.QuestionAuthorHeader;
      this.main.innerHTML = `
			<div class="questions-author">
							<div class="questions-author-container">
								<h2 class="questions-author-title">Who is the author of this picture?</h2>
								<div class="questions-author-picture" style="background: url('${
                  this.picture
                }') no-repeat scroll center center /contain;"></div>
								<div class="questions-author-bullets">
                ${[...Array(10)]
                  .map(() => {
                    return '<div class="questions-author-bullet"></div>';
                  })
                  .join('')}
								</div>
								<div class="questions-author-answers">
                ${[...Array(4)]
                  .map((_, i) => {
                    return `<a href="#/artist-question-${location
                      .split('-', 3)[2]
                      .split('/', 1)}/" data-href="#/artist-question-${location.split('-', 3)[2].split('/', 1)}/">
                              <button class="button_menu questions-author-answer">${
                                this.randomAuthors[i]
                              }</button></a>`;
                  })
                  .join('')}
								</div>
							</div>
						</div>
			`;
      // ! Timer
      if (this.isTimeGame.classList.contains('active')) {
        this.display = document.querySelector('.questions-author-time_count');
        this.fiveMinutes = this.countTime.dataset.value;
        this.Settings.getTimeGame(this.fiveMinutes, this.display, location, this.fiveMinutes);
      }
      this.buttonsClick.forEach((clickBtn) => {
        const click = clickBtn;
        click.onclick = () => this.Sound.playSound(this.audioClick);
      });
      const headerIconExit = document.getElementById('questions-author-header-main');
      const modalIconExit = document.querySelector('.modal-exite-icon');
      modalIconExit.onclick = () => {
        this.modalOverlay.classList.remove('show');
        this.modalExit.classList.remove('show');
      };
      headerIconExit.onclick = () => {
        this.modalButtonCategories.parentElement.href = `#/artist/`;
        this.modalButtonCategories.parentElement.dataset.href = `#/artist/`;
        this.modalOverlay.classList.add('show');
        this.modalExit.classList.add('show');
      };
      setTimeout(() => {
        this.modalPicture.style.background = `url("${this.pictureMini}") no-repeat scroll center center /cover`;
        this.modalNamePicture.textContent = this.name;
        this.modalAuthorPicture.textContent = this.author;
        this.modalYearPicture.textContent = this.year;
      }, 500);
      const bullets = document.querySelectorAll('.questions-author-bullet');
      if (this.questionNumber === 0 || this.questionNumber % 10 === 0) {
        let result = 0;
        for (let j = 0; j <= 9; j += 1) {
          if (localStorage.getItem(`bullet${j}`) === '#3dda69') {
            result += 1;
          }
        }
        this.modalEndResult.textContent = result;
        this.questionNumber = location.split('-', 3)[2].split('/', 1) * 10;
        for (let j = 0; j <= bullets.length; j += 1) {
          localStorage.removeItem(`bullet${j}`);
        }
      }
      for (let j = 0; j < bullets.length; j += 1) {
        if (localStorage.getItem(`bullet${j}`) && j !== bullets.length - 1) {
          bullets[j].style.background = localStorage.getItem(`bullet${j}`);
        }
      }
      const answers = document.querySelectorAll('.questions-author-answer');
      for (let i = 0; i < answers.length; i += 1) {
        answers[i].onclick = async () => this.getAnswer(answers[i], bullets);
      }
      this.questionNumber += 1;
    } else if (location.includes('#/picture-question-')) {
      if (+location.split('-', 3)[2].split('/', 1) + 1 < 24) {
        this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
        };
      } else {
        this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${12}/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${12}/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${12}/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${12}/`;
        };
      }
      this.modalButtons.forEach((buttonBtn) => {
        const button = buttonBtn;
        button.onclick = () => {
          button.parentElement.href = `#/picture-question-${location.split('-', 3)[2].split('/', 1)}/`;
          button.parentElement.dataset.href = `#/picture-question-${location.split('-', 3)[2].split('/', 1)}/`;
          this.Question.loadAuthorPictures(this.questionNumber);
          this.modalCorrect.style.zIndex = -1;
        };
      });
      this.body.style.background = `rgba(0, 0, 0) url("") no-repeat scroll center center /cover`;
      this.header.classList.remove('active');
      this.header.innerHTML = this.QuestionPictureHeader;
      this.main.innerHTML = `
			<div class="questions-picture">
			<div class="questions-picture-container">
				<h2 class="questions-picture-title">Which is <span id="questions-picture-author"
						class="questions-picture-author">${this.author}</span> picture?</h2>
				<div class="questions-picture-answers">
        ${[...Array(4)]
          .map((_, i) => {
            return `<a href="#/picture-question-${location
              .split('-', 3)[2]
              .split('/', 1)}/" data-href="#/picture-question-${location.split('-', 3)[2].split('/', 1)}/">
            <div class="questions-picture-answer"><img class="questions-picture-answer-img" src="${
              this.randomPictures[i]
            }" alt=""></div>
            </a>`;
          })
          .join('')}
				</div>
				<div class="questions-picture-bullets">
        ${[...Array(10)]
          .map(() => {
            return '<div class="questions-picture-bullet"></div>';
          })
          .join('')}
					</div>
			</div>
		</div>
			`;
      // ! Timer
      if (this.isTimeGame.classList.contains('active')) {
        this.display = document.querySelector('.questions-picture-time_count');
        this.fiveMinutes = this.countTime.dataset.value;
        this.Settings.getTimeGame(this.fiveMinutes, this.display, location, this.fiveMinutes);
      }
      this.buttonsClick.forEach((clickBtn) => {
        const click = clickBtn;
        click.onclick = () => {
          this.Sound.playSound(this.audioClick);
        };
      });
      const headerIconExit = document.getElementById('questions-author-header-main');
      const modalIconExit = document.querySelector('.modal-exite-icon');
      modalIconExit.onclick = () => {
        this.modalOverlay.classList.remove('show');
        this.modalExit.classList.remove('show');
      };
      headerIconExit.onclick = () => {
        this.modalButtonCategories.parentElement.href = `#/pictures/`;
        this.modalButtonCategories.parentElement.dataset.href = `#/pictures/`;
        this.modalOverlay.classList.add('show');
        this.modalExit.classList.add('show');
      };
      setTimeout(() => {
        this.modalPicture.style.background = `url("${this.pictureMini}") no-repeat scroll center center /cover`;
        this.modalNamePicture.textContent = this.name;
        this.modalAuthorPicture.textContent = this.author;
        this.modalYearPicture.textContent = this.year;
      }, 500);
      const bullets = document.querySelectorAll('.questions-picture-bullet');
      if (this.questionNumber === 0 || this.questionNumber % 10 === 0) {
        let result = 0;
        for (let j = 0; j <= 9; j += 1) {
          if (localStorage.getItem(`bullet${j}`) === '#3dda69') {
            result += 1;
          }
        }
        this.modalEndResult.textContent = result;
        this.questionNumber = location.split('-', 3)[2].split('/', 1) * 10;
        for (let j = 0; j <= bullets.length; j += 1) {
          localStorage.removeItem(`bullet${j}`);
        }
      }
      for (let j = 0; j < bullets.length; j += 1) {
        if (localStorage.getItem(`bullet${j}`) && j !== bullets.length - 1) {
          bullets[j].style.background = localStorage.getItem(`bullet${j}`);
        }
      }
      const answers = document.querySelectorAll('.questions-picture-answer-img');
      for (let i = 0; i < answers.length; i += 1) {
        answers[i].onclick = () => this.getAnswer(answers[i], bullets);
      }
      this.questionNumber += 1;
    } else if ('#/') {
      this.body.style.background = `rgba(0, 0, 0) url("./assets/img/main-screen/main_background2.jpg") no-repeat scroll center center /
			cover`;
      this.questionNumber = 0;
      this.header.classList.remove('active');
      this.header.innerHTML = this.mainHeader;
      this.main.innerHTML = this.mainHtml;
      this.buttonsClick.forEach((clickBtn) => {
        const click = clickBtn;
        click.onclick = () => {
          this.Sound.playSound(this.audioClick);
        };
      });
      this.Settings = new Settings();
    }
  }

  gameOver() {
    setTimeout(() => {
      this.modalEnd.classList.add('show');
      this.modalOverlay.classList.add('show');
      this.modalEnd.style.zIndex = 5;
      this.Sound.playSound(this.audioEnd);
    }, 500);
  }

  getAnswer(answer, bullets) {
    this.answer = answer;
    this.bullets = bullets;
    if (this.answer.src === this.pictureMini || this.answer.textContent === this.author) {
      this.modalIconPicture.style.background = `url("./assets/img/svg/correct_answer.svg") no-repeat`;
      localStorage.setItem(`bullet${this.qustionCounter}`, '#3dda69');
      this.bullets[this.qustionCounter].style.background = '#3dda69';
      this.answer.classList.add('correct');
      this.Sound.playSound(this.audioCorrect);
    } else {
      this.modalIconPicture.style.background = `url("./assets/img/svg/wrong_answer.svg") no-repeat`;
      localStorage.setItem(`bullet${this.qustionCounter}`, '#d82727');
      this.bullets[this.qustionCounter].style.background = '#d82727';
      this.answer.classList.add('uncorrect');
      this.Sound.playSound(this.audioUncorrect);
    }
    this.modalCorrect.classList.add('show');
    this.modalOverlay.classList.add('show');
    this.modalCorrect.style.zIndex = 5;
  }

  toLongAnswer(categori) {
    this.categori = categori;
    if (this.categori === 'author') {
      this.bullets = document.querySelectorAll('.questions-author-bullet');
      this.answers = document.querySelectorAll('.questions-author-answer');
    } else if (this.categori === 'picture') {
      this.bullets = document.querySelectorAll('.questions-picture-bullet');
      this.answers = document.querySelectorAll('.questions-picture-answer-img');
    }
    this.answers.forEach((answer) => {
      this.answer = answer;
      localStorage.setItem(`bullet${this.qustionCounter}`, '#d82727');
      this.bullets[this.qustionCounter].style.background = '#d82727';
      this.answer.style.background = '#d82727';
      this.answer.style.color = '#000000';
      this.modalCorrect.classList.add('show');
      this.modalOverlay.classList.add('show');
      this.modalIconPicture.style.background = `url("./assets/img/svg/wrong_answer.svg") no-repeat`;
      this.modalCorrect.style.zIndex = 5;
      this.Sound.playSound(this.audioUncorrect);
      this.answer.classList.add('uncorrect');
    });
  }

  repeatTimer(diff, display, location, durationDefault) {
    this.diff = diff;
    this.durationDefault = durationDefault;
    this.display = display;
    this.location = location;
    const modalExiteIcon = document.querySelector('.modal-exite-icon');
    modalExiteIcon.addEventListener('click', () => {
      this.Settings.getTimeGame(this.diff, this.display, this.location, this.durationDefault);
    });
  }

  getSoundInRouting() {
    this.Sound.playSound(this.audioClick);
  }
}

export default Routing;
