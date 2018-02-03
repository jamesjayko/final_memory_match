$(document).ready(function() {
  View.initialize_game(); // init the game
});

var timer;

var View = {
  initialize_game() {
    model.theme_music.play();
    clearInterval(timer);
    this.open_modal_handle("images/start_modal.png");
    Controller.get_deck(); // calls to double the imgs to make the deck and it's callback functions.
    this.display_stats();
    $(".pause_butt")
      .text("PAUSE")
      .on("click", this.pause_theme_music); // click handle for reset button.
    $(".reset_butt")
      .text("RESET")
      .on("click", Controller.reset_game);
  },

  pause_theme_music() {
    $(".pause_butt").text(!model.theme_music.paused ? "PLAY" : "PAUSE");

    if (!model.theme_music.paused) {
      model.theme_music.pause();
    } else {
      model.theme_music.play();
    }
  },

  set_deck() {
    // random_deck() will call this to put deck on DOM with jquery
    for (var i = 0; i < model.deck.length; i++) {
      let current_back = model.deck[i][model.eras[model.eras_index]];
      let current_front = model.deck[i].front;
      let current_back_img = $("<img>").attr("src", current_back);
      let current_back_div = $("<div>")
        .append(current_back_img)
        .addClass("back");
      let current_front_img = $("<img>").attr("src", current_front);
      let current_front_div = $("<div>")
        .append(current_front_img)
        .addClass("front");
      let current_card_div = $("<div>")
        .append(current_front_div, current_back_div)
        .attr("resource", model.deck[i].resource)
        .addClass("flip3d")
        .on("click", Controller.click);
      $("#game_area").append(current_card_div);
    }
  },

  set_era_change() {
    model.new_era.play();
    if (model.eras[model.eras_index] === "renaissance") {
      this.open_modal_handle("images/renaissance_modal.png");
      $("#app_area").css("background-image", "url(images/bg2.jpg)");
    } else if (model.eras[model.eras_index] === "modern") {
      this.open_modal_handle("images/modern_modal.png");
      $("#app_area").css("background-image", "url(images/bg3.jpg)");
    }

    for (var i = 0; i < model.deck.length; i++) {
      $(".back img").remove();
      let current_back_img = $("<img>").attr(
        "src",
        model.deck[i][model.eras[model.eras_index]]
      );
      $(".back").append(current_back_img);
    }
  },

  happy_bar() {
    // how much to decrement happy_points and golden age will trigger 1/2 the amount
    if (model.keep_going == true) {
      if (model.happy_points <= 64 && model.happy_points > 0) {
        model.happy_points -= 2;
        console.log("it's going down by 2", model.happy_points);
      } else if (model.happy_points > 64) {
        model.happy_points -= 1;
        console.log("it's going down by 1", model.happy_points);
      } else if (model.happy_points === 0 && model.keep_going === true) {
        model.you_lose.play();
        this.open_modal_handle("images/you_lose_modal.png");
      }
      $("#civ_happy_bar").css("width", model.happy_points + "%"); // adjusts the width of the happiness bar
    } else {
      return;
    }
  },

  display_stats() {
    $("#game_played").text(model.games_played);
    $("#attempts").text(model.attempts);
    if (isNaN(model.accuracy)) {
      $("#accuracy").text("0%");
    } else {
      $("#accuracy").text(model.accuracy + "%");
    }
  },

  open_modal_handle(modal_custom) {
    console.log("modal opened!");
    model.keep_going = false;
    $(".modal_content img").remove();
    let modal_img = $("<img>")
      .attr("src", modal_custom)
      .css("width", "100%")
      .css("height", "100%");
    $(".modal_content").append(modal_img);
    $(".close_modal_button").remove();
    let close_button = $("<button>")
      .attr("type", "button")
      .attr("data-dismiss", "modal")
      .addClass("close_modal_button btn btn-info")
      .text("Close");
    $(".close_button_container").append(close_button);
    model.modal = document.getElementById("modal");
    model.modal.style.display = "block";
    this.close_modal_handle();
  },

  close_modal_handle() {
    clearInterval(timer);
    $("#modal, .close_modal_button").on("click", () => {
      model.modal.style.display = "none";
      if (model.happy_points === 0 || model.match_count === 9) {
        model.keep_going = false;
        model.clickable = false;
      } else {
        model.keep_going = true;
      }
      timer = setInterval(() => {
        this.happy_bar();
      }, 1500);
      $("#modal, .close_modal_button").off("click");
    });
  }
};
