# 09 — Rework Early Game Difficulty Curve

You are working on the NovaBurst React Native mobile game.

Goal:
Make the game easier and slower during the early stages.

Player feedback:
- game becomes difficult too quickly
- too many colors appear too early
- not enough time to react

Tasks:
- reduce early spawn rate
- reduce early movement speed
- delay additional color introductions
- smooth progression scaling
- gradually increase challenge over time

Difficulty pacing:
0–20 sec:
- very slow
- 1 color only
- minimal enemies/objects

20–45 sec:
- introduce second color
- slight speed increase

45–90 sec:
- moderate speed
- increase spawn density carefully

90+ sec:
- survival gameplay ramps progressively

Requirements:
- gameplay should feel fair
- allow time to think/react
- improve new player retention

Acceptance criteria:
- players survive longer initially
- difficulty feels smooth
- gameplay no longer feels overwhelming early

Update CHANGELOG.md.
