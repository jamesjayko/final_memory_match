$(document).ready(function() {
  View.initialize_game(); // init the game
});

var timer;

var View = {
  initialize_game() {
    this.check_theme_music();
    clearInterval(timer);
    this.open_modal_handle("images/start_modal.png");
    Controller.get_deck(); // calls to double the imgs to make the deck and it's callback functions.
    $("#civ_happy_bar").css("width", model.happy_points + "%"); // adjusts the width of the happiness bar
    this.display_stats(); 
    $(".reset_btn")
      .text("RESET")
      .on("click", Controller.reset_game); // click handle for reset button.
  },

  check_theme_music() {
    $('.pause_btn').empty();   
    if(localStorage.civ_music !== "true") {
      $(".pause_btn")
      .append('<span class="glyphicon glyphicon-volume-up"></span>')
      .on("click", this.pause_theme_music); // click handle for music pause button.
    } else {
      $(".pause_btn")
      .append('<span class="glyphicon glyphicon-volume-off"></span>')
      .on("click", this.pause_theme_music); // click handle for music pause button.
      model.theme_music.play();
    }
  },

  pause_theme_music() {
    if (!model.theme_music.paused) {
      $('.pause_btn').empty();
      $('.pause_btn').append('<span class="glyphicon glyphicon-volume-up"></span>');
      model.theme_music.pause();
      localStorage.civ_music = false;
    } else {
      $('.pause_btn').empty();
      $('.pause_btn').append('<span class="glyphicon glyphicon-volume-off"></span>');
      model.theme_music.play();
      localStorage.civ_music = true;
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
    this.happy_bar();
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
    // how much to decrement happy_points and golden age will trigger 1/2 the amount.
    // console.log(model.happy_points);
    if (model.keep_going == true) {
      if (model.happy_points <= 70 && model.happy_points > 0) {
        model.happy_points -= 3;
        if (model.happy_points <= 0) {
          model.happy_points = 0;
        }
        // console.log("it's going down by 2", model.happy_points);
      } else if (model.happy_points > 70) {
        model.happy_points -= 1;
        // console.log("it's going down by 1", model.happy_points);
      } else if (model.happy_points == 0 && model.keep_going == true) {
        model.you_lose.play();
        this.open_modal_handle("images/you_lose_modal.png");
        model.clickable = false;
      }
      $("#civ_happy_bar").css("width", model.happy_points + "%"); // adjusts the width of the happiness bar
    } else {
      $("#civ_happy_bar").css("width", model.happy_points + "%"); // adjusts the width of the happiness bar
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
    // console.log("modal opened!");
    model.keep_going = false;
    clearInterval(timer);    
    $(".modal_content img").remove();
    let modal_img = $("<img>", {
      src: modal_custom,
      class: "modal_size",
    })
    $(".close_modal_button").remove();
    let close_button = $("<button>", {
      type: "button",
      "data-dismiss": "modal",
      class: "close_modal_button btn btn-info",
      text: "Close"
    })
    $(".modal_content").append(modal_img, close_button);    
    model.modal = document.getElementById("modal");
    model.modal.style.display = "block";
    this.close_modal_handle();
  },

  close_modal_handle() {
    $("#modal, .close_modal_button").on("click", () => {
      model.modal.style.display = "none";
      $("#modal, .close_modal_button").off("click");
    });
  }
};
