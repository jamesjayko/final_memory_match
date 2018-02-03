function Model() {
  this.deck = [];
  this.games_played = 0;
  this.match_count = 0;
  this.attempts = 0;
  this.accuracy = 0;
  this.happy_points = 64;
  this.keep_going = false;
  this.clickable = true;
  this.first_card = null;
  this.first_rsc = null;
  this.second_card = null;
  this.second_rsc = null;
  this.eras = ["ancient", "renaissance", "modern"];
  this.eras_index = 0;
  this.theme_music = new Audio("sounds/civ_theme_music.mp3");
  this.match_found = new Audio("sounds/match_found.mp3");
  this.new_era = new Audio("sounds/new_era.mp3");
  this.you_lose = new Audio("sounds/you_lose.mp3");
  this.modal = null;
}

var model = new Model();

var cards = [
  {
    ancient: "images/card_back1.png",
    renaissance: "images/card_back2.png",
    modern: "images/card_back3.png",
    front: "images/f_cotton.png",
    resource: "cotton"
  },
  {
    ancient: "images/card_back1.png",
    renaissance: "images/card_back2.png",
    modern: "images/card_back3.png",
    front: "images/f_spices.png",
    resource: "spices"
  },
  {
    ancient: "images/card_back1.png",
    renaissance: "images/card_back2.png",
    modern: "images/card_back3.png",
    front: "images/f_salt.png",
    resource: "salt"
  },
  {
    ancient: "images/card_back1.png",
    renaissance: "images/card_back2.png",
    modern: "images/card_back3.png",
    front: "images/f_truffles.png",
    resource: "truffles"
  },
  {
    ancient: "images/card_back1.png",
    renaissance: "images/card_back2.png",
    modern: "images/card_back3.png",
    front: "images/f_silk.png",
    resource: "silk"
  },
  {
    ancient: "images/card_back1.png",
    renaissance: "images/card_back2.png",
    modern: "images/card_back3.png",
    front: "images/f_wine.png",
    resource: "wine"
  },
  {
    ancient: "images/card_back1.png",
    renaissance: "images/card_back2.png",
    modern: "images/card_back3.png",
    front: "images/f_gold.png",
    resource: "gold"
  },
  {
    ancient: "images/card_back1.png",
    renaissance: "images/card_back2.png",
    modern: "images/card_back3.png",
    front: "images/f_pearl.png",
    resource: "pearls"
  },
  {
    ancient: "images/card_back1.png",
    renaissance: "images/card_back2.png",
    modern: "images/card_back3.png",
    front: "images/f_cocoa.png",
    resource: "cocoa"
  }
];
