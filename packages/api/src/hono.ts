import { Hono } from "hono";
import { env } from "@udittt/env/server";

const app = new Hono().basePath("/api/hono");

app.get("/spotify", async (c) => {
  try {
    const res = await fetch("https://api.lanyard.rest/v1/users/480285300484997122");
    const data = await res.json() as any;
    
    if (data.success && data.data.spotify) {
      const spotify = data.data.spotify;
      return c.json({
        isPlaying: true,
        song: spotify.song,
        artist: spotify.artist,
        albumArt: spotify.album_art_url,
      });
    }
  } catch (e) {
    console.error("Lanyard spotify fetch error", e);
  }

  return c.json({
    isPlaying: false,
    song: null,
    artist: null,
    albumArt: null,
  });
});

app.get("/presence", async (c) => {
  try {
    const res = await fetch("https://api.lanyard.rest/v1/users/480285300484997122");
    const data = await res.json() as any;
    
    if (data.success) {
      const p = data.data;
      const activity = p.activities?.find((a: any) => a.type === 0) || p.activities?.[0]; // Get playing activity or first
      
      return c.json({
        status: p.discord_status,
        activity: activity ? {
          name: activity.name,
          details: activity.details,
          state: activity.state
        } : null
      });
    }
  } catch (e) {
    console.error("Lanyard fetch error", e);
  }
  
  return c.json({
    status: "offline",
    activity: null
  });
});

app.post("/contact", async (c) => {
  try {
    const body = await c.req.json();
    const message = body.message;
    
    if (!message) {
      return c.json({ success: false, error: "No message provided" }, 400);
    }

    // Using the validated env from @udittt/env/server
    const webhookUrl = env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.warn("DISCORD_WEBHOOK_URL is not set");
      // Fallback for dev if not set
      return c.json({ success: true, warning: "Webhook URL not configured, but received message." });
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `**New Contact Form Submission**\n\n\`\`\`\n${message}\n\`\`\``
      })
    });

    if (res.ok) {
      return c.json({ success: true });
    } else {
      throw new Error("Discord API rejected the payload");
    }
  } catch (e) {
    console.error("Contact form error", e);
    return c.json({ success: false, error: "Failed to send message" }, 500);
  }
});

export type AppType = typeof app;
export { app };
