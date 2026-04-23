// 🔹 ANIME CATEGORIES
const animeCategories = {

  Action: [
    "Naruto", "Attack on Titan", "Jujutsu Kaisen",
    "Demon Slayer", "Chainsaw Man", "Fire Force",
    "Tokyo Revengers", "Black Clover", "Bleach","one punch man","my hero academia","vinland saga","mob psycho"
    ,"god of high schcool","dororo","blue exorcist","noragami","full metalalchemist:brotherhood"
    ,"mob-psycho 100","akame ga kill!","hunter x hunter","dragon ball Z","dragaon ball super"
   ,"kaiju no.8","fate/zero","parasyte: the maxim","cyberpunk: edgerunners"
  
  ],

  Romance: [
    "Tonikaku Kawaii", "My Dress-Up Darling",
    "The Angel Next Door Spoils Me Rotten",
    "My Tiny Senpai", "Darling in the Franxx",
    "Horimiya", "Kimi ni Todoke","golden time","clannad","Ao Haru Ride","toradora!","your lie in april"
    ,"rascal does not dream of bunny girl senpai","domestic girlfriend","plastic memories"," my little monster"
    ,"relife","orange","snow white with the red hair","boarding school juliet","the girl i like forget her glasses"
     ,"love chunibyo and other delusions","teasing master takagi san","shikimori isn't just cutie"
     ,"wotakoi:love is hard for otaku","say I LOVE YOU","tsurezure children","kubo wouldn't let me be invisible"
    ,"just because","lovely complex","3d kanojo : real girl","nisekoi"
      ,"ranma1/2","tomo chan is a girl"
  ],

  Comedy: [
    "KonoSuba", "Gintama",
    "The Disastrous Life of Saiki K",
    "Grand Blue", "Nichijou",
    "Asobi Asobase" ,"daily life of high school boys","the devil is a part timer","spy X family"
    ,"prison school","sakamoto days","AHO-girl","My bride is a mermaid","school rumble","D-frog"
     ,"toilet bound hanako kun","uncle from another world","skett dance"
     ,"tanaka kun is always list less","joshiraku","kamisama kiss"

  ],


  Fantasy: [
    "Solo Leveling", "Re:Zero",
    "Sword Art Online", "No Game No Life",
    "Overlord", "Magi","friren:beyond journey's end","mushoku tensie-jobless reincarnation","log horizon"
    ,"made in abyss","fairytail","the seven deadly sins","spice and wolf","the eminence of shadow"
    ,"yona of the dawn","the faraway paladin","wiseman's grandchild","childrens of the whale"
    ,"to your eternity","the ranking of kings","inoyasha","the ancient magus bride","the rising of the shield hereo"
  ],

  SliceOfLife: [
    "Spy x Family", "Barakamon",
    "Clannad", "Usagi Drop",
    "March Comes in Like a Lion","my roomate is cat","the girl i like forget her glasses"
    ,"hyouka","the maid i hired recently is mysterious","dangers in my heart","i got married to a girl i hate most in my class"
    ,"more than married couple but not married","school babysitters","the girl downstairs"
    ,"engaged to the unidentified","my love story with yamada kun at lvl 999","the shiunji family children"
    ,"you are MS servant","buddy daddies","is the order of rabbit"
  ],

  Psychological: [
    "Death Note",
    "Monster",
    "Paranoia Agent",
    "Serial Experiments Lain",
    "Perfect Blue",
    "Psycho-Pass",
    "Ergo Proxy",
    "Welcome to the NHK",
    "Future Diary",
    "Kaiji"
    ,"terrror in resonance","91 days","angels of death","classroom of elite","ghost in the shell"
    ,"junji ito collection ","summer time rendering","battle game in 5 seconds","the promised neverland"
    ,"tomodachi game","steins;gate","AJINN-demi human","B-the beginning","shiki","akira","paparika"
    ,"future dairies","tokyo ghoul","banana fish","psycho-pass"
    ,"devilman-crybaby","higurashi-when they cry","erased"
  ]
};

// 🔹 STATE
let allAnime = [];
let activeAnime = [];
let watchedAnime = [];

let isInitialized = false;
let currentRotation = 0;
let lastIndex = -1;

// 🎯 RANDOM ANIME (only from current category)
function getRandomAnime() {
  const available = allAnime.filter(a => !watchedAnime.includes(a));
  return available[Math.floor(Math.random() * available.length)];
}

// 🎡 FILL ACTIVE (8 items)
function fillActive() {
  activeAnime = [];

  let attempts = 0;

  while (activeAnime.length < 8 && attempts < 50) {
    let rand = getRandomAnime();

    if (rand && !activeAnime.includes(rand)) {
      activeAnime.push(rand);
    }

    attempts++;
  }
}

// 🔁 REFILL WHEEL (IMPORTANT)
function refillWheel() {
  let remainingAnime = allAnime.filter(a =>
    !watchedAnime.includes(a) && !activeAnime.includes(a)
  );

  while (activeAnime.length < 8 && remainingAnime.length > 0) {
    let randomIndex = Math.floor(Math.random() * remainingAnime.length);
    activeAnime.push(remainingAnime[randomIndex]);
    remainingAnime.splice(randomIndex, 1);
  }
}

// ⚙️ RENDER ACTIVE LIST
function renderActive() {
  const container = document.getElementById("activeList");
  container.innerHTML = "";

  activeAnime.forEach((anime, index) => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      ${anime}
      <button onclick="removeAnime(${index})">❌</button>
    `;

    container.appendChild(div);
  });
}

// ❌ REMOVE FROM WHEEL
function removeAnime(index) {
  activeAnime.splice(index, 1);
  refillWheel();

  renderActive();
  drawWheel();
}

// ✅ CHECKLIST
function renderChecklist() {
  const container = document.getElementById("checklist");
  container.innerHTML = "";

  allAnime.forEach((anime) => {
    const checked = watchedAnime.includes(anime);

    const div = document.createElement("div");

    div.innerHTML = `
      <label>
        <input type="checkbox" ${checked ? "checked" : ""}
        onchange="toggleAnime('${anime}')">
        ${anime}
      </label>
    `;

    container.appendChild(div);
  });
}

// 🔄 TOGGLE ANIME (MAIN LOGIC)
function toggleAnime(anime) {

  if (watchedAnime.includes(anime)) {
    // ❌ untick
    watchedAnime = watchedAnime.filter(a => a !== anime);
  } else {
    // ✅ tick
    watchedAnime.push(anime);

    // remove from wheel
    activeAnime = activeAnime.filter(a => a !== anime);

    // refill
    refillWheel();
  }

  // 🔥 RESET WHEN ALL DONE
  if (watchedAnime.length === allAnime.length) {
    alert("All anime in this category completed! Resetting...");

    watchedAnime = [];
    fillActive();
  }

  renderActive();
  renderChecklist();
  drawWheel();
}

// 🎡 DRAW WHEEL
function drawWheel() {
  const canvas = document.getElementById("wheelCanvas");
  const ctx = canvas.getContext("2d");

  const radius = canvas.width / 2;
  const angle = (2 * Math.PI) / activeAnime.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  activeAnime.forEach((anime, i) => {
    const start = i * angle;
    const end = start + angle;

    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, start, end);
    ctx.fillStyle = i % 2 === 0 ? "#00ffff55" : "#00ffffaa";
    ctx.fill();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(start + angle / 2);
    ctx.fillStyle = "white";
    ctx.font = "13px Arial";
    ctx.fillText(anime, radius / 2, 0);
    ctx.restore();
  });
}

// 🎡 SPIN WHEEL
function spinWheel() {
  let index;

  do {
    index = Math.floor(Math.random() * activeAnime.length);
  } while (index === lastIndex);

  lastIndex = index;

  const angle = 360 / activeAnime.length;
  const stopAngle = 360 - index * angle - angle / 2;

  const spins = 360 * (4 + Math.random() * 2);

  currentRotation += spins + stopAngle;

  const canvas = document.getElementById("wheelCanvas");
  canvas.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const selected = activeAnime[index];
    document.getElementById("result").innerText =
      "🎯 You should watch: " + selected;
  }, 3000);
}

// 🟢 NAVIGATION
function goToCategory() {
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("mainApp").style.display = "none"; // 🔥 ye missing tha
  document.getElementById("categoryPage").style.display = "block";
}
// 🚀 START APP WITH CATEGORY
function startApp(category) {
  document.getElementById("categoryPage").style.display = "none";
  document.getElementById("mainApp").style.display = "block";

  // 🔥 SET CATEGORY
  allAnime = [...animeCategories[category]];
  watchedAnime = [];

  fillActive();
  renderActive();
  renderChecklist();
  drawWheel();

  document.getElementById("spinBtn").addEventListener("click", spinWheel);
}
