const main = document.querySelector('main');
const voice_select = document.querySelector('#voices');
const textarea = document.querySelector('#text');
const read_btn = document.querySelector('#read');
const toggle_btn = document.querySelector('#toggle');
const close_btn = document.querySelector('#close');

const data = [
   {
      image: './assets/img/drink.jpg',
      text: "I'm Thirsty"
   },
   {
      image: './assets/img/food.jpg',
      text: "I'm Hungry"
   },
   {
      image: './assets/img/tired.jpg',
      text: "I'm Tired"
   },
   {
      image: './assets/img/hurt.jpg',
      text: "I'm Hurt"
   },
   {
      image: './assets/img/happy.jpg',
      text: "I'm Happy"
   },
   {
      image: './assets/img/angry.jpg',
      text: "I'm Angry"
   },
   {
      image: './assets/img/sad.jpg',
      text: "I'm Sad"
   },
   {
      image: './assets/img/scared.jpg',
      text: "I'm Scared"
   },
   {
      image: './assets/img/outside.jpg',
      text: 'I Want To Go Outside'
   },
   {
      image: './assets/img/home.jpg',
      text: 'I Want To Go Home'
   },
   {
      image: './assets/img/school.jpg',
      text: 'I Want To Go To School'
   },
   {
      image: './assets/img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
   }
];

const message = new SpeechSynthesisUtterance();

const createBox = (item) => {
   const box = document.createElement('div');
   const { image, text } = item;
   box.classList.add('box');
   box.innerHTML = `
      <img src="${image}" alt="${text}" />
      <p class="info">${text}</p>
   `;
   box.addEventListener('click', () => {
      setTextMessage(text);
      speakText();
      box.classList.add('active');
      setTimeout(() => box.classList.remove('active'), 800);
   });

   main.appendChild(box);
}

const setTextMessage = (text) => {
   message.text = text;
}

const speakText = () => {
   speechSynthesis.speak(message);
}

data.forEach(createBox);

let voices_arr = [];

const setSpeech = () =>{
   return new Promise((resolve, reject) => {
      let synth = window.speechSynthesis;
      
      let id = setInterval(() => {
         if(synth.getVoices().length !== 0){
            resolve(synth.getVoices());
            clearInterval(id);
         }
      }, 10);
   });
}

const getVoices = () => {
   setSpeech().then((voices) => {
      voices_arr = voices;
      voices.forEach(voice => {
         const option = document.createElement('option');
         option.value = voice.name;
         option.innerText = `${voice.name} ${voice.lang}`;
         voice_select.appendChild(option);
      });
   });
};

const setVoice = (e) => {
   message.voice = voices_arr.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

voice_select.addEventListener('change', setVoice);

read_btn.addEventListener('click', () => {
   setTextMessage(textarea.value);
   speakText();
});

getVoices();

toggle_btn.addEventListener('click', () => {
   document.querySelector('.text-box').classList.toggle('active');
});

close_btn.addEventListener('click', () => {
   document.querySelector('.text-box').classList.remove('active');
});