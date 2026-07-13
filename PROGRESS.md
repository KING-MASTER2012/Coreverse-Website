# PROGRESS FILE
Last Updated: 11.07.2026 16:15 by KINGMASTER-2012

## What happened?

- AGENTS.md is updated.
- i18n.json content source added.
- next-intl translation routing added.
- Language selector added next to theme button.
- System language detection added through next-intl proxy.
- Modern static background added.
- Mouse-activated blue circle effect added.
- Top bar and added dark/white mode button beautified.
- Theme toggle hydration mismatch fixed.
- Cool and modern static background done.
- Internationalization done by adding i18n.json.
- A cool and modern, mouse-activated blue circle done.
- Top bar beautified and dark/white mode icon button added in its far right section.
- The translation system that retrieves data from i18n.json added using next-intl.
- To the right of the theme changer button, a language system created that uses the translation system. This system will have a flag icon (a downward-pointing arrow) that opens a pop-up window (containing country flags; the selected flag replaces the initial flag), and the default language will be the system language.
- Cool and modern installation panel made that: Background is not changed, only its over(for Z-axis) section is changed. First, OS selection screen(logos in public/images/). Then Vulkan or OpenGL selection screen. After that, suitable file is downloaded(Only one text file for now).
- 'Coreverse Lab' added to i18n.json.
- Install panel scroll transition system updated without changing panel designs.
- Without altering the panel designs, the scroll system has been updated as follows: When a button is clicked, its corresponding panel is inserted below the currently open panel, the scroll position is adjusted accordingly, the previous panel is removed from the scroll container (with the scrollbar kept hidden and non-interactive), and the new panel is displayed without modifying the background.
- Features button has been created in top bar between 'Install' and 'Community' buttons. Same time, 'Explore features' button's active has been changed in main.
- Cool and modern panel has been made that: Background is not changed, only its over(for Z-axis) section is changed like installation panel. First, video(Use all videos in public/video/*.mp4. The system should remain dynamic and continue to function even if a new video is added later or a video is deleted.) has be played by Vidstack in right section. In left section, there will be some texts. In bottom, there has be circles[Every circle represents a video. Circle of playing video specified.(Color changing etc.)] and circles' right and left arrows changing playing video. Same time, videos auto changing when playing video is finished.
## What will be done?
1) Primary Priority(Firstly)
[] Cool and modern login and register screen will be like others. E-mail will be sent by Brevo and Database by Supabase(PostgreSQL).
