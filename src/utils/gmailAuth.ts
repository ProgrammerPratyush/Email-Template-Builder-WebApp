import { useToast } from "@/hooks/use-toast";

const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.compose';
const CLIENT_ID = '930461435041-lldg4fp0nr7ujvc9i397fn2vvlcj3rj2.apps.googleusercontent.com';

export const initGmailAuth = () => {
  const popup = window.open(
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent('http://localhost:5000/oauth2callback')}&` +
    `response_type=token&` +
    `scope=${encodeURIComponent(GMAIL_SCOPE)}`,
    'Gmail Authorization',
    'width=600,height=600'
  );

  return new Promise((resolve, reject) => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'GMAIL_AUTH_SUCCESS') {
        resolve(event.data.token);
      } else if (event.data.type === 'GMAIL_AUTH_ERROR') {
        reject(new Error('Gmail authorization failed'));
      }
    });
  });
};

export const createDraft = async (accessToken: string, content: string) => {
  const email = btoa(
    `From: me\r\n` +
    `To: draft@draft.com\r\n` +
    `Subject: Email Template Draft\r\n` +
    `Content-Type: text/html; charset=utf-8\r\n\r\n` +
    `${content}`
  ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: {
        raw: email
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create draft');
  }

  return response.json();
};