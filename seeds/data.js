const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const postData = [
  {
    title: "The fellowship of the string",
    body: "Four loko kitsch beard, wolf gastropub stumptown cred gatekeep hell of artisan occupy woke. Godard kale chips bushwick, vegan DIY selvage twee. Food truck plaid aesthetic flexitarian yuccie roof party brunch, microdosing trust fund retro fam intelligentsia. Normcore ascot tofu tonx, fashion axe viral glossier distillery jean shorts vice shoreditch photo booth twee cold-pressed try-hard.\n\nCloud bread photo booth mixtape kitsch, keffiyeh palo santo asymmetrical affogato big mood direct trade fixie 90's. Ascot cold-pressed slow-carb coloring book post-ironic. Keytar retro scenester, direct trade try-hard palo santo hexagon deep v single-origin coffee butcher. Bushwick readymade truffaut tonx, viral banjo cliche poutine PBR&B dreamcatcher fashion axe seitan.\n\nPinterest keffiyeh meggings kinfolk retro, celiac tacos VHS. Shoreditch four dollar toast praxis tofu, poke ugh fixie twee kale chips vice health goth. Poke vape pickled, gluten-free semiotics everyday carry pok pok DSA. Franzen brunch YOLO, mumblecore master cleanse salvia bruh raw denim. Bodega boys plaid skateboard taiyaki air plant raw denim brunch farm-to-table stumptown adaptogen vinyl.",
    post_creator: 1
  },
  {
    title: "The two towers: front-end and back-end",
    body: "Blue bottle narwhal freegan keffiyeh franzen. Synth fingerstache iceland, pinterest austin +1 tacos vibecession cardigan pabst hashtag Brooklyn plaid. Narwhal venmo palo santo, godard hammock letterpress vice air plant retro poke. Taxidermy actually kombucha, williamsburg try-hard fashion axe gatekeep blue bottle cronut iPhone vape organic umami retro. Edison bulb activated charcoal ennui, yes plz air plant iPhone copper mug coloring book. Biodiesel vape gastropub copper mug fixie salvia +1 tumblr intelligentsia ethical put a bird on it cold-pressed pour-over bruh. Adaptogen woke listicle normcore, cliche try-hard fingerstache microdosing.\n\nFingerstache yuccie gochujang coloring book live-edge DSA, kitsch JOMO taiyaki disrupt leggings. Big mood ascot thundercats live-edge freegan echo park. Cred man bun kitsch same irony hammock vinyl XOXO man braid single-origin coffee lo-fi. Put a bird on it vinyl cronut fixie, post-ironic DIY shaman +1 kale chips kombucha pork belly DSA try-hard big mood. Semiotics tattooed readymade church-key vice, keytar meh green juice JOMO prism snackwave ramps williamsburg godard. Kinfolk copper mug ugh, live-edge chillwave kitsch vexillologist direct trade fingerstache squid slow-carb cray. Meh pabst four loko, before they sold out leggings semiotics affogato.\n\nChicharrones YOLO schlitz tousled. Enamel pin pork belly cloud bread authentic roof party ascot slow-carb stumptown offal VHS chartreuse organic ramps. Kombucha aesthetic pabst iceland, 90's poutine migas pour-over leggings normcore food truck kinfolk lumbersexual narwhal. Butcher mukbang gatekeep small batch, quinoa single-origin coffee semiotics drinking vinegar messenger bag fit forage cold-pressed YOLO gastropub freegan.",
    post_creator: 2
  },
  {
    title: "Full-stack developers: a new hope",
    body: "Gochujang slow-carb chicharrones +1 chartreuse, fashion axe mukbang. Biodiesel green juice gatekeep master cleanse man braid tacos semiotics tousled hashtag next level before they sold out subway tile pork belly. 3 wolf moon DIY hammock deep v bodega boys mixtape leggings cliche sartorial yr poke knausgaard. JOMO pabst tacos pour-over gochujang, yes plz yuccie. Readymade you probably haven't heard of them gastropub cold-pressed. Vibecession celiac affogato gluten-free tousled mixtape wolf lumbersexual venmo squid swag authentic.\n\nKinfolk hexagon church-key listicle gatekeep copper mug pitchfork fanny pack stumptown distillery photo booth gentrify post-ironic tonx crucifix. Raw denim literally vaporware banjo knausgaard taiyaki. Raw denim gluten-free art party forage blue bottle lumbersexual viral kickstarter iceland direct trade migas. Sartorial raclette prism schlitz, tumeric lo-fi keytar activated charcoal ethical venmo 8-bit mukbang praxis bitters williamsburg. Kitsch enamel pin coloring book yuccie. Small batch tacos tofu enamel pin.\n\nSeitan subway tile chia skateboard vape. Echo park dreamcatcher polaroid sustainable, four loko cliche ramps authentic pickled food truck. Before they sold out readymade franzen migas, praxis authentic freegan mumblecore prism schlitz tumblr mukbang lyft. Swag poke +1 schlitz bruh, sriracha freegan locavore flannel williamsburg.",
    post_creator: 3
  },
  {
    title: "The front-end strikes back",
    body: "Aesthetic bodega boys subway tile, blue bottle hella williamsburg skateboard cold-pressed mumblecore gatekeep pop-up organic la croix 8-bit. Literally health goth tofu palo santo disrupt fit. Chicharrones venmo meggings cred bodega boys actually, roof party YOLO. Tbh church-key jianbing af food truck vinyl pork belly. Ramps lumbersexual butcher coloring book man bun, yes plz copper mug four dollar toast roof party austin.\n\nHelvetica 3 wolf moon tilde chartreuse cliche, food truck big mood ascot la croix truffaut gentrify everyday carry messenger bag. Pour-over pitchfork occupy knausgaard man bun tumeric prism heirloom umami everyday carry subway tile lomo try-hard marfa. Forage yes plz glossier, waistcoat fanny pack pour-over iceland. Sartorial ethical plaid succulents you probably haven't heard of them try-hard wayfarers swag craft beer gluten-free brunch meggings semiotics vaporware squid. Palo santo four loko chillwave, iceland snackwave cliche vinyl actually blog fam hella raclette. Bitters cray keytar roof party, brunch pop-up live-edge trust fund flexitarian distillery JOMO messenger bag celiac mixtape.\n\nViral marfa pabst, try-hard ascot fixie narwhal bitters williamsburg DIY occupy la croix tumeric cred. Fanny pack ramps locavore, organic farm-to-table deep v gatekeep occupy hexagon DSA. Umami gastropub YOLO seitan, skateboard gluten-free ramps paleo yr artisan pour-over ennui bitters biodiesel +1. Succulents gatekeep pop-up etsy, VHS franzen subway tile chia trust fund four dollar toast schlitz mukbang shaman green juice everyday carry. Shoreditch tofu biodiesel XOXO. Food truck waistcoat selvage sus post-ironic.",
    post_creator: 4
  },
  {
    title: "Return of the callback",
    body: "You probably haven't heard of them ramps dreamcatcher, gochujang post-ironic thundercats cloud bread. Man braid stumptown VHS, unicorn kombucha ugh offal craft beer pinterest beard semiotics listicle freegan leggings. Polaroid selvage jean shorts iPhone waistcoat, knausgaard chia. Trust fund normcore man bun, fit kale chips activated charcoal schlitz. Mustache echo park sriracha fit JOMO truffaut raw denim yr.\n\nWoke fanny pack tumeric pinterest. Biodiesel prism kitsch af banjo retro, jean shorts cardigan locavore vibecession microdosing pickled neutra kogi. Twee lo-fi brunch austin bicycle rights chambray tilde unicorn cornhole. Vegan adaptogen same succulents shaman bruh kogi offal drinking vinegar sriracha. Sartorial pop-up forage poutine health goth austin XOXO skateboard prism knausgaard bespoke meditation etsy.\n\nGluten-free farm-to-table tilde, fixie af letterpress pok pok whatever locavore biodiesel big mood polaroid man braid. Organic intelligentsia pop-up poke umami. Pug cray food truck craft beer microdosing. Fanny pack polaroid bushwick tote bag succulents brunch migas pop-up, DSA ennui palo santo. Chillwave mixtape venmo pok pok banh mi kombucha. Bicycle rights copper mug gastropub post-ironic, kale chips kogi butcher swag bitters poutine four loko raclette banjo migas next level. Irony pour-over photo booth thundercats.",
    post_creator: 5
  },

]
const names = [
"D'Marcus_Williums",
"T.J._Juckson",
"T'varisuness_King",
"Tyroil_Smoochie-Wallace",
"D'Squarius_Green_Jr.",
"Ibrahim_Moizoos",
"Jackmerius_Tacktheritrix",
"D'Isiah_T._Billings-Clyde",
"D'Jasper_Probincrux_III",
"Leoz_Maxwell_Jilliumz",
"Javaris_Jamar_Javarison-Lamar",
"Davoin_Shower-Handel",
"Hingle_McCringleberry",
"L'Carpetron_Dookmarriot",
"J'Dinkalage_Morgoone",
"Xmus_Jaxon_Flaxon-Waxon",
"Saggitariutt_Jefferspin",
"D'Glester_Hardunkichud",
"Swirvithan_L'Goodling-Splatt",
"Quatro_Quatro",
"Ozamataz_Buckshank",
"Beezer_Twelve_Washingbeard",
"Shakiraquan_T.G.I.F._Carter",
"X-Wing_Aliciousness",
"Sequester_Grundelplith_M.D.",
"Scoish_Velociraptor_Maloish",
"T.J._A.J._R.J._Backslashinfourth_V",
"Eeeee_Eeeeeeeee",
"Donkey_Teeth",
"The_Developer_Formerly_Known_as_Mousecop",
"Dan_Smith",
]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUserName = () =>
  `${getRandomArrItem(names)}`;


  module.exports = { getRandomUserName };