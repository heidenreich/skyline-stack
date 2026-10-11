# Skyline Stack

A one-tap tower stacking game you play in your phone's browser.

Each floor slides in from the side. Tap to drop it. Whatever hangs over the edge gets cut off. Land it dead-on three times in a row and your tower gets wider again. As the tower grows you pass real landmarks, from Christ the Redeemer to the Burj Khalifa.

## Play

Open `index.html` in any browser, or turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) and open the link on your phone. On a computer, press Space to drop a floor.

## Special floors

After the 5th floor, some floors behave differently, and a label tells you which one is coming:

- **Slow floor**: drifts at about half speed.
- **Express**: almost one and a half times as fast.
- **Zigzag** (from the 10th floor): changes direction at random.
- **Crane drop** (from the 10th floor): swings on a cable; tap to release it and it falls onto the tower.

They get more common the higher you build, and the same special floor never comes twice in a row.

## Share your tower

After a game, tap **Share your tower** to send a picture of your finished building, with its height and the landmark it beat, in your current look.

## High scores

Make the top 10 and you enter your initials, arcade style. Scores are saved in your phone's browser, so each phone keeps its own board.

## Install it

On iPhone: in Safari, tap ••• → Share → Add to Home Screen. On Android: tap **Install on your home screen** on the title screen, or Install app in Chrome's menu. Once installed it opens full screen and plays without a connection (the online board needs one).

## Online high scores

The high-score screen can also show a shared board for everyone, stored in Firebase Firestore. To turn it on, put your project's `apiKey` and `projectId` in the `FIREBASE` setting in `index.html`, and paste `firestore.rules` into Firestore → Rules in the Firebase console. Without them, the game uses only the scores saved on each phone.

## Change the look

Tap **Change look** on the title screen to pick a skyline (Anywhere, New York, Toronto, Chicago, Paris, Seattle, Dubai) and a palette (Dusk, Blue hour, Golden hour, Neon night, Daytime, Dawn). Every palette fades toward starry space as your tower climbs. Your choice is remembered.

## Arcade mode

Tap **Arcade mode** on the title or game-over screen for an 8-bit look: pixel graphics, CRT scanlines and chiptune jingles. Tap **Modern mode** to switch back. Your choice is remembered.

Leave the title screen alone for a few seconds and the game plays a demo of itself, then shows the high scores, like an arcade cabinet waiting for a coin.

Everything is in one file: no build step, no dependencies.
