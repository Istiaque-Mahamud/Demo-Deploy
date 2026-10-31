/* ============ EDIT HERE: your configuration ============ */
const CONFIG = {
  name: "Tabida Hossain Heya",            // Her name (shown in the title)
  date: "1 November 2026",
  subtitle: "May this new year of your life be gentle, bright, and full of things that make you smile.",
  youtubeId: "",          // YouTube video ID from the link (after v=). Set to "" to use your own MP3 instead
  music: "music/birthday-song.mp3",   // Put your MP3 here (see music/README.txt)
  letter: [                           // Each line is one paragraph
    "Dear " + "Tabida Hossain Heya" + ",",
    "Happy birthday. I wanted to make something small and thoughtful, because you deserve a day that feels special.",
    "You have a way of making ordinary days a little warmer, and I wanted you to know how appreciated that is.",
    "Whatever this year brings, I hope it brings you laughter, rest, good surprises, and people who treat you kindly.",
    "There is nothing you need to say or do in return. This is simply a birthday gift, made with care.",
    "With warm wishes,",
    "Someone who is glad you exist",
    "Istiaque Mahamud (Sami)"
  ],
  wishes: [                           // Birthday wishes pages: icon, title, text. Add or remove freely.
    { icon: "\u{1F338}", title: "May you bloom", text: "Wishing you a year where everything good in you gets room to grow." },
    { icon: "\u2728", title: "May it sparkle", text: "May your ordinary days feel a little bit magical, and the big ones feel unforgettable." },
    { icon: "\u{1F382}", title: "May it be sweet", text: "Cake, laughter, and every little treat that makes you smile today." },
    { icon: "\u{1F4AB}", title: "May dreams come true", text: "Whatever you are hoping for, I hope it comes closer this year." },
    { icon: "\u{1F33C}", title: "May you feel cherished", text: "You deserve kindness, warmth, and people who notice the best of you." },
    { icon: "\u{1F98B}", title: "May you be free", text: "Free to try new things, change your mind, and enjoy every adventure." },
    { icon: "\u2600\uFE0F", title: "May it be bright", text: "More sunny mornings, easy laughs, and good news arriving when you need it." },
    { icon: "\u{1F495}", title: "Happy Birthday!", text: "Thank you for being you. I hope today is full of everything lovely." }
  ],
  wish: "May every wish you make this year find its way to you. Happy birthday, truly.",
  final: "Happy Birthday Heya!",
  photos: [                           // Copy images to photos/ with these names
    { src: "photos/photo1.jpg", caption: "Lost among the bookshelves" },
    { src: "photos/photo2.jpg", caption: "A quiet moment with a good story" },
    { src: "photos/photo3.jpg", caption: "Somewhere between the pages" },
    { src: "photos/photo4.jpg", caption: "Completely lost in the story" },
    { src: "photos/photo5.jpg", caption: "Calm by the water" },
    { src: "photos/photo6.jpg", caption: "Sunlit thoughts on a green bench" },
    { src: "photos/photo7.jpg", caption: "Wind, waves, and wandering" },
    { src: "photos/photo8.jpg", caption: "Floating among the water lilies" }
  ]
};
/* ============ End of configuration ============ */

const PCOL=["#f4b6c0","#d9c8f3","#ffd2b3","#c6ecd9","#c2e2f8","#fff2b0"];
const PAGECOL=["#f9cdd5","#e3d6f7","#ffdcc2","#d3f1e2","#cde8fa","#fff3b8"];
const $ = id => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let idx = 0, lastFocus = null;

function text(el, v){ el.textContent = v; }
function init(){
  text($("nameText"), CONFIG.name); text($("dateText"), CONFIG.date); text($("subText"), CONFIG.subtitle);
  text($("finalText"), CONFIG.final); text($("wishMsg"), CONFIG.wish);
  document.title = "Happy Birthday, " + CONFIG.name;
  CONFIG.letter.forEach(t => { const p = document.createElement("p"); p.textContent = t; $("letterText").appendChild(p); });
  CONFIG.photos.forEach((ph, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "polaroid"; b.style.setProperty("--r", ((i % 2 ? 1 : -1) * (1 + i % 3)) + "deg");
    b.setAttribute("aria-label", "Open photo: " + ph.caption);
    b.append(frame(ph), Object.assign(document.createElement("span"), { textContent: ph.caption }));
    b.onclick = () => openLb(i); $("board").appendChild(b);
  });
  for (let i = 0; i < 22 && !reduce; i++){
    const p = document.createElement("i"); p.className = "petal";
    p.style.cssText = `left:${Math.random()*100}%;--dx:${Math.random()*160-80}px;animation-duration:${9+Math.random()*10}s;animation-delay:${-Math.random()*15}s;background:linear-gradient(135deg,${PCOL[i%6]},#fff4)`;
    $("petals").appendChild(p);
  }
}
/* Image with graceful placeholder if the file is missing */
function frame(ph){
  const d = document.createElement("div"); d.className = "ph"; d.textContent = "\u273F";
  const img = new Image(); img.alt = ph.caption;
  img.onload = () => { d.textContent = ""; d.appendChild(img); };
  img.src = ph.src; return d;
}
/* Lightbox */
function openLb(i){ lastFocus = document.activeElement; idx = i; showLb(); $("lb").hidden = false; $("lbClose").focus(); }
function showLb(){
  const ph = CONFIG.photos[idx], f = frame(ph); f.id = "lbImg"; f.classList.add("empty");
  f.querySelector("img") || 0; $("lbImg").replaceWith(f); text($("lbCap"), ph.caption);
  const img = new Image(); img.onload = () => f.classList.remove("empty"); img.src = ph.src;
}
function closeLb(){ $("lb").hidden = true; lastFocus && lastFocus.focus(); }
function step(n){ idx = (idx + n + CONFIG.photos.length) % CONFIG.photos.length; showLb(); }
$("lbClose").onclick = closeLb; $("lbPrev").onclick = () => step(-1); $("lbNext").onclick = () => step(1);
$("lb").onclick = e => { if (e.target === $("lb")) closeLb(); };
document.addEventListener("keydown", e => {
  if ($("lb").hidden) return;
  if (e.key === "Escape") closeLb(); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1);
});

/* Music (starts only after a click) */
const audio = new Audio(); audio.loop = true; audio.preload = "none"; let audioOk = true;
audio.onerror = () => { audioOk = false; setMusic(false); $("musicBtn").title = "Music file not found. See music/README.txt"; };
function setMusic(on){ $("musicBtn").setAttribute("aria-pressed", on); $("musicBtn").setAttribute("aria-label", on ? "Pause music" : "Play music"); text($("musicIcon"), on ? "\u275A\u275A" : "\u266B"); }
$("musicBtn").onclick = () => {
  if (CONFIG.youtubeId) return ytToggle();
  if (!audio.src) audio.src = CONFIG.music;
  if (audio.paused && audioOk) audio.play().then(() => setMusic(true)).catch(() => { setMusic(false); alert("Music file not found. See music/README.txt to add one."); });
  else { audio.pause(); if (yt && yt.pauseVideo) yt.pauseVideo(); $("ytBox").classList.remove("on"); setMusic(false); }
};

/* YouTube music (official embedded player; starts only when she taps the music button) */
let yt = null;
function ytFail(msg){
  setMusic(false); $("ytBox").classList.remove("on");
  let t = $("toast");
  if (!t){ t = document.createElement("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = (typeof msg === "string" ? msg : "The song can't play inside this page. ");
  const a = document.createElement("a"); a.href = "https://www.youtube.com/watch?v=" + CONFIG.youtubeId; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Open the song on YouTube";
  t.appendChild(a); t.hidden = false; clearTimeout(t._t); t._t = setTimeout(() => { t.hidden = true; }, 12000);
}
function ytInit(){
  if (yt || !CONFIG.youtubeId) return;
  if (location.protocol === "file:") return;
  const make = () => { yt = new YT.Player("ytPlayer", { width: 220, height: 124, videoId: CONFIG.youtubeId,
    playerVars: { playsinline: 1, rel: 0, loop: 1, playlist: CONFIG.youtubeId },
    events: { onStateChange: e => setMusic(e.data === 1 || e.data === 3), onError: ytFail } }); };
  if (window.YT && YT.Player) return make();
  window.onYouTubeIframeAPIReady = make;
  const s = document.createElement("script"); s.src = "https://www.youtube.com/iframe_api"; s.onerror = ytFail; document.head.appendChild(s);
}
function ytToggle(){
  if (location.protocol === "file:") return ytFail("YouTube music only plays from the published website, not from a file on your computer. ");
  $("ytBox").classList.add("on");
  if (!yt || !yt.playVideo){ ytInit(); setTimeout(() => yt && yt.playVideo && yt.playVideo(), 1500); return; }
  yt.getPlayerState() === 1 ? yt.pauseVideo() : yt.playVideo();
}

/* Effects: confetti, hearts, petals, sparkles on one canvas */
const cv = $("fx"), cx = cv.getContext("2d"); let parts = [], raf = 0;
function size(){ cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; }
addEventListener("resize", size); size();
function burst(){
  if (reduce) return;
  const cols = ["#f4b6c0","#e08e9c","#c9a45c","#a77bd6","#7cc4a0","#7aaee0","#ffb36b"], kinds = ["c","h","p","s"];
  for (let i = 0; i < 140; i++) parts.push({ x: innerWidth/2, y: innerHeight*.6, vx: (Math.random()-.5)*14, vy: -Math.random()*15-4, g: .22, r: Math.random()*6+4, a: Math.random()*6, va: (Math.random()-.5)*.3, col: cols[i % 7], k: kinds[i % 4], life: 160 + Math.random()*80 });
  if (!raf) loop();
}
function loop(){
  cx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); cx.clearRect(0,0,innerWidth,innerHeight);
  parts = parts.filter(p => p.life-- > 0);
  parts.forEach(p => {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.a += p.va;
    cx.save(); cx.globalAlpha = Math.min(1, p.life/50); cx.translate(p.x,p.y); cx.rotate(p.a); cx.fillStyle = p.col;
    if (p.k === "c") cx.fillRect(-p.r, -p.r/2, p.r*2, p.r);
    else if (p.k === "h"){ cx.font = p.r*3 + "px serif"; cx.fillText("\u2665", -p.r, p.r); }
    else if (p.k === "p"){ cx.beginPath(); cx.ellipse(0,0,p.r,p.r*1.7,0,0,7); cx.fill(); }
    else { cx.shadowColor = "#c9a45c"; cx.shadowBlur = 14; cx.beginPath(); cx.arc(0,0,p.r/2,0,7); cx.fill(); }
    cx.restore();
  });
  raf = parts.length ? requestAnimationFrame(loop) : 0;
  if (!raf) cx.clearRect(0,0,innerWidth,innerHeight);
}

/* Flow: open, wish, replay */
$("openBtn").onclick = () => {
  ytInit();
  const w = $("welcome");
  w.classList.add("opening");
  setTimeout(() => { w.hidden = true; w.classList.remove("opening"); $("main").hidden = false; $("main").classList.add("reveal"); scrollTo(0,0); burst(); }, reduce ? 0 : 900);
};
$("wishBtn").onclick = () => { $("wishMsg").hidden = false; burst(); setTimeout(burst, 500); $("wishMsg").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); };
$("replayBtn").onclick = () => {
  audio.pause(); setMusic(false); $("wishMsg").hidden = true;
  $("main").hidden = true; $("main").classList.remove("reveal"); $("welcome").hidden = false; scrollTo(0,0); $("openBtn").focus();
};
/* Wishes book */
let pg = 0;
function showPage(){
  const w = CONFIG.wishes[pg], c = $("pageCard");
  c.style.setProperty("--pc", PAGECOL[pg % PAGECOL.length]);
  text($("pgIcon"), w.icon); text($("pgTitle"), w.title); text($("pgText"), w.text);
  text($("pgNum"), (pg + 1) + " / " + CONFIG.wishes.length);
  c.classList.remove("flip"); void c.offsetWidth; c.classList.add("flip");
}
function turn(n){ pg = (pg + n + CONFIG.wishes.length) % CONFIG.wishes.length; showPage(); }
$("pgPrev").onclick = () => turn(-1); $("pgNext").onclick = () => turn(1);
showPage();
init();
