import Peer from 'simple-peer';
import { create } from 'zustand';
import 'readable-stream'; // Polyfill for Node.js streams in browser environments

// Compatibility checks
if (!window.crypto || !window.crypto.getRandomValues) {
  console.error('Secure random number generation is not supported in this environment.');
}

if (!('RTCPeerConnection' in window)) {
  console.error('WebRTC is not supported in this environment.');
}

if (!('ReadableStream' in window)) {
  console.error('ReadableStream is not supported in this environment.');
}

// Environment variable for verbose logging
const isVerboseLogging = process.env.VITE_VERBOSE_LOGGING === 'true';

// Signal Store for WebRTC
export const useSignalingStore = create((set) => ({
  signalData: null,
  setSignalData: (data) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Updating signal data in store:', isVerboseLogging ? data : {
        type: data.type,
        sdp: data.sdp.substring(0, 100) + '...', // Shorten for readability
      });
    }
    set({ signalData: data });
  },
}));

// Message Store for Chat
export const useMessageStore = create((set) => ({
  messages: [],
  addMessage: (message) => {
    console.log('Adding message to store:', message);
    set((state) => ({ messages: [...state.messages, message] }));
  },
}));

// Function to create an initiator peer
export const createInitiator = () => {
  const peer = new Peer({ initiator: true, trickle: false });

  peer.on('signal', (data) => {
    console.log('Initiator signal data:', isVerboseLogging ? data : {
      type: data.type,
      sdp: data.sdp.substring(0, 100) + '...', // Shorten for readability
    });
    useSignalingStore.getState().setSignalData(data);
  });

  peer.on('data', (data) => {
    const receivedMessage = data.toString();
    console.log('Initiator received message:', receivedMessage);
    useMessageStore.getState().addMessage({ type: 'received', text: receivedMessage });
  });

  peer.on('connect', () => {
    console.log('Initiator: Peer connection established');
  });

  peer.on('close', () => {
    console.warn('Initiator: Peer connection closed');
    peer.destroy(); // Cleanup to avoid memory leaks
  });

  peer.on('error', (err) => {
    console.error('Initiator: Peer error:', err);
  });

  return peer;
};

// Function to create a responder peer
export const createResponder = (initiatorSignal) => {
  if (!initiatorSignal || typeof initiatorSignal !== 'object') {
    throw new Error('Invalid initiator signal provided to createResponder.');
  }

  const peer = new Peer({ initiator: false, trickle: false });

  peer.on('signal', (data) => {
    console.log('Responder signal data:', isVerboseLogging ? data : {
      type: data.type,
      sdp: data.sdp.substring(0, 100) + '...', // Shorten for readability
    });
    useSignalingStore.getState().setSignalData(data);
  });

  peer.signal(initiatorSignal); // Use initiator's signal

  peer.on('data', (data) => {
    const receivedMessage = data.toString();
    console.log('Responder received message:', receivedMessage);
    useMessageStore.getState().addMessage({ type: 'received', text: receivedMessage });
  });

  peer.on('connect', () => {
    console.log('Responder: Peer connection established');
  });

  peer.on('close', () => {
    console.warn('Responder: Peer connection closed');
    peer.destroy(); // Cleanup to avoid memory leaks
  });

  peer.on('error', (err) => {
    console.error('Responder: Peer error:', err);
  });

  return peer;
};

// Function to send a message
export const sendMessage = (peer, message) => {
  if (!peer || !message) {
    console.error('Peer or message is not defined');
    return;
  }

  if (!peer.connected) {
    console.error('Cannot send message: Peer is not connected');
    return;
  }

  try {
    peer.send(message);
    console.log('Sent message:', message);
    useMessageStore.getState().addMessage({ type: 'sent', text: message });
  } catch (err) {
    console.error('Error sending message:', err);
  }
};
