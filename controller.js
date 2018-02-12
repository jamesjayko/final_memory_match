var Controller = {
  get_deck() {
    // loops thru the obj array to double itself into a new array and calls the random_deck().
    while (model.deck.length < 10) {
      for (var i = 0; i < cards.length; i++) {
        model.deck.push(cards[i]);
      }
    }
    this.random_deck();
  },

  random_deck() {
    // randomizes the deck made from get_deck() and calls the set_deck().
    for (var i = model.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = model.deck[i];
      model.deck[i] = model.deck[j];
      model.deck[j] = temp;
    }
    View.set_deck();
  },

  flipIt(card) {
    // applies new rotation degrees to the cards to "flip".
    $(card)
      .find("div.back")
      .css({
        transform: "perspective(600px) rotateY(180deg)"
      });
    $(card)
      .find("div.front")
      .css({
        transform: "perspective(600px) rotateY(0deg)"
      });
  },

  flipIt_back(f_card, s_card) {
    // changes the rotateY degree back to it's original state.
    $(f_card)
      .find("div.back")
      .css({
        transform: "perspective(600px) rotateY(0deg)"
      });
    $(f_card)
      .find("div.front")
      .css({
        transform: "perspective(600px) rotateY(180deg)"
      });

    $(s_card)
      .find("div.back")
      .css({
        transform: "perspective(600px) rotateY(0deg)"
      });
    $(s_card)
      .find("div.front")
      .css({
        transform: "perspective(600px) rotateY(180deg)"
      });
  },

  click() {
    // cards by set_deck() with click handles will trigger this.
    if (
      $(this)
        .find("div.back")
        .attr("style") === "transform: perspective(600px) rotateY(180deg);" ||
      model.clickable === false
    ) {
      // console.log("already clicked");
      return;
    }

    if (model.clickable) {
      Controller.flipIt(this);
    } else {
      return;
    }

    if (model.first_rsc === null) {
      model.first_card = this;
      model.first_rsc = $(this).attr("resource");
      // console.log(model.first_rsc);
    } else {
      model.second_card = this;
      model.second_rsc = $(this).attr("resource");
      model.clickable = false;
      // console.log(model.second_rsc);
      Controller.check_match();
    }
  },

  check_match() {
    if (model.first_rsc === model.second_rsc) {
      model.match_count++;
      model.happy_points += 8;
      // console.log("they match!");
      model.match_found.play();
      this.check_win();
      if (model.match_count % 3 === 0 && model.eras_index < 3) {
        model.eras_index++;
        View.set_era_change();
      }
      // return true;
    } else {
      model.first_rsc = null;
      model.second_rsc = null;
      // console.log("no match!");
      setTimeout(function() {
        Controller.flipIt_back(
          model.first_card,
          model.second_card,
          (model.clickable = true)
        );
      }, 1200);
      // return false;
    }
    model.attempts++;
    model.accuracy = parseInt(model.match_count / model.attempts * 100);
    View.display_stats();
  },

  check_win() {
    model.first_rsc = null;
    model.second_rsc = null;
    model.clickable = true;
    if (model.match_count === 9) {
      // console.log("you got 9 matches YOU WIN");
      model.games_played++;
      model.happy_points += 8;
      model.accuracy = parseInt(model.match_count / model.attempts * 100);
      model.keep_going = false;
      View.display_stats();
      $(".close_modal_button").css("display", "none");
      View.open_modal_handle("images/win_modal.png");
    }
  },

  reset_game() {
    model.theme_music.setAttribute("src", "");
    model = new Model();
    temp_games_played++;
    model.games_played = temp_games_played; // global variable used to hold past number of games
    $("#app_area").css("background-image", "url(images/bg1.jpg)");
    $("#game_area .flip3d").remove();
    View.display_stats();
    $(".pause_butt").off("click");
    $(".reset_butt").off("click");
    View.initialize_game();
  }
};

var temp_games_played = 0;
