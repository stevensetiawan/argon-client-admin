/* eslint-disable no-console */
'use client';

import * as React from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import firebaseConfig from '@/lib/firebase-config';

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export default function FirebaseComponent() {
  const setupToken = async () => {
    try {
      const currentToken = await getToken(messaging, { vapidKey: 'AIzaSyDp-3v5e_-jhU0NYFc_9bs2UUi5MYzMgKs' });
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    } catch (err: unknown) {
      console.log('An error occurred while retrieving token. ', err);
    }
  };

  React.useEffect(() => {
    void setupToken()
      .then((_) => {
        onMessage(messaging, (payload) => {
          console.log('Message received. ', payload);
          // ...
        });
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  return null;
}
