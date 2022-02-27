# 🎧 Spotefy

> A lightweight web audio player that can be hosted and accessed with any platform.

![frontpage](frontpage.jpg) 

**Link**: https://spotefy.herokuapp.com/


<p>&nbsp;</p>

### 📁 File Structure 
    .
    ├── ...
    ├── music                     # Music folder
    │   ├── mixed                 # Includes mp3 & ogg type
    │   │   ├── track 1
    │   │   └── track 2
    │   ├── category 2   
    │   │   ├── track 3
    │   │   └── ...
    ├── public                    # Public folder (containing files for client)
    │   ├── css                   # CSS folder
    │   ├── img                   # Icon/Image folder
    │   ├── js                    # JS script folder
    │   └── index.html            # Main page
    │   index.js                  # Server file
    └── ...

<p>&nbsp;</p>

## ▶️ How to run/host
1. Clone the repo and make sure the file structure is correct as shown on top
2. Open a terminal and cd into the cloned folder
3. Type in "node index.js"
4. Then, open another terminal type in "lt -p 3000 -s spotefy --print-requests"
5. Open the link printed out in the terminal ("https://spotefy.loca.lt/")
6. 🎉 Congratulations you have succesfully hosted the application.

<p>&nbsp;</p>

## 📙 About
- Coded in <img alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />HTML, <img  alt="CSS3" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />CSS and <img alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />JavaScript
- Tools: <img alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />Node, <img alt="Express" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png" />Express, <img alt="jQuery.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/jquery/jquery.png" />jQuery, localtunnel

<p>&nbsp;</p>

## 📈 Improvements To be Made 
> Maybe never.
- 🔍 Search function 
- 🎨 Add more color contrast 
- 🖱️ Auto scroll and focus to the current playing track 
- Display types of category in frontend
- Play audio from youtube / spotify api

<p>&nbsp;</p>

## ⚠️ Note 
- You are able to change the subdomain of the link by altering the command "lt -p 3000 -s [SUBDOMAIN NAME] --print-requests".
- Change the OGG_EXT constant in "index.js" to false if you decided not to add ogg music file.
- Currently only supports up to one category in the file structure, so be sure to put all the musics into one category file.
- Media audio controls is not supported in IOS devices (Uable to next track/prev track in the lock screen).
