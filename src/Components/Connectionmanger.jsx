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
  peerId: null,
  setSignalData: (data) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Updating signal data in store:', isVerboseLogging ? data : {
        type: data.type,
        sdp: data.sdp ? data.sdp.substring(0, 100) + '...' : '',
      });
    }
    set({ signalData: data });
  },
  setPeerId: (id) => set({ peerId: id }),
}));

// Message Store for Chat
export const useMessageStore = create((set) => ({
  messages: [],
  addMessage: (message) => {
    console.log('Adding message to store:', message);
    set((state) => ({ messages: [...state.messages, message] }));
  },
}));

// Debugging utilities
const setupDebugging = (peer, role) => {
  peer.on('iceStateChange', (state) => {
    console.log(`${role} ICE state change:`, state);
  });

  peer.on('iceConnectionStateChange', () => {
    console.log(`${role} ICE connection state changed to:`, peer.iceConnectionState);
  });

  peer.on('iceCandidateError', (err) => {
    console.error(`${role} ICE candidate error:`, err);
  });

  peer.on('error', (err) => {
    console.error(`${role} error:`, err);
  });
};

// Function to create an initiator peer
let signalingTimeout; // Timeout variable

export const createInitiator = () => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'turn:your-turn-server.com', username: 'user', credential: 'pass' }, // Optional TURN server
      ],
    },
  });

  const { setSignalData } = useSignalingStore.getState();

  peer.on('signal', (data) => {
    clearTimeout(signalingTimeout); // Clear existing timeout
    signalingTimeout = setTimeout(() => {
      console.log('Initiator signal data:', data);
      setSignalData(data);
    }, 2000); // Set timeout duration (e.g., 2000 ms)
  });

  peer.on('connect', () => {
    console.log('Initiator connected');
  });

  setupDebugging(peer, 'Initiator');

  return peer;
};

export const createResponder = (initiatorSignal) => {
  if (!initiatorSignal || typeof initiatorSignal !== 'object') {
    throw new Error('Invalid initiator signal provided to createResponder.');
  }

  const peer = new Peer({
    initiator: false,
    trickle: false,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'turn:your-turn-server.com', username: 'user', credential: 'pass' }, // Optional TURN server
      ],
    },
  });

  const { setSignalData } = useSignalingStore.getState();

  setupDebugging(peer, 'Responder');

  peer.on('signal', (data) => {
    clearTimeout(signalingTimeout); // Clear existing timeout
    signalingTimeout = setTimeout(() => {
      console.log('Responder signal data:', data);
      setSignalData(data);
    }, 2000); // Set timeout duration (e.g., 2000 ms)
  });

  try {
    console.log('Applying initiator signal to responder:', initiatorSignal);
    peer.signal(initiatorSignal);
  } catch (error) {
    console.error('Error applying initiator signal:', error);
  }

  peer.on('connect', () => {
    console.log('Responder connected');
  });

  peer.on('data', (data) => {
    const receivedMessage = data.toString();
    console.log('Responder received message:', receivedMessage);
    useMessageStore.getState().addMessage({ type: 'received', text: receivedMessage });
  });

  peer.on('close', () => {
    console.warn('Responder connection closed');
    peer.destroy();
  });

  return peer;
};