import { create } from "zustand";
import SimplePeer from "simple-peer";

// Create a store to manage the peer connection
export const usePeerStore = create((set, get) => ({
  isInitiator: false,
  signal: "",
  remoteSignal: "",
  connected: false,
  message: "",
  messages: [],
  peer: null, // To hold the SimplePeer instance

  // State updaters
  setIsInitiator: (value) => set({ isInitiator: value }),
  setSignal: (value) => set({ signal: value }),
  setRemoteSignal: (value) => set({ remoteSignal: value }),
  setConnected: (value) => set({ connected: value }),
  setMessage: (value) => set({ message: value }),
  setMessages: (updateFn) =>
    set((state) => ({ messages: updateFn(state.messages) })),

  // Create a SimplePeer instance
  createPeer: (initiator) => {
    const peer = new SimplePeer({ initiator, trickle: false });

    peer.on("signal", (data) => {
      console.log("Generated signal:", data);
      set({ signal: JSON.stringify(data) });
    });

    peer.on("connect", () => {
      console.log("Peer connected successfully!");
      set({ connected: true });
    });

    peer.on("data", (data) => {
      console.log("Received data:", data.toString());
      set((state) => ({
        messages: [
          ...state.messages,
          { sender: "peer", text: data.toString(), time: new Date().toLocaleTimeString() },
        ],
      }));
    });

    set({ peer }); // Store the peer instance
    console.log("Peer created:", peer);
  },

  // Handle connection using remote signal
  handleConnect: () => {
    const { peer, remoteSignal } = get();

    if (!remoteSignal.trim()) {
      console.error("Remote signal is empty.");
      return;
    }

    try {
      const signalData = JSON.parse(remoteSignal);
      peer.signal(signalData); // Signal the peer
      console.log("Signaled peer with:", signalData);
    } catch (error) {
      console.error("Invalid signal data:", error);
    }
  },

  // Send a message via the peer
  sendMessage: () => {
    const { peer, connected, message } = get();

    if (!peer || !connected) {
      console.error("Peer not connected.");
      return;
    }

    if (!message.trim()) {
      console.error("Cannot send an empty message.");
      return;
    }

    console.log("Sending message:", message);
    peer.send(message);
    set((state) => ({
      messages: [
        ...state.messages,
        { sender: "me", text: message, time: new Date().toLocaleTimeString() },
      ],
      message: "", // Clear the input field
    }));
  },
}));
