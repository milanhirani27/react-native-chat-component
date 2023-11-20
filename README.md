# @milanhirani27/react-native-custom-chat

A customizable and user-friendly React Native chat component.

## Installation

```shell
npm install @milanhirani27/react-native-custom-chat
```


#### Notes

> - You can find images and video recordings in the 'screenshots' folder on Github.
---

## Usage

```js
import ChatComponent from '@milanhirani27/react-native-custom-chat';
```

---

## Use the component in your code

```js
import ChatComponent from '@milanhirani27/react-native-custom-chat';

const App = () => {
  return (
      <ChatComponent
        headerTitle="Chat Title"
        headerColor="#3498db"
      />
   
  );
};

export default App;
```
---

## Props
The following props can be used to customize the chat component:

headerTitle (string, required): The title for the chat header.

headerColor (string, required): The background color of the chat header.

---

#### Examples

```js
<ChatComponent
  headerTitle="My Chat"
  headerColor="#7f8c8d"
  // Add other props as needed
/>
```
---

#### Development
If you want to contribute to this project or make changes, follow these steps:

#### Clone the repository:

```shell
git clone https://github.com/milanhirani27/react-native-custom-chat.git
```

#### Install dependencies:

```shell
cd react-native-custom-chat
```
```shell
npm install
```

#### Make your changes and run the example app:

```shell
npm start
```