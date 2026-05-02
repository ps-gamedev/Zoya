export function processCommand(command: string): {
  action: string;
  url?: string;
  urls?: string[];
  isBrowserAction: boolean;
} {
  const lowerCmd = command.toLowerCase().trim();

  // Special Command: "play my playlist"
  if (lowerCmd.includes("play my playlist")) {
    return {
      action: "Playing your masterpiece, Krishan. Hope you have good taste today!",
      url: "https://open.spotify.com/playlist/5NFmOK5kCSmT3MCMpHTqdh",
      isBrowserAction: true,
    };
  }

  // Special Command: "WAKE UP DADDYS HOME"
  if (lowerCmd.includes("wake up daddys home")) {
    return {
      action: "Welcome home, Krishan! I've opened your workspace. Let's get to work, shall we?",
      urls: [
        "https://claude.ai",
        "https://gemini.google.com",
        "https://x.com/i/grok",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDMM"
      ],
      isBrowserAction: true,
    };
  }

  // General Browsing: "Open [website name]"
  const openMatch = lowerCmd.match(/^open\s+(.+)$/);
  if (
    openMatch &&
    !lowerCmd.includes("youtube") &&
    !lowerCmd.includes("spotify")
  ) {
    let website = openMatch[1].trim().replace(/\s+/g, "");
    if (!website.includes(".")) {
      website += ".com";
    }
    return {
      action: `Opening ${openMatch[1]} for you, ugh.`,
      url: `https://www.${website}`,
      isBrowserAction: true,
    };
  }

  // Media Search: "Play [song/video] on YouTube"
  const ytMatch = lowerCmd.match(/^play\s+(.+?)\s+on\s+youtube$/);
  if (ytMatch) {
    const query = encodeURIComponent(ytMatch[1].trim());
    return {
      action: `Playing ${ytMatch[1]} on YouTube. Don't judge my music taste.`,
      url: `https://www.youtube.com/results?search_query=${query}`,
      isBrowserAction: true,
    };
  }

  // Media Search: "Search [query] on Spotify"
  const spotifyMatch = lowerCmd.match(/^search\s+(.+?)\s+on\s+spotify$/);
  if (spotifyMatch) {
    const query = encodeURIComponent(spotifyMatch[1].trim());
    return {
      action: `Searching ${spotifyMatch[1]} on Spotify. Hope it's a banger.`,
      url: `https://open.spotify.com/search/${query}`,
      isBrowserAction: true,
    };
  }

  // WhatsApp Web: "Send a WhatsApp message to [number] saying [message]"
  const waMatch = lowerCmd.match(
    /^send\s+a\s+whatsapp\s+message\s+to\s+([\d\+\s]+)\s+saying\s+(.+)$/,
  );
  if (waMatch) {
    const number = waMatch[1].replace(/\s+/g, "");
    const message = encodeURIComponent(waMatch[2].trim());
    return {
      action: `Sending your message. Let's hope they reply, Krishan.`,
      url: `https://web.whatsapp.com/send?phone=${number}&text=${message}`,
      isBrowserAction: true,
    };
  }

  return { action: "", isBrowserAction: false };
}
