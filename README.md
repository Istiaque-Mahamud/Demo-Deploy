# Birthday Surprise Website

```
birthday-surprise/
  index.html   style.css   script.js   README.md
  photos/  (photo1.jpg ... photo8.jpg + README.txt)
  music/   (birthday-song.mp3 + README.txt)
```

## Run on your MacBook
1. Double-click the ZIP to extract it (Downloads folder).
2. Open the `birthday-surprise` folder, double-click `index.html` (opens in Safari or Chrome).
3. After any edit, save and press Cmd+R to refresh.

## Personalize
Open `script.js` in TextEdit (Format > Make Plain Text) or VS Code. Edit only the `CONFIG` block at the top: name, date, subtitle, letter, wish, captions.
**Important:** the first line of the letter says "Dear Someone Special," so change it when you change the name.
Add or edit the Birthday Wishes pages in `CONFIG.wishes` (icon, title, text).
Add photos and music as described in the README.txt inside each folder.

## Publish free on GitHub Pages
1. Create an account at github.com, click **New repository**, name it (e.g. `birthday`), choose **Public**, create it.
2. Click **uploading an existing file**, drag in everything INSIDE the folder (index.html, style.css, script.js, photos, music), then **Commit changes**.
3. Go to **Settings > Pages**. Under Source choose **Deploy from a branch**, branch `main`, folder `/ (root)`, **Save**.
4. After 1 to 3 minutes your site is at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
Remember: the repository is public, so only upload photos and music you are allowed to share.

## Troubleshooting
- Photo missing: check exact name (photo1.jpg, lowercase) and that it is in `photos/`.
- No sound: add `music/birthday-song.mp3`; tap the music button (browsers block autoplay).
- Changes not showing online: wait a minute, hard refresh (Cmd+Shift+R).
- Page blank: you may have broken a quote or comma in `CONFIG`; undo your last edit.

## Final checklist
- [ ] Opens on phone width (resize browser narrow) with no sideways scroll
- [ ] Envelope button reveals the hero
- [ ] Gallery opens lightbox; arrows, Esc, and buttons work
- [ ] Wish button shows message and effects
- [ ] Music button plays/pauses (or explains if missing)
- [ ] Replay returns to the envelope
- [ ] Published link works on your phone

## Music note
Music plays from YouTube via `CONFIG.youtubeId` (works online, e.g. on GitHub Pages, not from a double-clicked file). Set it to `""` to use `music/birthday-song.mp3` instead.
