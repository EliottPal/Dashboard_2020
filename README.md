# Dashboard_2020



## Project overview: 

The Dashboard project consists in the creation of a web application.  
This application is a customizable dashboard which integrates configurable widgets from different services.  
This project was developped using uses the following languages:  
- Back-end → NodeJs
- Front-end → React
- Database → MongoDb
  
Here are the ressources you can find in the `documentation/` folder:  
- User's guide 
- Ux diagrams
- Technical documentation

## Widgets implemented:  
Widgets from a service need an OAuth2 authentication on the corresponding service.  
Widgets with "no service" specified do not need an authentication.  
- Youtube Service:
  - Youtube channel subscribers count
  - Youtube channel last video
- Spotify Service:
  - Artist top tracks
  - User public playlists
- Github Service:
  - Repository last 30 pushs
  - User public repositories
  (Note that for this service, if you can't sign in, just try again or try to sign out from actual github session and test again few seconds after)
- Weather (No service):
  - Current weather for a city
- Money (No service):
  - Change rate between € and an other currency  
  
## Examples:
  
![image](https://user-images.githubusercontent.com/44638280/100334886-a0aa0000-2fd4-11eb-8d6f-e501d9ccd7f9.png)

![image](https://user-images.githubusercontent.com/44638280/100334953-b3243980-2fd4-11eb-8aca-c9d3fb543d0a.png)
 

### Made by [Rodolphe Dupuis](https://github.com/rodolphedps) & [Eliott Palueau](https://github.com/EliottPal)
