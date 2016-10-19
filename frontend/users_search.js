const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor() {
    this.$el = $('.users-search');
    this.$input = $('.users-search > input');
    this.$ul = $('.users-search > ul');
    this.$el.on('keyup', e => {
      this.inputVal = this.$input.val();
      this.handleInput(e);
    });
  }

  handleInput(event) {
    console.log(event);
    console.log(this.$input.val());
    $.ajax({
      url: './search',
      type: 'GET',
      dataType: 'json',
      data: {
        query: this.$input.val()
      },
      success: res => {
        this.createList(res);
      }
    });
  }

  createList(users) {
    this.$ul.empty();

    users.forEach( user => {
      let $li = $("<li>");
      $li.text(user.username);
      let $button = $('<button>');
      let options = {
        userId: user.id,
        followedState: user.followed ? 'followed' : 'unfollowed'
      };
      new FollowToggle($button, options);
      $li.append($button);
      this.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;
