class UsersSearch {
  constructor() {
    this.$el = $('.users-search');
    this.$input = $('.users-search > input');
    console.log(this.$input);
    this.inputVal = this.$input.val;
    this.$el.on('keydown', e => {
      this.handleInput(e);
    });
  }

  handleInput(event) {
    $.ajax({
      url: 'users/search'
    });
  }
}

module.exports = UsersSearch;
