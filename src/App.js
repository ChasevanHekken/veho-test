import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
  const randomWords = [
    'Hello friend.',
    'How are you?',
    'I am doing well, thanks for asking!',
    'What a beautiful day it is outside!',
    'How is life?'
  ];

  const users = [
    {
      name: 'Joe Smith',
      conversation: []
    },
    {
      name: 'Bob Jones',
      conversation: []
    },
    {
      name: 'Steve Maker',
      conversation: []
    },
    {
      name: 'Anne Bush',
      conversation: []
    },
    {
      name: 'Mary Anne',
      conversation: []
    },
    {
      name: 'Emily Goodwill',
      conversation: []
    }
  ];

  const [currentUser, setCurrentUser] = useState(users[0]);
  const [currentUsers, setCurrentUsers] = useState(users);
  const [currentWords, setCurrentWords] = useState('');

  const createAvatars = users => {
    return users.map((user, index) => {
      return (
        <div className="avatar" key={index} onClick={() => setCurrentUser(user)}>
          <div className="avatar-icon">
            <img src={logo} alt="Logo" />
          </div>
          <div className="avatar-user-info">
            <h4>{user.name}</h4>
            <p className="avatar-conversation">{user.ownWords}</p>
          </div>
        </div>
      )
    });
  };

  const createTextBubbles = words => {
    return words.map((word, index) => {
      return (
        <div className={'text-bubbles ' + word.whosWords} key={index}>
          <p>{word.words}</p>
          <p className="conversation-timestamp">{word.time}</p>
        </div>
      )
    });
  };

  const changeWords = event => {
    setCurrentWords(event.target.value);
  };

  const addToConvo = () => {
    const words = {
      time: Date(),
      whosWords: 'own-words',
      words: currentWords
    };

    currentUser.conversation.push(words);
    setCurrentUser(currentUser);
    setCurrentWords('');

    const randomSeconds = Math.floor(Math.random() * 6);
    setTimeout(setRandomWords, randomSeconds * 1000);
  };

  const setRandomWords = () => {
    const words = {
      time: Date(),
      whosWords: 'their-words',
      words: randomWords[Math.floor(Math.random() * 5)]
    };

    currentUser.conversation.push(words);
    setCurrentUser(currentUser);
    setCurrentWords('');
  }

  return (
    <div className="App">
      <div className="side-nav">
        <div className="avatars">
          {createAvatars(currentUsers)}
        </div>
        <div className="create-conversation">
          <h3>New Conversation</h3>
        </div>
      </div>
      <div className="conversation-container">
        <div className="conversation-header">
          <div className="avatar-icon">
            <img src={logo} alt="Logo" />
          </div>
          <h3>{currentUser && currentUser.name}</h3>
        </div>
        <div className="conversation-body">
          <div className="conversation-own-words">
            {createTextBubbles(currentUser.conversation)}
          </div>
        </div>
        <div className="conversation-footer">
          <div className="conversation-input">
            <textarea 
              rows="5"
              className="conversation-textarea"
              value={currentWords}
              onChange={currentWords => changeWords(currentWords)}
            />
          </div>
          <div className="conversation-submit">
            <button onClick={() => addToConvo()}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
