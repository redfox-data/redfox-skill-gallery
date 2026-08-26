# RedFox Skill Gallery / redfox-skill-gallery

> RedFox Skills visual gallery plugin — presents RedFox community skills from `redfox-community-dsh` as cards in the DeepSeek Harness Web UI, ready to use with one click.

## Overview

`redfox-skill-gallery` is a DeepSeek Harness Web plugin. It adds a **RedFox Skills** entry at the bottom of the sidebar. Click it to switch the entire UI into a card-style skill gallery that lists all RedFox community skills from the `redfox-community-dsh` plugin (your local skills are not mixed in).

Each card shows the skill’s Chinese name, slug, and description. You can search in real time, open README details, and insert a skill reference into the input box with one click. If `redfox-community-dsh` is not installed yet, opening the gallery will install it for you automatically.

## Features

- Lists all RedFox community skills from `redfox-community-dsh`.
- Card-style gallery; each card includes Chinese name, slug (technical skill id, e.g. `/bili-ai-feed`), and description.
- Real-time search by Chinese name / slug / description.
- Click a card to view the skill README, with Chinese / English switching.
- Click **Use now** to insert the skill into the input box; you can add or edit your request before sending.
- Auto-installs `redfox-community-dsh` when it is missing.
- Chinese and English UI.

## How to use

### Install

```sh
dsh plugin --profile web add -w github:redfox-data/redfox-skill-gallery
```

Restart `dsh web` after install for the change to take effect.

### Usage

1. After restart, refresh the page and click the **RedFox Skills** button at the bottom of the left sidebar.
2. The gallery shows all RedFox community skills as cards.
3. Type keywords in the top search box to filter by Chinese name / slug / description.
4. Click a card to open the detail panel on the right and read the skill README (switch between Chinese / English).
5. Click **Use now** on a card to insert the skill as `/name` into the input box; add or edit your request, then press Enter to send.
6. Press ESC or click **Close** in the top-right to return to the conversation.

> If `redfox-community-dsh` is not installed, opening the gallery will install it automatically. Restart `dsh web` as prompted when done.

## Uninstall

```sh
dsh plugin --profile web remove redfox-skill-gallery
```
