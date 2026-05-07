# Play Store Release Skill

## Purpose

Use this guide when NovaBurst moves from prototype to Android distribution. The goal is a smooth path from internal testing to a signed Play Store submission without dragging release concerns into early gameplay work.

## App Icon

- Prepare a clear icon that reads well at small sizes.
- Favor high contrast and a simple central silhouette over detailed scene art.
- Keep the icon visually aligned with the neon arcade identity.

## Feature Graphic

- Plan a Play Store feature graphic that sells the game fantasy quickly.
- Show the shield, core, enemy pressure, or high-score energy in one readable composition.
- Avoid cluttered text-heavy marketing art.

## Package Name

- Choose a stable Android package name early.
- Avoid placeholder naming that will create signing or store migration issues later.
- Keep naming consistent across app config, EAS setup, and store listing assets.

## Privacy Policy Placeholder

- Prepare a privacy policy placeholder before release work becomes urgent.
- Keep it updated if analytics, ads, accounts, or crash reporting are added later.
- If the MVP has no backend and minimal data collection, say that clearly.

## EAS Android Build

- Use EAS for Android builds when the project is ready for distribution.
- Keep build configuration, versioning, and credentials organized and documented.
- Treat build readiness as a checklist item, not an afterthought.

## Internal Testing Track

- Use the Play Console internal testing track before wider rollout.
- Validate install flow, performance, crash behavior, and store metadata with real devices.
- Use internal builds to catch configuration issues before public exposure.

## Signed AAB Export

- Plan for a signed Android App Bundle as the release artifact.
- Keep signing credentials secure and documented for the team.
- Verify package name, version code, version name, icons, and store assets before exporting the final candidate.

## Release Mindset

- Do not block MVP gameplay work on final store assets too early.
- Do keep release requirements visible enough that they are not discovered too late.
- Ship a small, stable, polished build before broadening scope.
