# 🎧 Spotefy

> A lightweight web audio player that can be hosted and accessed with any platform.

### 📁 File Structure 
    .
    ├── music                     # Music folder
    │   ├── category 1   
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

## ▶️ How to run/host
1. Clone the repo and make sure the file structure is correct as shown on top
2. Open a terminal and cd into the cloned folder
3. Type in "node index.js"
4. Then, open another terminal type in "lt -p 3000 -s spotefy --print-requests"
5. Open the link printed out in the terminal ("https://spotefy.loca.lt/")
5. 🎉 Thats it, you have succesfully hosted the application 

## 📙 About
- Coded in [<img align="left" alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />][webdevplaylist]HTML, [<img align="left" alt="CSS3" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />][cssplaylist]CSS and [<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />][jsplaylist]JavaScript
- Libraries: 

## 📈 Improvements To be Made 
- 🔍 Search function 
- 🎨 Add more color contrast 
- 🖱️ Auto scroll and focus to the current playing track 
- Display types of category in frontend

## ⚠️ Note 
- You are able to change the subdomain of the link by altering the command "lt -p 3000 -s [SUBDOMAIN NAME] --print-requests".
- Change the OGG_EXT constant in "index.js" to false if you decided not to add ogg music file.
- Currently only supports up to one category in the file structure, so be sure to put all the musics into one category file.
- Media audio controls is not supported in IOS devices (Uable to next track/prev track in the lock screen).
