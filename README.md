> This is a fork of [Tldraw|Make-Real](https://github.com/tldraw/make-real).

## Added Features

- 🔑 Config default API key and API base
- 📡 Request on the backend
- 🔒 Authentication before using
- 🐳 Deployment by Docker

## Make Real

Try it out at [makereal.tldraw.com](https://makereal.tldraw.com/)

https://github.com/tldraw/draw-a-ui/assets/23072548/aa181d77-6ce6-41de-990d-e5905153579e

- To learn more about this project [read our blog post](https://tldraw.substack.com/p/make-real-the-story-so-far)
- To read our guide to using the app [visit our discord](https://discord.gg/t7h8ECmqDW)

## Deployment

Recommend to deploy by Docker:

```bash
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your-api-key
  -e OPENAI_BASE_URL=https://api.openai.com/v1
  -e AUTH_SECRET=your_auth_secret
  -e USERNAME=username
  -e PASSWORD=password -d wtzeng/make-real
```

then visit [https://localhost:3000](https://localhost:300) and
