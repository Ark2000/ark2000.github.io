# TODO

- [ ] 把colorful-life整合到背景中。

# Personal Portfolio Website

A compact, elegant personal portfolio website with a parallax scrolling effect. The website displays a personal card that gradually transitions to the content as you scroll down.

## Features

- Clean, modern UI design
- Parallax scrolling effect
- Responsive layout for all device sizes
- Dynamic content loading from markdown file
- Simple markdown rendering without special formatting

## Setup Instructions

1. **Setup locally:**
   - Simply clone or download this repository
   - Open `index.html` in a browser to view the site

2. **Deploy to GitHub Pages:**
   - Push all files to a GitHub repository
   - Enable GitHub Pages in the repository settings
   - Select the branch to deploy from

3. **Deploy to other hosting providers:**
   - Upload all files to your web hosting provider
   - No server-side processing required; this is a static website

## Customize Content

To update the website content, simply edit the `portfolio.md` file:

- The YAML front matter (between `---` tags) contains personal information displayed on the card
- The markdown content below the front matter is rendered as the main content

## Development

- `index.html` - Main HTML structure
- `styles.css` - All styling for the website
- `script.js` - JavaScript for parallax effect and markdown processing
- `portfolio.md` - Content file

## Requirements

- Modern web browser with JavaScript enabled
- No server-side requirements 