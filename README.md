## Run project

`npm install`

`npm start`

## Description
https://jovial-roentgen-535679.netlify.com/

- I need ~8h to create this project
- I used context with useReducer instead of redux, both are good enough for this project (even prop drilling would be good).
- I used native drag-drop because it was easy to implement it. There are also some awesome libraries like .react-dnd or react-beautiful-dnd but in this project native drag-drop is enough.
- I used native color input but libs eg: react-color would be good too.
- Project is based on DOM so I choose html2canvas to make screenshoots. This lib has several limits but in this case it does not bother.
- Redux like approach fits great for reverting changes. I save each editor state before I change it. It's the easiest way to achive memory leak. There ara better ways to do it (but much more difficulty) like storing only changes instead of whole state
