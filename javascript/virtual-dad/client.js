let yesButton = document.querySelector('#yes-btn');
let noButton = document.querySelector('#no-btn');
let dadImage = document.querySelector('#dad-img');
let spanishButton = document.querySelector('#spanish-input');
let prompt = document.querySelector('#prompt');
let spanishMode = false;

spanishButton.addEventListener('click', () => {

  spanishMode = !spanishMode;
  
  if(spanishMode) {
    yesButton.children[0].textContent = 'Sí';
    prompt.textContent = 'Hola hijo, ¿te gustaría escuchar un chiste gracioso?';
  } else {
    yesButton.children[0].textContent = 'Yes';
    prompt.textContent = 'Hello son, care to hear a funny joke?';
  }
})

yesButton.addEventListener('click', async () => {

  dadImage.src = 'dad.webp';

  const options = {
    method: 'GET',
    url: 'https://dad-jokes.p.rapidapi.com/random/joke',
    headers: {
      'X-RapidAPI-Key': 'b8b2a7a196msh89671ab7ecf88a1p16c90bjsn28e9641c5ae9',
      'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.body[0].setup);
    console.log(response.data.body[0].punchline);

    let setup = response.data.body[0].setup;
    let punchline = response.data.body[0].punchline;

    let joke = setup + '\n' + punchline;

    if (!spanishMode) {
      alert(joke);
      return;
    }

    const translateOptions = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b8b2a7a196msh89671ab7ecf88a1p16c90bjsn28e9641c5ae9',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      data: {
        q: joke,
        source: 'en',
        target: 'es'
      }
    };

    const responseTranslate = await axios.request(translateOptions);
    let spanishJoke = responseTranslate.data.data.translations.translatedText;

    alert(spanishJoke)

  } catch (error) {
    if (!spanishMode) {
      alert('Maybe when you\'re older I\'ll tell you this joke')
    } else {
      alert('Tal vez cuando seas mayor te cuente este chiste')
    }
  }
})

noButton.addEventListener('click', () => {
  dadImage.src = 'sad-dad.jpg';
  if (!spanishMode) {
    alert('I never loved you son...');
  } else {
    alert('Nunca te amé hijo...')
  }
})