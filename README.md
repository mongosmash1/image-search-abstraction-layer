<b>Image Search Abstraction Layer Microservice</b><br>
freeCodeCamp Image Search Abstraction Layer Microservice Basejump

<b>Objective:</b> Build a full stack JavaScript app that allows you to search for images like <a href="https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10">this</a>, and browse recent search queries like <a href="https://cryptic-ridge-9197.herokuapp.com/api/latest/imagesearch/">this</a>. Then deploy it to Glitch.

Note that for each project, you should create a new GitHub repository and a new Glitch project. If you can't remember how to do this, revisit <a href="https://freecodecamp.org/challenges/get-set-for-our-api-development-projects">this</a>.

Here are the specific user stories you should implement for this project:

<b>User Story:</b> I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

<b>User Story:</b> I can paginate through the responses by adding a ?offset=2 parameter to the URL.

<b>User Story:</b> I can get a list of the most recently submitted search strings.

<b>Example image search with pagination</b><br>
<code>https://ms1-isal-micro.glitch.me/api/imagesearch/lolcats%20funny?offset=2</code>

<b>Example results</b><br>
<code>[{"imageUrl":"https://i.ytimg.com/vi/dWpGC6Fg0io/hqdefault.jpg","altText":"Jas Patrick sings Snow Day starring LOLCats Funny Cats - YouTube","pageUrl":"https://www.youtube.com/watch?v=dWpGC6Fg0io"},{"imageUrl":"http://cdn.smosh.com/wp-content/uploads/legacy.images/smosh-pit/122010/lolcat-jesus.jpg","altText":"30 Best LOLcats Ever | SMOSH","pageUrl":"http://www.smosh.com/articles/30-best-lol-cats-ever"},{"imageUrl":"https://i.ytimg.com/vi/NTB0tZbWAKI/hqdefault.jpg","altText":"The Funniest Cat Video !lolcats.funny cats compilations 2016,funny ...","pageUrl":"https://www.youtube.com/watch?v=NTB0tZbWAKI"},{"imageUrl":"http://4.bp.blogspot.com/-T0s-CCV-57I/TzQTHRix-qI/AAAAAAAAn6E/fEjbDk9Oqf0/s1600/Funny+Cat+Pics+%252865%2529.JPG","altText":"Funny Christmas Pictures: Funny Cute Cat Pictures Lolcats","pageUrl":"http://afunnychristmasictures.blogspot.com/2015/11/funny-cute-cat-pictures-lolcats.html"},{"imageUrl":"http://1.bp.blogspot.com/_06_Cin6SbPI/SUk4AgbjmJI/AAAAAAAAAOY/H-toDknbBZI/s400/funny-pictures-cat-complains-about-clumsy-cat.jpg","altText":"The Snuggle Factory: Update: LOLcats Still Funny","pageUrl":"http://thesnugglefactory.blogspot.com/2008/12/update-lolcats-still-funny.html"},{"imageUrl":"http://i0.kym-cdn.com/photos/images/facebook/000/024/740/lolcats-funny-pictures-halp-not-for-sale.jpg","altText":"Image - 24740] | LOLcats | Know Your Meme","pageUrl":"http://knowyourmeme.com/photos/24740-lolcats"},{"imageUrl":"https://img.scoop.it/nCDfJ08MpKhEdCcEztDllTl72eJkfbmt4t8yenImKBVvK0kTmF0xjctABnaLJIm9","altText":"Lolcats: Trust me. - Lolcats - Funny Pictures o...","pageUrl":"https://www.scoop.it/t/crazy-cats/p/1661402930/2012/04/25/lolcats-trust-me-lolcats-funny-pictures-of-cats-i-can-has"},{"imageUrl":"https://i0.wp.com/crazyasabagofhammers.com/wp-content/uploads/2017/06/LOLCATS-5.jpg?resize=780%2C585&ssl=1","altText":"LOLCATS 5 - Crazy As a Bag of Hammers - #Humor #Funny #LOL #MEMES","pageUrl":"https://crazyasabagofhammers.com/lolcats-5/"},{"imageUrl":"http://cosmetic-candy.com/wp-content/uploads/2008/12/cat-blanchett-lolcats-n-funny-pictures-of-cats-i-can-has-cheezburger.jpg","altText":"cat-blanchett-lolcats-n-funny-pictures-of-cats-i-can-has ...","pageUrl":"http://cosmetic-candy.com/skii-air-touch-foundation/cat-blanchett-lolcats-n-funny-pictures-of-cats-i-can-has-cheezburgerjpg/"},{"imageUrl":"https://i0.wp.com/crazyasabagofhammers.com/wp-content/uploads/2017/11/LOLCATS-3.jpg?w=780&ssl=1","altText":"LOLCATS 3 - Crazy As a Bag of Hammers - #Humor #Funny #LOL #MEMES","pageUrl":"https://crazyasabagofhammers.com/lolcats-3-2/"}]</code>

<br>
<b>Example usage of most recently submitted searches</b><br>
<code>https://ms1-isal-micro.glitch.me/api/latest/imagesearch/</code>

<b>Example results</b><br>
<code>[{"searchTerm":"lolcats funny","searchTime":"2018-05-24T23:03:17.481Z"},{"searchTerm":"cool ux designs","searchTime":"2018-05-24T23:03:09.460Z"},{"searchTerm":"vegetable gardens","searchTime":"2018-05-24T23:02:51.271Z"},{"searchTerm":"swimming pools","searchTime":"2018-05-24T23:02:37.697Z"},{"searchTerm":"red lawnmower","searchTime":"2018-05-24T23:02:11.192Z"},{"searchTerm":"street signs","searchTime":"2018-05-24T22:59:29.118Z"},{"searchTerm":"green awning","searchTime":"2018-05-24T22:58:51.339Z"},{"searchTerm":"funny memes","searchTime":"2018-05-24T22:58:24.161Z"}]</code>