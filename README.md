# Make Real

> Original repository: [makereal.tldraw.com](https://makereal.tldraw.com)

This repo makes some changes to original repo to make the app:

1. 🖥️ Support call customizing OpenAI API endpoint on the backend
2. 🐳 Deploy by Docker with preconfigured API key

## Usage

### Not using Docker

1. Clone this repository: `git clone https://github.com/jtsang4/make-real.git`
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. (optional) Set environment variables to preconfigure the OpenAI key:
    1. `cp .env.local.example .env.local`
    2. Set the `OPENAI_API_KEY` environment variable
    3. Set the `OPENAI_BASE_URL` environment variable if you want to customize OpenAI API endpoint
5. Run: `npm run start`
6. Open [localhost:3000](localhost:3000) and make some stuff real!

### Using Docker

```
docker run -p 3000:3000 wtzeng/make-real:latest
```

Then open [localhost:3000](localhost:3000) and make some stuff real!

If you want to customize OpenAI key and endpoint, reference to the step 4 in the "Not using Docker" section above then set relevant environment variables.

## How it works

Make Real is built with [tldraw](https://tldraw.dev), a very good React library for
creating whiteboards and other infinite canvas experiences.

To use it, first draw a mockup for a piece of UI. When
you're ready, select the drawing, and press the Make Real button.
We'll capture an image of your selection, and send it to
[OpenAI's GPT-4V](https://platform.openai.com/docs/guides/vision) along with
instructions to turn it into a HTML file.

We take the HTML response and add it to a tldraw
[custom shape](https://tldraw.dev/docs/shapes#Custom-shapes). The custom shape
shows the response in an iframe so that you can interact with it on the canvas. If you
want to iterate on the response, annotate the iframe, select it all, and press 'Make Real' again.

## To make changes

To change how Make Real works, start from the [`makeReal()`](./app/makeReal.tsx)
function. From there, you can change the prompt that gets sent to gpt-4.

If you'd like Make Real to create something other than HTML, you'll need to
either update the [`PreviewShape`](./app/PreviewShape/PreviewShape.tsx) to
display something different, or use one of tldraw's built-in shapes like image
or text.

## The dangerous API key input method

For prototyping or at least until the vision APIs are able to support higher usage limits, we've also included the `RiskyButCoolAPIKeyInput`, similar to the one found on [makereal.tldraw.com](https://makereal.tldraw.com). Please use this as carefully and ethically as you can, as users should be reluctant to add API keys to public sites.
