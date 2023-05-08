# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Starten

Um die app richtig angezeig zu bekommen muss man zuerst noch "npm install" in der konsole eingeben.

### Wie Funktioniert die Seite

Als erstes muss man sich mit der e-mail ... und dem Password ... einloggen. Danach kann man bei den Inputfeldern 
die Abfahrts- und Ankunftsstation auswählen. Dann werden die Fahrten darunter angezeigt. Um genauere Infos zu den Fahrten 
zu erhalten, kann man dann mit einem Button die Strecke speichern. Danach wird die Strecke mit den nächsten 4 Routen 
bei den Favoriten angezeigt. Dort sieht man dan auch die Abfahrtszeit und weitere Infos zur Fahrt. 
Die Strecke kann man dan auch wieder mit dem "X" and der Seite löschen.

### Ordnerstruktur

Die Ordnerstruktur ist so organisiert, dass alles was etwas mit den connections zu tun hat im Ordner Connections ist.
Dort ist zum Beispiel die ganze search Funktion.

Dann gibt es noch für die Login- und HomePage jeweils ein jsx und ein css file. 
Der css code zu dem search file befinden sich ebenfalls in dem HomePage css file.
Zudem existier noch ein index.js file.

### Funktionen der components

Der Login Component regelt das ganze Login mit der Validierung. Das Login css file ist zuständig für das ganze design der Login Page. Der Index Component dient als start component. Der HomePage component beinhaltet den Hauptteil der Seite. In der HomePage kommt alles zusammen. Der meiste Teil des Designs der HomePage ist im HomePage.css file.

Der Search Component beinhaltet die ganze Logik die es braucht, damit man die Stationen suchen kann.
Das Design hierzu befindet sich ebenfals in der HomePage.css datei. 

Der SaveConnection Component beinhaltet das speichern der Stationen, die man Auswählt.

Die Favoriten Funktioen hat ein Favoriten.jsx file, in dem die ganze Logik ist zum abspeicher und anzeigen der 
ausgewählten Favoriten. Das ganze Design zu diesem Componetn ist nicht im HomePage.css file sondern in einem seperaten Favorites.css file. 